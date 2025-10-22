import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost/backend/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage("Thank you for reaching out! We'll get back to you soon.");
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        alert(`Error: ${result.message || 'Failed to send message. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to connect to server. Please check if XAMPP is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold mb-3">Contact Us</h2>
              <p className="lead">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
            </div>
            
            {successMessage && (
              <div className="alert alert-success text-center" role="alert">
                <i className="fas fa-check-circle me-2"></i>
                {successMessage}
              </div>
            )}
            
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">
                          <i className="fas fa-user me-2"></i>Full Name
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          className="form-control" 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required 
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">
                          <i className="fas fa-envelope me-2"></i>Email Address
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          className="form-control" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required 
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label fw-bold">
                          <i className="fas fa-comment me-2"></i>Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          className="form-control"
                          rows="5"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us how we can help you..."
                          required
                        ></textarea>
                      </div>
                      <div className="d-grid">
                        <button 
                          type="submit" 
                          className="btn btn-warning btn-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i>Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-4">Get in Touch</h5>
                    
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="coffee-bean me-3" style={{fontSize: '1.5rem'}}>
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Location</h6>
                          <p className="mb-0">123 Coffee Street<br />Makati City, Philippines</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <div className="coffee-bean me-3" style={{fontSize: '1.5rem'}}>
                          <i className="fas fa-phone"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Phone</h6>
                          <p className="mb-0">+63 912 345 6789</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <div className="coffee-bean me-3" style={{fontSize: '1.5rem'}}>
                          <i className="fas fa-envelope"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Email</h6>
                          <p className="mb-0">hello@kapeko.com</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <div className="coffee-bean me-3" style={{fontSize: '1.5rem'}}>
                          <i className="fas fa-clock"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Hours</h6>
                          <p className="mb-0">Mon-Sun: 6AM - 10PM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h6 className="fw-bold mb-3">Follow Us</h6>
                      <div className="d-flex gap-3">
                        <a href="#" className="text-warning" style={{fontSize: '1.5rem'}}>
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-warning" style={{fontSize: '1.5rem'}}>
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-warning" style={{fontSize: '1.5rem'}}>
                          <i className="fab fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Kapeko Coffee</h5>
              <p className="text-muted">We'd love to hear from you 📬</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/" className="text-warning text-decoration-none">Home</a>
                <a href="/menu" className="text-warning text-decoration-none">Menu</a>
                <a href="/order" className="text-warning text-decoration-none">Order</a>
                <a href="/feedback" className="text-warning text-decoration-none">Feedback</a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="mb-0">© 2025 Kapeko Coffee | We'd love to hear from you 📬</p>
        </div>
      </footer>
    </>
  );
};

export default Contact;
