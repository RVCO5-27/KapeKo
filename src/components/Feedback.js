import React, { useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating.toString()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost/backend/api/feedback.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage("Thank you for your feedback! We appreciate your time and support.");
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          rating: '',
          message: ''
        });
      } else {
        alert(`Error: ${result.message || 'Failed to submit feedback. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to connect to server. Please check if XAMPP is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`btn btn-link p-0 me-1 ${star <= (hoveredRating || parseInt(formData.rating)) ? 'text-warning' : 'text-muted'}`}
        onClick={() => handleRatingClick(star)}
        onMouseEnter={() => setHoveredRating(star)}
        onMouseLeave={() => setHoveredRating(0)}
        style={{fontSize: '2rem'}}
      >
        <i className="fas fa-star"></i>
      </button>
    ));
  };

  return (
    <>
      <main className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold mb-3">We Value Your Feedback</h2>
              <p className="lead">Your opinion matters to us! Help us improve by sharing your experience.</p>
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
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="name" className="form-label fw-bold">
                            <i className="fas fa-user me-2"></i>Your Name
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="form-control" 
                            placeholder="Enter your name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="email" className="form-label fw-bold">
                            <i className="fas fa-envelope me-2"></i>Email Address
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="form-control" 
                            placeholder="Enter your email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label fw-bold">
                          <i className="fas fa-star me-2"></i>Rate Your Experience
                        </label>
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            {renderStars()}
                          </div>
                          <div>
                            {formData.rating && (
                              <span className="badge bg-warning text-dark">
                                {formData.rating === '5' && 'Excellent'}
                                {formData.rating === '4' && 'Very Good'}
                                {formData.rating === '3' && 'Good'}
                                {formData.rating === '2' && 'Fair'}
                                {formData.rating === '1' && 'Poor'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="message" className="form-label fw-bold">
                          <i className="fas fa-comment me-2"></i>Your Feedback
                        </label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows="4" 
                          className="form-control" 
                          placeholder="Tell us about your experience with our coffee and service..." 
                          value={formData.message}
                          onChange={handleInputChange}
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
                              Submitting...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i>Submit Feedback
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
                    <h5 className="fw-bold mb-4">Why Your Feedback Matters</h5>
                    
                    <div className="mb-4">
                      <div className="d-flex align-items-start mb-3">
                        <div className="coffee-bean me-3" style={{fontSize: '1.5rem'}}>
                          <i className="fas fa-coffee"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Improve Our Coffee</h6>
                          <p className="small mb-0">Help us refine our recipes and brewing methods.</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start mb-3">
                        <div className="coffee-bean me-3" style={{fontSize: '1.5rem'}}>
                          <i className="fas fa-heart"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Better Service</h6>
                          <p className="small mb-0">Your feedback helps us enhance customer experience.</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start">
                        <div className="coffee-bean me-3" style={{fontSize: '1.5rem'}}>
                          <i className="fas fa-users"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">Community</h6>
                          <p className="small mb-0">Join our coffee-loving community and share your passion.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h6 className="fw-bold mb-3">Recent Reviews</h6>
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">
                          {'⭐'.repeat(5)}
                        </div>
                        <small>"Amazing Barako coffee!"</small>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">
                          {'⭐'.repeat(4)}
                        </div>
                        <small>"Great service and atmosphere"</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          {'⭐'.repeat(5)}
                        </div>
                        <small>"Best coffee in town!"</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Kapeko Coffee</h5>
              <p className="text-muted">Stay connected, stay caffeinated ⚡️</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/" className="text-warning text-decoration-none">Home</a>
                <a href="/menu" className="text-warning text-decoration-none">Menu</a>
                <a href="/order" className="text-warning text-decoration-none">Order</a>
                <a href="/contact" className="text-warning text-decoration-none">Contact</a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="mb-0">© 2025 Kapeko Coffee | Stay connected, stay caffeinated ⚡️</p>
        </div>
      </footer>
    </>
  );
};

export default Feedback;
