# Agriculture Platform - Frontend

React + TypeScript + Vite frontend for the Agriculture Management Platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will run on http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons

## Project Structure

```
src/
├── components/     # Reusable components
├── contexts/       # React contexts (Auth, Theme)
├── lib/           # API client and utilities
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── App.tsx        # Main app component
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## API Configuration

The frontend connects to the backend API at `http://localhost:5000/api` by default.

To change this, update the `API_URL` constant in `src/lib/api.ts`.

## Features

- User authentication (Email/Password + Google OAuth)
- Dashboard with statistics
- Land parcel management
- Crop tracking
- Inventory management
- Tools & equipment tracking
- Financial records
- Notifications
- User profile management
- Weather widget
- Location mapping
- AI chatbot

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

No environment variables are required for the frontend in development mode.

For production, you may want to configure:
- API URL
- Google OAuth client ID (if using client-side OAuth)
