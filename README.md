# AHMED TALAAT — Digital Solutions

A bilingual (Arabic/English) responsive full-stack business website starter built with HTML, CSS, JavaScript, Node.js, and Express.

## Requirements
- Node.js 18 or newer
- Visual Studio Code (recommended)
- Internet connection during install (for npm packages and Google Fonts)

## Run locally
1. Extract the project ZIP.
2. Open the `ahmed-talaat-digital` folder in VS Code.
3. In VS Code, choose **Terminal → New Terminal**.
4. Check Node.js is installed:
   ```bash
   node -v
   npm -v
   ```
5. Install packages:
   ```bash
   npm install
   ```
6. Start the server:
   ```bash
   npm start
   ```
7. Open **http://localhost:3000** in your browser.
8. Stop the server with `Ctrl + C` in the terminal.

## What is included
- Responsive dark navy/blue design
- Arabic and English language switch with RTL/LTR layout
- Services, concept projects, about, and contact sections
- Express backend with `GET /api/health`
- Contact form validation and persistence to `data/messages.json`
- Basic security headers via Helmet

## Before publishing
1. Replace `hello@ahmedtalaat.dev` in `public/index.html` with your real email address.
2. Replace concept project cards with your real projects when available.
3. Update the description and service list to match your actual skills and services.
4. The contact form currently stores submissions in `data/messages.json`; it does not email or WhatsApp you automatically. Add an email service and environment variables before relying on it for production leads.
5. For a production deployment, use a persistent database (e.g. PostgreSQL), HTTPS, spam/rate limiting, backups, and a hosting provider that supports Node.js.
6. Google Fonts are loaded online. If you need the website fully offline, download and self-host the fonts or remove the font imports.

## Project structure
```text
ahmed-talaat-digital/
├── data/
│   └── messages.json
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── package.json
├── README.md
└── server.js
```
