# Harine T. — Portfolio Website

A premium, interactive developer portfolio showcasing AI/ML capabilities, full-stack systems architecture, and research publications.

## Tech Stack

- **Frontend**: React (Vite), Framer Motion, Tailwind CSS, Axios
- **Backend**: Node.js, Express, Helmet, Express Rate Limit
- **Data Store**: Local JSON database

## Project Structure

```text
├── client/          # Frontend React SPA
│   ├── src/         # Components, Pages, and Styling
│   ├── public/      # Static assets (Resume PDF, icons)
│   └── package.json # Frontend scripts & dependencies
└── server/          # Backend API
    ├── routes/      # Express API routers (projects, skills, timeline, contact)
    ├── data/        # JSON data files (skills, projects, resume data)
    └── package.json # Backend scripts & dependencies
```

## Getting Started

### Prerequisites
- **Node.js** (v18+)
- **npm**

### Local Setup & Execution

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Start the Backend API**:
   ```bash
   cd server
   npm install
   # Configure .env based on .env.example
   npm run dev
   ```
   *The server runs at `http://localhost:5000`.*

3. **Start the Frontend Client**:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   *The client app runs at `http://localhost:5173`.*

## Key Features
- **Aesthetic UI**: Smooth scroll-based micro-animations and typography.
- **Data-Driven Sections**: Dynamic capabilities, academic timeline, and project catalog retrieved from backend API.
- **Direct Downloads**: Direct downloading of local research copyright certificate and resume.
- **Secure Contact**: Contact form with backend rate-limiting, CORS validation, and input sanitization.
