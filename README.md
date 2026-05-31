# FIR Automation — Frontend

Modern web application for filing FIRs (First Information Reports) using AI — built with Next.js.

## 🚀 Live Demo
[https://fir-automation-client.vercel.app](https://fir-automation-client.vercel.app)

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Tabler Icons

## ✨ Features
- 📝 Simple form — describe incident in Urdu or English
- 🤖 AI-powered FIR generation
- ⚡ Real-time progress steps during generation
- 📄 PDF download
- 📱 Fully responsive — mobile friendly
- 🎨 Premium UI — Cream + Dark Green theme

## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/FIR_Automation_client.git
cd FIR_Automation_client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Update API URL
In `app/form/page.tsx` and `app/preview/[id]/page.tsx` — update backend URL:
```typescript
const API_URL = "http://localhost:5000"; // Development
// const API_URL = "https://your-render-url.onrender.com"; // Production
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
client/
├── app/
│   ├── page.tsx          # Home page
│   ├── form/
│   │   └── page.tsx      # FIR Form
│   └── preview/
│       └── [id]/
│           └── page.tsx  # FIR Preview + PDF
├── globals.css
└── layout.tsx
```

## 🌐 Deployment
Deployed on **Vercel** — [vercel.com](https://vercel.com)

## 📸 Pages
- **Home** — Landing page with features overview
- **Form** — Fill personal details + incident description
- **Preview** — View generated FIR + download PDF