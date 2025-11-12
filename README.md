# AgriManage - Comprehensive Agriculture Management Platform

A modern, full-featured web application for managing farm operations, built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Core Modules

- **Dashboard** - Overview of farm operations with real-time statistics
- **Land Management** - Track and organize land parcels
- **Crops Management** - Monitor crop lifecycles from planting to harvest
- **Inventory Management** - Track seeds, fertilizers, pesticides, and supplies
- **Tools & Equipment** - Manage farm machinery and maintenance schedules
- **Financial Tracking** - Record expenses and revenue, monitor profitability
- **Notifications** - Stay informed about harvests, maintenance, and low stock

### Additional Features

- **AI Chatbot** - Get farming advice and answers to agricultural questions
- **Weather Widget** - Real-time weather data with detailed metrics
- **Location Mapping** - Interactive maps using OpenStreetMap
- **Geolocation Support** - Automatic location detection for weather and maps
- **Dark Mode** - Toggle between light and dark themes
- **User Profiles** - Manage account settings and preferences
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)
- **Icons**: Lucide React
- **Maps**: OpenStreetMap
- **Weather**: WeatherAPI

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEATHER_API_KEY=your_weatherapi_key
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Database Schema

The application uses the following main tables:

- `users_profiles` - User account information and preferences
- `land_parcels` - Land parcel tracking with area and soil data
- `crops` - Crop lifecycle management
- `inventory` - Supply and material tracking
- `tools_equipment` - Farm equipment and maintenance records
- `financial_records` - Expense and revenue tracking
- `notifications` - System notifications and alerts

All tables include Row Level Security (RLS) policies for data protection.

## Key Functionalities

### Dashboard
- Real-time statistics on land, crops, harvests, and alerts
- Financial overview with profit/loss calculations
- Recent activity feed
- Quick navigation to all modules

### Land Management
- Add and track multiple land parcels
- Record area, soil type, and location
- Organize by sections or zones

### Crops Management
- Track crop status (planned, planted, growing, harvested)
- Record planting and expected harvest dates
- Monitor yield expectations vs actuals
- Associate crops with specific land parcels

### Inventory Management
- Categorize items (seeds, fertilizers, pesticides, supplies)
- Track quantity and units
- Set low stock alert levels
- Record supplier information and expiry dates

### Tools & Equipment
- Maintain equipment records
- Track condition status
- Schedule maintenance with automated alerts
- Record purchase costs and dates

### Financial Tracking
- Record expenses and revenue
- Categorize transactions
- Associate with specific crops
- Real-time profit/loss calculations

### AI Chatbot
- Get farming advice on crops, pests, soil, water management
- Context-aware responses
- Available 24/7 via floating chat button

### Weather & Location
- Real-time weather data with temperature, humidity, wind speed
- Visibility and pressure information
- Automatic geolocation or manual location entry
- Interactive map integration

## User Management

### Authentication
- Email and password authentication via Supabase
- Secure session management
- Profile customization

### Profile Settings
- Update personal information
- Manage farm details
- Configure notification preferences
- Toggle dark/light theme
- Select language (future enhancement)

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Security

- Row Level Security (RLS) enabled on all database tables
- Authenticated user verification for all operations
- Secure credential storage via environment variables
- No exposed API keys in client code

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
