<div align="center">
  <h1>🪺 ToolNest Client</h1>
  <p><strong>A premium directory for AI tools. Next.js 16 + TypeScript + Tailwind CSS Frontend.</strong></p>
  
  [![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/Atahar-Shihab/ToolNest_Client)
  [![Server Repo](https://img.shields.io/badge/Server-Repository-blue?logo=github)](https://github.com/Atahar-Shihab/ToolNest_Server)
  [![Live URL](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://toolnest.vercel.app/)

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

## ✨ Key Features

### 🏠 Rich Landing Page
- Animated hero section
- Smart search & category pills
- Infinite tool marquee
- Platform stats
- User testimonials
- FAQ section
- Smooth scroll-to-top button & Open Graph SEO metadata

### 🔐 Authentication & Security
- Secure JWT Authentication
- Google OAuth integration
- Protected routes (User & Admin)

### 🔍 Discovery & Interaction
- Advanced search and filtering (by category, pricing, sort)
- Detailed tool pages with AI model metadata
- User reviews and rating system
- Bookmarks management

### 📊 Management & Admin
- **Admin Dashboard**: Manage users, tools, reviews, and view analytics
- **User Dashboard**: Manage profile, submitted tools, reviews, and bookmarks

### 💳 Monetization
- Stripe payment integration for Pro membership subscriptions

### 🎨 UI/UX
- Premium glassmorphism design
- Seamless Dark/Light mode
- Fully responsive layout for all devices
- Smooth animations via Framer Motion

## 🗺️ Pages & Routes

- `/` - Landing Page
- `/tools` - Tools directory with advanced filters
- `/tools/[id]` - Tool details page
- `/login` & `/register` - Authentication
- `/dashboard` - User dashboard
- `/admin` - Admin dashboard
- `/pricing` - Subscription plans
- `/submit` - Submit a new AI tool

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Authentication (Google OAuth)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Stripe Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Atahar-Shihab/ToolNest_Client.git
   cd ToolNest_Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   Copy the contents of the section above into a `.env.local` file.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── public/             # Static assets (images, fonts, etc.)
├── src/
│   ├── app/            # Next.js App Router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context providers (Auth, Theme)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and configurations
│   ├── services/       # API integration services
│   ├── store/          # Global state management
│   └── types/          # TypeScript type definitions
├── .env.local.example  # Example environment variables
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🔑 Demo Credentials

To test the application without creating an account, you can use the following credentials:

| Role  | Email                  | Password   |
| ----- | ---------------------- | ---------- |
| User  | user@toolnest.com      | User123!   |
| Admin | admin@toolnest.com     | Admin123!  |

## 🛠️ Tech Stack Details

- **Framework**: Next.js 16 (App Router)
- **Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React / React Icons
- **State Management**: React Context / Zustand (or Redux)
- **Data Fetching**: Axios / TanStack Query
- **Authentication**: Custom JWT / NextAuth.js
- **Payments**: Stripe

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
