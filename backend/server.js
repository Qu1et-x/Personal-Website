import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'cookie-session'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// --- DB setup ---
const db = new sqlite3.Database(path.join(__dirname, 'comments.db'))
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId TEXT NOT NULL,
    userId TEXT NOT NULL,
    username TEXT NOT NULL,
    avatarUrl TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    content TEXT NOT NULL
  )`)
})

// --- Middlewares ---
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
app.use(bodyParser.json())

app.use(session({
  name: 'ghsid',
  secret: process.env.SESSION_SECRET || 'dev_secret',
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
}))

app.use(passport.initialize())
app.use(passport.session())

// --- Passport GitHub ---
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
  // Store minimal profile in session; DO NOT store tokens in client
  const user = {
    id: profile.id,
    username: profile.username,
    avatarUrl: profile.photos?.[0]?.value,
    accessToken // kept in server session only
  }
  return done(null, user)
}))

// --- Auth routes ---
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))

app.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/github/failure'
}), (req, res) => {
  // redirect back to frontend
  const dest = process.env.ALLOWED_ORIGIN || 'http://localhost:5173'
  res.redirect(dest)
})

app.get('/auth/github/failure', (req, res) => {
  res.status(401).send('GitHub 登录失败')
})

app.post('/api/logout', (req, res) => {
  req.logout?.()
  req.session = null
  res.json({ ok: true })
})

app.get('/api/me', (req, res) => {
  if (!req.user) return res.json({ user: null })
  const { id, username, avatarUrl } = req.user
  res.json({ user: { id, username, avatarUrl }})
})

// helper middleware
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: '未登录' })
  next()
}

// --- Comments API ---
app.get('/api/comments', (req, res) => {
  const postId = req.query.postId
  if (!postId) return res.status(400).json({ error: 'postId 必填' })
  db.all('SELECT * FROM comments WHERE postId = ? ORDER BY createdAt DESC', [postId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB 错误' })
    res.json({ comments: rows })
  })
})

app.post('/api/comments', requireAuth, (req, res) => {
  const { postId, content } = req.body
  if (!postId || !content || !content.trim()) {
    return res.status(400).json({ error: '参数不完整' })
  }
  const stmt = db.prepare('INSERT INTO comments (postId, userId, username, avatarUrl, createdAt, content) VALUES (?, ?, ?, ?, ?, ?)')
  const now = Date.now()
  stmt.run(postId, req.user.id, req.user.username, req.user.avatarUrl, now, content.trim(), function(err) {
    if (err) return res.status(500).json({ error: 'DB 写入失败' })
    res.json({ ok: true, id: this.lastID, createdAt: now })
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})