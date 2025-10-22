<<<<<<< HEAD
# Kapeko Coffee - Single Page Application (SPA)

A modern React-based Single Page Application for Kapeko Coffee shop, built with React Router DOM for seamless navigation.

## Features

### ✅ Core SPA Features
- **Single Page Application**: No page reloads, smooth navigation
- **React Router DOM**: Dynamic routing with nested routes
- **Programmatic Navigation**: Navigate programmatically using useNavigate hook
- **404 Page Handling**: Custom NotFound component for invalid routes
- **Protected Routes**: Admin section with authentication simulation

### 🏗️ Application Structure
- **5 Main Sections**: Home, About, Menu, Order, Contact, Feedback
- **Header Component**: Responsive navigation with active state indicators
- **Bootstrap Styling**: Modern, responsive design with custom CSS
- **Form Handling**: Contact forms, order placement, feedback submission

### 🛣️ Routing Features
- **Public Routes**: Home, About, Menu, Order, Contact, Feedback
- **Protected Routes**: Admin dashboard (demo authentication)
- **Nested Routes**: Services redirects to Menu
- **404 Handling**: Custom not found page with navigation options

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Welcome page with hero section |
| `/about` | About | Company information and values |
| `/menu` | Menu | Coffee menu with prices |
| `/order` | Order | Order placement form |
| `/contact` | Contact | Contact form |
| `/feedback` | Feedback | Customer feedback form |
| `/admin` | Admin | Protected admin dashboard |
| `/services` | Redirect | Redirects to menu |
| `*` | NotFound | 404 error page |

## Key Components

### Header Component
- Responsive navigation bar
- Active route highlighting
- Programmatic navigation
- Mobile-friendly hamburger menu

### Form Components
- **Order Form**: Coffee selection with dynamic pricing
- **Contact Form**: Customer inquiry submission
- **Feedback Form**: Rating and comment system
- **Admin Login**: Authentication simulation

### Navigation Features
- **useNavigate Hook**: Programmatic navigation
- **useLocation Hook**: Active route detection
- **Protected Routes**: Authentication-based access
- **Nested Routes**: Route redirection

## Technical Implementation

### React Router DOM Features Used
1. **BrowserRouter**: Main router component
2. **Routes & Route**: Route configuration
3. **Navigate**: Programmatic redirection
4. **useNavigate**: Navigation hook
5. **useLocation**: Location information hook

### Styling
- **Bootstrap 5.3.2**: Responsive framework
- **Custom CSS**: Coffee shop theme
- **Google Fonts**: Playfair Display & Open Sans
- **Responsive Design**: Mobile-first approach

### State Management
- **React Hooks**: useState for local state
- **Form Handling**: Controlled components
- **Dynamic Pricing**: Real-time calculation

## Demo Features

### Admin Dashboard
- **Login**: Username: `admin`, Password: `kapeko2025`
- **Order Management**: View recent orders
- **Feedback Review**: Customer feedback display
- **Logout**: Session management

### Order System
- **Dynamic Pricing**: Size-based price calculation
- **Form Validation**: Client-side validation
- **Success Messages**: User feedback

### Navigation
- **Smooth Transitions**: No page reloads
- **Active States**: Current page highlighting
- **Mobile Responsive**: Touch-friendly navigation

## Learning Objectives Achieved

✅ **Build a Single Page Application (SPA) using React Router DOM**
✅ **Navigate between pages without reloading the browser**
✅ **Implement dynamic routing, nested routes, and protected routes**
✅ **Handle programmatic navigation and 404 pages**

## Future Enhancements

- Backend API integration
- Real authentication system
- Database connectivity
- Payment processing
- Real-time order tracking
- User accounts and profiles

---

**Kapeko Coffee SPA** - Crafted with ☕ and ❤️ in the Philippines
=======
# Kapeko Coffee - Single Page Application (SPA)

A modern React-based Single Page Application for Kapeko Coffee shop, built with React Router DOM for seamless navigation.

## Features

### ✅ Core SPA Features
- **Single Page Application**: No page reloads, smooth navigation
- **React Router DOM**: Dynamic routing with nested routes
- **Programmatic Navigation**: Navigate programmatically using useNavigate hook
- **404 Page Handling**: Custom NotFound component for invalid routes
- **Protected Routes**: Admin section with authentication simulation

### 🏗️ Application Structure
- **5 Main Sections**: Home, About, Menu, Order, Contact, Feedback
- **Header Component**: Responsive navigation with active state indicators
- **Bootstrap Styling**: Modern, responsive design with custom CSS
- **Form Handling**: Contact forms, order placement, feedback submission

### 🛣️ Routing Features
- **Public Routes**: Home, About, Menu, Order, Contact, Feedback
- **Protected Routes**: Admin dashboard (demo authentication)
- **Nested Routes**: Services redirects to Menu
- **404 Handling**: Custom not found page with navigation options

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Welcome page with hero section |
| `/about` | About | Company information and values |
| `/menu` | Menu | Coffee menu with prices |
| `/order` | Order | Order placement form |
| `/contact` | Contact | Contact form |
| `/feedback` | Feedback | Customer feedback form |
| `/admin` | Admin | Protected admin dashboard |
| `/services` | Redirect | Redirects to menu |
| `*` | NotFound | 404 error page |

## Key Components

### Header Component
- Responsive navigation bar
- Active route highlighting
- Programmatic navigation
- Mobile-friendly hamburger menu

### Form Components
- **Order Form**: Coffee selection with dynamic pricing
- **Contact Form**: Customer inquiry submission
- **Feedback Form**: Rating and comment system
- **Admin Login**: Authentication simulation

### Navigation Features
- **useNavigate Hook**: Programmatic navigation
- **useLocation Hook**: Active route detection
- **Protected Routes**: Authentication-based access
- **Nested Routes**: Route redirection

## Technical Implementation

### React Router DOM Features Used
1. **BrowserRouter**: Main router component
2. **Routes & Route**: Route configuration
3. **Navigate**: Programmatic redirection
4. **useNavigate**: Navigation hook
5. **useLocation**: Location information hook

### Styling
- **Bootstrap 5.3.2**: Responsive framework
- **Custom CSS**: Coffee shop theme
- **Google Fonts**: Playfair Display & Open Sans
- **Responsive Design**: Mobile-first approach

### State Management
- **React Hooks**: useState for local state
- **Form Handling**: Controlled components
- **Dynamic Pricing**: Real-time calculation

## Demo Features

### Admin Dashboard
- **Login**: Username: `admin`, Password: `kapeko2025`
- **Order Management**: View recent orders
- **Feedback Review**: Customer feedback display
- **Logout**: Session management

### Order System
- **Dynamic Pricing**: Size-based price calculation
- **Form Validation**: Client-side validation
- **Success Messages**: User feedback

### Navigation
- **Smooth Transitions**: No page reloads
- **Active States**: Current page highlighting
- **Mobile Responsive**: Touch-friendly navigation

## Learning Objectives Achieved

✅ **Build a Single Page Application (SPA) using React Router DOM**
✅ **Navigate between pages without reloading the browser**
✅ **Implement dynamic routing, nested routes, and protected routes**
✅ **Handle programmatic navigation and 404 pages**

## Future Enhancements

- Backend API integration
- Real authentication system
- Database connectivity
- Payment processing
- Real-time order tracking
- User accounts and profiles

---

**Kapeko Coffee SPA** - Crafted with ☕ and ❤️ in the Philippines
>>>>>>> 289777a7789e9e825f38c158b92b8748c62eae01
