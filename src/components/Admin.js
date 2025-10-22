import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication (in real app, use proper auth)
    if (credentials.username === 'admin' && credentials.password === 'kapeko2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center">Admin Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-warning w-100">Login</button>
                </form>
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Demo credentials: admin / kapeko2025
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const mockOrders = [
    { id: 1, customer: 'Juan Dela Cruz', coffee: 'Barako Coffee', total: 80, date: '2025-01-15' },
    { id: 2, customer: 'Maria Santos', coffee: 'Cafe Latte', total: 120, date: '2025-01-15' },
    { id: 3, customer: 'Pedro Garcia', coffee: 'Cappuccino', total: 110, date: '2025-01-14' }
  ];

  const mockFeedback = [
    { id: 1, name: 'Ana Reyes', rating: 5, message: 'Excellent coffee!', date: '2025-01-15' },
    { id: 2, name: 'Carlos Lopez', rating: 4, message: 'Great service!', date: '2025-01-14' }
  ];

  return (
    <div className="container mt-5 pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Recent Orders</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Coffee</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map(order => (
                      <tr key={order.id}>
                        <td>{order.customer}</td>
                        <td>{order.coffee}</td>
                        <td>₱{order.total}</td>
                        <td>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Recent Feedback</h5>
            </div>
            <div className="card-body">
              {mockFeedback.map(feedback => (
                <div key={feedback.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between">
                    <strong>{feedback.name}</strong>
                    <span>{'⭐'.repeat(feedback.rating)}</span>
                  </div>
                  <p className="mb-1">{feedback.message}</p>
                  <small className="text-muted">{feedback.date}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
