const express = require('express');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]', 'utf8');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const readMessages = () => {
  try { return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8')); }
  catch { return []; }
};

app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'Ahmed Talaat Digital Solutions' }));

app.post('/api/contact', (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 100);
  const email = String(req.body.email || '').trim().slice(0, 160);
  const service = String(req.body.service || '').trim().slice(0, 80);
  const message = String(req.body.message || '').trim().slice(0, 3000);
  const lang = req.body.lang === 'en' ? 'en' : 'ar';

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: lang === 'en' ? 'Please fill in your name, email, and message.' : 'من فضلك اكتب الاسم والبريد الإلكتروني والرسالة.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: lang === 'en' ? 'Please enter a valid email address.' : 'من فضلك اكتب بريدًا إلكترونيًا صحيحًا.' });
  }

  const messages = readMessages();
  messages.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), name, email, service, message, lang, createdAt: new Date().toISOString() });
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
    return res.status(201).json({ ok: true, message: lang === 'en' ? 'Thanks! Your message has been received.' : 'شكرًا لك! تم استلام رسالتك بنجاح.' });
  } catch (err) {
    console.error('Could not save contact message:', err.message);
    return res.status(500).json({ ok: false, message: lang === 'en' ? 'Something went wrong. Please try again later.' : 'حصلت مشكلة أثناء حفظ الرسالة. حاول مرة أخرى لاحقًا.' });
  }
});

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`\nAHMED TALAAT — Digital Solutions\nLocal website: http://localhost:${PORT}\nPress Ctrl+C to stop.\n`));
