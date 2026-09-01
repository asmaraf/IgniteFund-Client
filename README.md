# 🚀 IgniteFund Client — Modern Crowdfunding Frontend

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.28.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.1.1-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis_Scroll-1.3.26-black?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![Swiper](https://img.shields.io/badge/Swiper-11.2.1-6332F6?style=for-the-badge&logo=swiper&logoColor=white)](https://swiperjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📌 Project Overview

The **IgniteFund Client** is the modern, responsive Single Page Application (SPA) frontend for the IgniteFund crowdfunding ecosystem. Built with **React 18** and **Vite**, it delivers a sleek web experience combining custom dark glassmorphism design tokens, hardware-accelerated animations, and role-tailored dashboards for **Supporters**, **Creators**, and **Administrators**.

### Problem Solved
Crowdfunding interfaces often feel static, cluttered, and confusing regarding pledge lifecycles and credit conversions. The IgniteFund frontend delivers:
- An intuitive, interactive discovery experience with real-time category filtering, regex search, and multi-parameter sorting.
- Three distinct, role-based dashboard experiences that give backers, innovators, and platform admins instant clarity on pledges, approvals, and payout requests.
- Integrated micro-interactions—including smooth inertial scrolling, 3D interactive scenes, GSAP counter animations, and celebratory confetti upon successful pledges.
- Zero-hassle session persistence: refreshing private dashboard pages preserves active user sessions without redirecting to login.

### Target Roles
- **Supporter**: Explores campaigns, pledges credits with escrow protection, purchases credit tiers, tracks contributions via paginated tables, and reports suspicious campaigns.
- **Creator**: Launches new campaigns with image upload capabilities, monitors funding progress, reviews and approves/rejects pending backer pledges, and requests credit redemptions ($1 per 20 credits).
- **Admin**: Audits platform statistics, approves/rejects submitted campaigns, verifies creator payout requests, manages user accounts and permissions, and resolves incident reports.

---

## 📸 Application Screenshot

<!-- 
Add your application screenshot here:
1. Capture a screenshot of the client interface (e.g. Hero Section or Dashboard).
2. Save the image file as: `assets/Screenshot.png`
3. The image below will automatically display on GitHub.
-->

![Project Screenshot](assets/Screenshot.png)

> _Note: To display your client UI preview, add a high-resolution screenshot named `Screenshot.png` to the `assets/` directory._

---

## 🚀 Live Demo & Relevant Links

| Resource | Link |
| :--- | :--- |
| 🌐 **Live Web Application (Vercel)** | [https://ignitefund-crowdfunding.vercel.app](https://ignitefund-crowdfunding.vercel.app) |
| 💻 **Frontend Repository** | [https://github.com/asmaraf/IgniteFund-Client](https://github.com/asmaraf/IgniteFund-Client) |
| ⚙️ **Backend API Repository** | [https://github.com/asmaraf/IgniteFund-Server](https://github.com/asmaraf/IgniteFund-Server) |
| 📡 **API Base Endpoint** | `http://localhost:5000/api` |

---

## 🔑 Demo Evaluation Credentials

Pre-configured credentials for quick evaluation and grading:

| Role | Email Address | Password | Features / Dashboard |
| :--- | :--- | :--- | :--- |
| 🛡️ **Admin** | `admin@ignitefund.com` | `Admin@123456` | Campaign Approvals, Payouts, User Roles, Moderation |
| 💡 **Creator** | `creator@ignitefund.com` | `Creator@123456` | Launch Campaigns, Review Pledges, Request Withdrawals |
| 🤝 **Supporter** | `supporter@ignitefund.com` | `Supporter@123456` | Browse Campaigns, Pledge Credits, Purchase Credits, Reports |

> *Tip: Google Sign-In with dynamic role selection (Supporter vs. Creator) is also integrated via `@react-oauth/google` on the login and registration pages.*

---

## ✨ Key Features

### 🎨 1. Modern Aesthetics & Rich Micro-Interactions
- **Glassmorphism Design System**: Tailored vanilla CSS variables (`--bg-base: #090d16`, `--bg-card: #141c30`, `--primary: #6366f1`, `--accent-amber: #f59e0b`) with multi-layered shadows and rounded borders.
- **Lenis Smooth Scrolling**: Inertial vertical scrolling container integrated with the GSAP ticker for ultra-smooth framerate.
- **GSAP ScrollTrigger Numerical Counters**: Stats on the homepage (Credits, Projects, Backers, Escrow Rate) trigger animated counting when scrolled into view.
- **Spline 3D Scene**: Embeds a live 3D visual component in the hero section via `@splinetool/runtime`.
- **Swiper Hero & Testimonials**: Touch-friendly carousel sliders with auto-play, navigation arrows, pagination dots, and fade transitions.
- **Celebration Confetti**: Triggers `canvas-confetti` fireworks upon successful credit pledging and campaign launch.

### 🔐 2. Authentication & Route Guards
- **Multi-Role Protected Routes**: `<ProtectedRoute allowedRoles={['...']}>` wraps dashboard views to prevent unauthorized URL access.
- **Session Rehydration**: Checks `/api/auth/me` on application mount; retains login status across full page refreshes.
- **Google OAuth 2.0 Identity**: One-click Google sign-in allowing users to toggle between Supporter (50 welcome credits) and Creator (20 welcome credits).

### 🔍 3. Campaign Discovery, Search & Filtering
- **Live Search**: Instant keyword filtering across campaign titles, descriptions, and creator names.
- **Category Filter Badges**: Filter by *Technology*, *Environment*, *Health*, *Education*, *Community*, and *Art*.
- **Sorting Options**: Sort by *Newest*, *Deadline*, *Most Funded*, or *Funding Goal*.
- **Detailed Campaign View**: Shows progress bars, remaining days calculation, creator information, reward descriptions, credit pledge modal, and campaign reporting form.

### 📊 4. Role-Based Dashboards
- **Supporter Views**:
  - `SupporterHome.jsx`: Overview cards showing total contributions, pending pledges, and total credits backed.
  - `MyContributions.jsx`: Contribution ledger with **server-side pagination** (`page`, `limit`), badges, and date stamps.
  - `PurchaseCredit.jsx`: Credit purchasing cards (100, 300, 800, 1500 credits) with simulated & Stripe checkout redirection.
  - `PaymentHistory.jsx`: Complete transaction history with Stripe IDs and purchase receipts.
- **Creator Views**:
  - `CreatorHome.jsx`: Funding metrics, active projects count, and available raised credits for withdrawal.
  - `AddNewCampaign.jsx`: Form with deadline picker, category selector, funding goal calculator, and image upload with imgBB / data-URI fallback.
  - `MyCampaigns.jsx`: Creator campaign catalog with inline edit capability and deletion (with backer refunds).
  - `Withdrawals.jsx`: Payout request form with 20:1 credit-to-USD conversion, gateway choice (Stripe, bKash, Nagad, Rocket, Bank Transfer), and account verification.
  - `CreatorPaymentHistory.jsx`: Historical withdrawal requests with status badges (`pending`, `approved`).
- **Admin Views**:
  - `AdminHome.jsx`: System-wide analytics (users, creators, campaigns, total credits, pending approvals).
  - `CampaignApprovals.jsx`: Pending campaign queue with instant Approve and Reject buttons.
  - `WithdrawalRequests.jsx`: Pending withdrawal queue to review creator payout requests and execute payouts.
  - `ManageUsers.jsx`: Directory to promote/demote roles (`Supporter`, `Creator`, `Admin`) or delete accounts.
  - `ManageCampaigns.jsx`: Global audit list with search and removal capabilities.
  - `Reports.jsx`: Incident moderation center reviewing user-submitted flags against suspicious campaigns.

### 🔔 5. Real-Time In-App Notification System
- Dynamic floating bell dropdown in the navigation bar displaying unread count badges.
- Instant notifications for pledges, creator approvals, admin status changes, and payouts.
- Mark-as-read toggles, bulk "Mark all read", and outside-click automatic dismissal.

---

## 🛠️ Main Technologies Used

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Core UI library with Hooks and Component Architecture |
| **Vite** | `^6.0.7` | Next-generation fast frontend bundler & development server |
| **React Router DOM** | `^6.28.1` | SPA navigation, nested layouts, and role-based route guards |
| **Framer Motion** | `^13.1.1` | Motion physics, page animations, and UI state transitions |
| **GSAP & ScrollTrigger**| `^3.15.0` | High-performance numerical counter animations & scroll monitoring |
| **Lenis** | `^1.3.26` | Hardware-accelerated smooth scrolling integrated with GSAP |
| **@splinetool/runtime** | `^1.9.50` | Interactive 3D scene embedded in hero section |
| **Swiper** | `^11.2.1` | Touch-friendly carousel sliders for hero & testimonials |
| **Lucide React** | `^1.16.0` | Cohesive modern icon collection across all UI elements |
| **Canvas Confetti** | `^1.9.4` | Particle celebration effects on successful user actions |
| **@react-oauth/google** | `^0.13.5` | Google Identity Services OAuth 2.0 integration |
| **Axios** | `^1.20.0` | HTTP client for external API requests |
| **Vanilla CSS** | Custom | Cohesive design tokens, glassmorphism, responsive breakpoints |

---

## 📦 Dependencies

### Production Dependencies (`package.json`)
- **`@react-oauth/google` (`^0.13.5`)**: Google OAuth 2.0 client authentication.
- **`@splinetool/runtime` (`^1.9.50`)**: WebGL 3D interactive scene runtime.
- **`axios` (`^1.20.0`)**: HTTP client for fetching Google UserInfo profile data.
- **`canvas-confetti` (`^1.9.4`)**: Visual particle explosions on milestones.
- **`framer-motion` (`^13.1.1`)**: Motion components and layout animations.
- **`gsap` (`^3.15.0`)**: Numerical counter animations & ScrollTrigger plugin.
- **`lenis` (`^1.3.26`)**: Inertial smooth scroll engine.
- **`lucide-react` (`^1.16.0`)**: Vector iconography for dashboards and navigation.
- **`react` (`^18.3.1`)**: React core runtime.
- **`react-dom` (`^18.3.1`)**: React DOM rendering engine.
- **`react-router-dom` (`^6.28.1`)**: Client-side routing and location hooks.
- **`swiper` (`^11.2.1`)**: Modern mobile touch slider.

### Development Dependencies
- **`vite` (`^6.0.7`)**: Fast local dev server and optimized Rollup bundler.
- **`@vitejs/plugin-react` (`^4.3.4`)**: Babel-based React Fast Refresh support for Vite.
- **`@types/react` (`^18.3.18`)** & **`@types/react-dom` (`^18.3.5`)**: TypeScript type definitions.

---

## ⚙️ Environment Variables

Create a `.env` file in the `client/` root based on `client/.env.example`:

```env
# Backend REST API URL
VITE_API_URL=http://localhost:5000/api

# Linked GitHub Repositories
VITE_GITHUB_CLIENT_REPO=https://github.com/asmaraf/IgniteFund-Client
VITE_GITHUB_SERVER_REPO=https://github.com/asmaraf/IgniteFund-Server

# imgBB API Key for campaign cover uploads (Optional; falls back to Data URI)
VITE_IMGBB_API_KEY=your_imgbb_api_key_here

# Google OAuth 2.0 Client ID for Google Sign-In
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Stripe Publishable Key for client-side checkout
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher
- **Backend API**: Running on `http://localhost:5000` (see the [Server Repository](https://github.com/asmaraf/IgniteFund-Server))

### Installation Steps
```bash
# 1. Clone the client repository
git clone https://github.com/asmaraf/IgniteFund-Client.git
cd IgniteFund-Client

# 2. Install all dependencies
npm install

# 3. Create .env file and set your variables
cp .env.example .env

# 4. Start the Vite development server
npm run dev
```

The application will be accessible at: **`http://localhost:5173`**

### Building for Production
```bash
# Generate optimized production build in dist/
npm run build

# Preview the production build locally
npm run preview
```

### Deployment Configuration (`vercel.json`)
For deployment on Vercel or similar static hosts, a `vercel.json` file is included to route all requests to `index.html` for deep client-side routing:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📂 Project Directory Structure

```
client/
├── assets/                             # Repository screenshots and media
│   └── Screenshot.png                  # Application UI screenshot
├── public/                             # Static public assets
├── src/
│   ├── components/                     # Reusable UI components
│   │   ├── Breadcrumb.jsx              # Navigation breadcrumb trail
│   │   ├── Footer.jsx                  # Footer with links & attribution
│   │   ├── Icons.jsx                   # Custom SVG icons
│   │   ├── Navbar.jsx                  # Header with notification dropdown & auth status
│   │   ├── NotificationPopup.jsx       # Floating in-app notifications modal
│   │   ├── ProtectedRoute.jsx          # Role-based route guard
│   │   ├── SmoothScroll.jsx            # Lenis smooth scrolling container
│   │   └── SplineScene.jsx             # 3D interactive hero graphic
│   ├── context/
│   │   └── AuthContext.jsx             # User authentication, token management, credit sync
│   ├── pages/                          # Public & Dashboard Pages
│   │   ├── CampaignDetails.jsx         # Campaign story, stats, pledge form & report modal
│   │   ├── ExploreCampaigns.jsx        # Search, category filter & sorting catalog
│   │   ├── Home.jsx                    # Landing page (hero, 3D, stats, testimonials, CTA)
│   │   ├── Login.jsx                   # Email/password & Google OAuth login
│   │   ├── Register.jsx                # Registration form with starter credits
│   │   └── dashboard/                  # Role-segregated dashboard views
│   │       ├── DashboardLayout.jsx     # Persistent dashboard sidebar & mobile drawer
│   │       ├── supporter/              # Supporter dashboard views
│   │       │   ├── MyContributions.jsx # Paginated contribution tracking table
│   │       │   ├── PaymentHistory.jsx  # Stripe purchase receipts
│   │       │   ├── PurchaseCredit.jsx  # Tiered credit purchase interface
│   │       │   └── SupporterHome.jsx   # Supporter stats overview
│   │       ├── creator/                # Creator dashboard views
│   │       │   ├── AddNewCampaign.jsx  # Campaign creation form with image upload
│   │       │   ├── CreatorHome.jsx     # Creator stats & raised credit balance
│   │       │   ├── CreatorPaymentHistory.jsx # Withdrawal log
│   │       │   ├── MyCampaigns.jsx     # Creator campaigns with edit & delete
│   │       │   └── Withdrawals.jsx     # Payout request submission (20:1 math)
│   │       └── admin/                  # Admin dashboard views
│   │           ├── AdminHome.jsx       # System-wide metrics & aggregates
│   │           ├── CampaignApprovals.jsx # Review pending campaigns
│   │           ├── ManageCampaigns.jsx # Campaign deletion & audit
│   │           ├── ManageUsers.jsx     # Role assignment & user deletion
│   │           ├── Reports.jsx         # Suspicious campaign report resolution
│   │           └── WithdrawalRequests.jsx # Payout approvals & execution
│   ├── services/
│   │   └── api.js                      # Centralized API service methods
│   ├── styles/
│   │   └── index.css                   # Unified design system tokens & glassmorphism
│   ├── App.jsx                         # Main route map with layouts
│   └── main.jsx                        # React root entry point with Google OAuth
├── index.html                          # HTML shell with Google Fonts
├── package.json                        # Frontend packages and scripts
├── vercel.json                         # Vercel rewrite configuration
└── vite.config.js                      # Vite plugin configuration
```

---

## 📄 License

This project is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).
