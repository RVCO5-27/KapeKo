import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="container mt-3 pt-3">
        <div className={`fade-in-up ${isVisible ? 'visible' : ''}`}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="text-center text-lg-start">
                <h1 className="display-4 fw-bold mb-3">
                  Welcome to <span className="text-warning">Kapeko</span>
                </h1>
                <p className="lead fs-4 mb-4">Authentic Filipino coffee — rich, bold, unforgettable.</p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                  <Link to="/menu" className="btn btn-warning btn-lg">
                    <i className="fas fa-coffee me-2"></i>Explore Menu
                  </Link>
                  <Link to="/order" className="btn btn-outline-warning btn-lg">
                    <i className="fas fa-shopping-cart me-2"></i>Order Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Coffee beans"
                  className="hero img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 h-100 text-center interactive">
              <div className="coffee-bean mb-3" style={{fontSize: '3rem'}}>
                <i className="fas fa-coffee"></i>
              </div>
              <h5 className="fw-bold">Premium Beans</h5>
              <p>
                We source only the finest Barako beans from Batangas for an
                authentic local brew that captures the essence of Filipino coffee culture.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 h-100 text-center interactive">
              <div className="mb-3" style={{fontSize: '3rem', color: '#28a745'}}>
                <i className="fas fa-leaf"></i>
              </div>
              <h5 className="fw-bold">Sustainable</h5>
              <p>
                Our coffee is grown with care, supporting local farmers and eco-
                friendly practices that protect our environment for future generations.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 h-100 text-center interactive">
              <div className="mb-3" style={{fontSize: '3rem', color: '#6f4e37'}}>
                <i className="fas fa-home"></i>
              </div>
              <h5 className="fw-bold">Cozy Experience</h5>
              <p>
                Kapeko isn't just coffee — it's a place to relax, connect, and
                feel at home while enjoying the perfect cup of coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container my-5">
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <div className="card p-4 h-100">
              <div className="coffee-bean mb-3" style={{fontSize: '2.5rem'}}>
                <i className="fas fa-users"></i>
              </div>
              <h3 className="fw-bold text-warning">5000+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-4 h-100">
              <div className="coffee-bean mb-3" style={{fontSize: '2.5rem'}}>
                <i className="fas fa-coffee"></i>
              </div>
              <h3 className="fw-bold text-warning">10+</h3>
              <p>Coffee Varieties</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-4 h-100">
              <div className="coffee-bean mb-3" style={{fontSize: '2.5rem'}}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className="fw-bold text-warning">3</h3>
              <p>Locations</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-4 h-100">
              <div className="coffee-bean mb-3" style={{fontSize: '2.5rem'}}>
                <i className="fas fa-star"></i>
              </div>
              <h3 className="fw-bold text-warning">4.9</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container my-5">
        <div className="card bg-gradient text-white text-center p-5" style={{background: 'var(--gradient-primary)'}}>
          <h2 className="fw-bold mb-3">Ready to Experience Authentic Filipino Coffee?</h2>
          <p className="lead mb-4">Join thousands of coffee lovers who have discovered the rich flavors of Kapeko.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/menu" className="btn btn-warning btn-lg">
              <i className="fas fa-coffee me-2"></i>View Our Menu
            </Link>
            <Link to="/order" className="btn btn-outline-warning btn-lg">
              <i className="fas fa-shopping-cart me-2"></i>Place Order
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              <i className="fas fa-envelope me-2"></i>Contact Us
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Kapeko Coffee</h5>
              <p>Crafting authentic Filipino coffee experiences since 2020.</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/menu" className="text-warning text-decoration-none">Menu</Link>
                <Link to="/order" className="text-warning text-decoration-none">Order</Link>
                <Link to="/contact" className="text-warning text-decoration-none">Contact</Link>
                <Link to="/feedback" className="text-warning text-decoration-none">Feedback</Link>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="mb-0">© 2025 Kapeko PH | Crafted with Love in the Philippines</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
