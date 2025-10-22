<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Order from './components/Order';
import Contact from './components/Contact';
import Feedback from './components/Feedback';
import NotFound from './components/NotFound';
import Admin from './components/Admin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // In a real app, you would check authentication status here
  // For demo purposes, we'll always allow access
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            
            {/* Protected Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            
            {/* Nested Routes Example */}
            <Route path="/services" element={<Navigate to="/menu" replace />} />
            
            {/* 404 Route - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Order from './components/Order';
import Contact from './components/Contact';
import Feedback from './components/Feedback';
import NotFound from './components/NotFound';
import Admin from './components/Admin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // In a real app, you would check authentication status here
  // For demo purposes, we'll always allow access
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            
            {/* Protected Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            
            {/* Nested Routes Example */}
            <Route path="/services" element={<Navigate to="/menu" replace />} />
            
            {/* 404 Route - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
>>>>>>> 289777a7789e9e825f38c158b92b8748c62eae01
