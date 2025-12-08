# BeqaParty Frontend

Modern React frontend for BeqaParty Kids Party Center website.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will run on http://localhost:3000

### 3. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout components
│   │   └── common/          # Reusable components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
└── package.json
```

## 🎨 Design System

- **Primary Color**: #FF7A00 (Orange)
- **Secondary Color**: #00C4FF (Blue)
- **Accent Color**: #FF3A6E (Pink)
- **Typography**: Poppins (Google Fonts)

## 🔗 API Connection

The frontend connects to Strapi backend at `http://localhost:1337/api`

Configure in `.env`:
```
VITE_API_URL=http://localhost:1337/api
```

## 📦 Features

- ✅ Responsive design (mobile-first)
- ✅ Modern UI with playful colors
- ✅ Smooth animations
- ✅ SEO-friendly
- ✅ Fast performance (Vite)

## 🛠️ Tech Stack

- React 18
- Vite
- React Router
- Axios
- Framer Motion

## 📝 Next Steps

1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Backend should be running at http://localhost:1337

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port in vite.config.js
server: {
  port: 3001  // Change this
}
```

**Cannot connect to backend?**
- Make sure Strapi backend is running
- Check `.env` file has correct API URL
