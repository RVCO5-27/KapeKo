import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mt-5 pt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-1 text-warning">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-4">
            Oops! The page you're looking for doesn't exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <div className="mb-4">
            <span className="coffee-bean" style={{fontSize: '4rem'}}>☕</span>
          </div>
          <p className="mb-4">
            Don't worry, our coffee is still brewing! Let's get you back on track.
          </p>
          <Link to="/" className="btn btn-warning btn-lg me-3">
            Go Home
          </Link>
          <Link to="/menu" className="btn btn-outline-warning btn-lg">
            Browse Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
