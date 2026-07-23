# 🚀 ToolNest Client — AI Tools Directory Platform

<div align="center">

![ToolNest Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

### Discover, Compare, & Review 500+ Top AI Tools

[![Live Website](https://img.shields.io/badge/🌐_Live_Website-tool--nest--client.vercel.app-00D4FF?style=for-the-badge&logo=vercel)](https://tool-nest-client.vercel.app)
[![Backend API](https://img.shields.io/badge/⚡_Live_API-toolnest--server.onrender.com-46E3B7?style=for-the-badge&logo=render)](https://toolnest-server.onrender.com/api)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

### 👨‍💻 Developer & Contact

**Atahar Shihab** — Lead Full Stack Software Engineer

[![Email](https://img.shields.io/badge/Email-shihabatahar%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shihabatahar@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Atahar--Shihab-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Atahar-Shihab)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-atahar--shihab-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atahar-shihab)
[![Facebook](https://img.shields.io/badge/Facebook-atahar.shihab.740192-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/atahar.shihab.740192/)

</div>

---

## 🌟 Key Features

### 🏠 Rich Landing Page & UI Aesthetics
- **Live Trending AI Tool Swiper**: Continuous 2-row infinite floating marquee showcasing trending AI tools with star ratings, pricing badges, and categories.
- **Responsive Non-Overlapping Search**: Intelligent hero search bar optimized for desktop, tablet, and mobile screens without text truncation.
- **Platform Analytics Banner**: Animated counter metrics showcasing 500+ AI Tools, 10,000+ Active Users, and 25,000+ Reviews.
- **Dark Glassmorphism UI**: Curated dark palette with subtle blur backdrop filters, glowing blur blobs, and smooth micro-animations.

### 🔍 Discovery & Detailed Metadata
- **Multi-Filter Tool Directory**: Filter by search keywords, category (*Writing, Coding, Design, Marketing, Productivity, Research, Video, Music*), pricing model (*Free Plan, Free Trial, Paid*), and sort order (*Newest, Highest Rated, Most Bookmarked, A-Z*).
- **AI Model & History Cards**: Tool detail pages display detailed AI specs:
  - 🤖 **AI Model**: e.g., *GPT-4o*, *Claude 3.5 Sonnet*, *Midjourney v6.1*, *Gen-3 Alpha*
  - 🏢 **Company Origin**: e.g., *OpenAI*, *Anthropic*, *Anysphere*, *Runway AI*
  - 📅 **Launch Year & History**: Historical background and founding story
- **Community Star Ratings & Reviews**: Real-time review submission with average score recalculation.
- **User Bookmarks**: One-click bookmark toggle saved to user profile.

### 📊 Comprehensive User & Admin Dashboards
- **User Dashboard**: Submit new tools, manage submitted applications, track reviews, and manage saved bookmarks.
- **Admin Management Suite**:
  - **Tool Moderation**: Approve or reject user-submitted tools with feedback.
  - **User Role Management**: Upgrade/downgrade user roles (`user` ↔ `admin`).
  - **Review Moderation**: Monitor and purge spam reviews.
  - **Analytics Charts**: Visual category distribution breakdown and platform metrics.

### 💳 Pro Membership & Payments
- **Stripe Integration**: One-time $5.00 lifetime Pro upgrade with 256-bit encrypted credit card processing via Stripe Elements.

### 🔐 Authentication
- **Dual Auth Engine**: Custom JWT auth (with bcrypt password hashing) + Google OAuth 2.0 single sign-on.

---

## 📸 Platform Interface Screenshots

```
┌────────────────────────────────────────────────────────────────────────┐
│  TOOLNEST | Discover the Best AI Tools for Every Task                   │
├────────────────────────────────────────────────────────────────────────┤
│  [ Search AI tools by name or category... ]  ( Search )                │
│                                                                        │
│  [ Writing ] [ Coding ] [ Design ] [ Marketing ] [ Productivity ]      │
├────────────────────────────────────────────────────────────────────────┤
│  LIVE TRENDING MARQUEE                                                 │
│  [ ChatGPT - GPT-4o ] ➔ [ Claude 3.5 Sonnet ] ➔ [ Cursor - AI IDE ]   │
│  [ Midjourney v6.1 ] ➔ [ Suno v3.5 Music ] ➔ [ Perplexity Search ]    │
└────────────────────────────────────────────────────────────────────────┘
```

| Page | Description |
| :--- | :--- |
| 🏠 **Landing Page** | Hero search, continuous swiper, featured grid, categories, stats, testimonials, FAQ |
| 🔎 **Directory Page** | Real-time multi-filter tool grid with pagination and instant search |
| 📋 **Tool Detail Page** | Full descriptions, AI model specs, company origin, history, features, reviews |
| 💳 **Pro Payment Page** | Stripe credit card checkout form with lifetime Pro badge activation |
| 📊 **Admin Dashboard** | Platform analytics, user role controls, tool approval queue |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism System
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Payments**: [@stripe/stripe-js](https://stripe.com/) & [@stripe/react-stripe-js](https://stripe.com/)
- **Authentication**: [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) & Axios JWT Interceptor
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Deployment**: [Vercel](https://vercel.com)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### 2. Installation
```bash
# Clone the client repository
git clone https://github.com/Atahar-Shihab/ToolNest_Client.git
cd ToolNest_Client

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://toolnest-server.onrender.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51TjahMGkjNUWiLm4l9nUmsq6e6KkWk8Qj0WdndQ3M20QG5E0PZqVn07RylkYJt2x3M8A6pL
NEXT_PUBLIC_GOOGLE_CLIENT_ID=366416750226-s9qi37tog7erpo5n1701bqhj3d1dvp6i.apps.googleusercontent.com
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Standard User** | `user@toolnest.com` | `User123!` | Submit tools, write reviews, bookmark tools, upgrade to Pro |
| **Admin User** | `admin@toolnest.com` | `Admin123!` | Full access + approve/reject tools, manage users, delete reviews, analytics |

---

## 📬 Contact & Support

Developed with ❤️ by **Atahar Shihab**:
- 📧 Email: [shihabatahar@gmail.com](mailto:shihabatahar@gmail.com)
- 🐙 GitHub: [https://github.com/Atahar-Shihab](https://github.com/Atahar-Shihab)
- 💼 LinkedIn: [https://www.linkedin.com/in/atahar-shihab](https://www.linkedin.com/in/atahar-shihab)
- 📘 Facebook: [https://www.facebook.com/atahar.shihab.740192/](https://www.facebook.com/atahar.shihab.740192/)

License: [MIT](LICENSE)
