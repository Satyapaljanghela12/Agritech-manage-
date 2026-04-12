# Agriculture Platform Backend

Node.js + Express + MongoDB backend for the Agriculture Management Platform.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Make sure MongoDB is running locally or update MONGODB_URI in .env

3. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (protected)
- PUT /api/auth/profile - Update user profile (protected)
- GET /api/auth/google - Google OAuth login
- GET /api/auth/google/callback - Google OAuth callback

### Land Parcels
- GET /api/land-parcels - Get all land parcels
- POST /api/land-parcels - Create land parcel
- PUT /api/land-parcels/:id - Update land parcel
- DELETE /api/land-parcels/:id - Delete land parcel

### Crops
- GET /api/crops - Get all crops
- POST /api/crops - Create crop
- PUT /api/crops/:id - Update crop
- DELETE /api/crops/:id - Delete crop

### Inventory
- GET /api/inventory - Get all inventory items
- POST /api/inventory - Create inventory item
- PUT /api/inventory/:id - Update inventory item
- DELETE /api/inventory/:id - Delete inventory item

### Tools & Equipment
- GET /api/tools - Get all tools
- POST /api/tools - Create tool
- PUT /api/tools/:id - Update tool
- DELETE /api/tools/:id - Delete tool

### Financial Records
- GET /api/financial - Get all financial records
- POST /api/financial - Create financial record
- PUT /api/financial/:id - Update financial record
- DELETE /api/financial/:id - Delete financial record

### Notifications
- GET /api/notifications - Get all notifications
- PUT /api/notifications/:id/read - Mark notification as read
- DELETE /api/notifications/:id - Delete notification

## Environment Variables

See .env file for required configuration.
