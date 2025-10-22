<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

const Order = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_contact: '',
    coffee: '',
    size: 'Small',
    quantity: 1
  });
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({
    customer_name: '',
    customer_contact: '',
    order_id: '',
    cart: [],
    total: 0
  });

  const priceMap = {
    "Barako Coffee": 80,
    "Cafe Latte": 120,
    "Cappuccino": 110,
    "Mocha": 130,
    "Cold Brew": 140,
    "Caffe Americano": 100
  };

  const sizeMultiplier = {
    "Small": 1,
    "Medium": 1.25,
    "Large": 1.5
  };

  const calculateItemPrice = (coffee, size, quantity) => {
    const basePrice = priceMap[coffee] || 0;
    const multiplier = sizeMultiplier[size] || 1;
    return basePrice * multiplier * quantity;
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    setTotalPrice(total);
    return total;
  };

  const addToCart = () => {
    if (!formData.coffee) {
      alert("Please select a coffee.");
      return;
    }

    const existingItemIndex = cart.findIndex(
      item => item.coffee === formData.coffee && item.size === formData.size
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += formData.quantity;
      updatedCart[existingItemIndex].total = calculateItemPrice(
        formData.coffee, 
        formData.size, 
        updatedCart[existingItemIndex].quantity
      );
      setCart(updatedCart);
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        coffee: formData.coffee,
        size: formData.size,
        quantity: formData.quantity,
        total: calculateItemPrice(formData.coffee, formData.size, formData.quantity)
      };
      setCart([...cart, newItem]);
    }

    // Clear receipt when adding new items
    setShowReceipt(false);
    
    // Reset form
    setFormData({
      customer_name: formData.customer_name,
      customer_contact: formData.customer_contact,
      coffee: '',
      size: 'Small',
      quantity: 1
    });
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const startNewOrder = () => {
    setFormData({
      customer_name: '',
      customer_contact: '',
      coffee: '',
      size: 'Small',
      quantity: 1
    });
    setCart([]);
    setTotalPrice(0);
    setShowReceipt(false);
    setSuccessMessage('');
    setReceiptData({
      customer_name: '',
      customer_contact: '',
      order_id: '',
      cart: [],
      total: 0
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          total: calculateItemPrice(item.coffee, item.size, newQuantity)
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.customer_name.length < 2) {
      newErrors.customer_name = "Please enter your full name (at least 2 characters).";
    }
    
    const contactRegex = /^[0-9]{11}$/;
    if (!contactRegex.test(formData.customer_contact)) {
      newErrors.customer_contact = "Please enter a valid 11-digit contact number.";
    }
    
    if (!formData.coffee) {
      newErrors.coffee = "Please select a coffee.";
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Please add items to your cart first.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare order data
      const orderData = {
        customer_name: formData.customer_name,
        customer_contact: formData.customer_contact,
        items: cart.map(item => ({
          coffee: item.coffee,
          size: item.size,
          quantity: item.quantity,
          price: item.total / item.quantity,
          total: item.total
        })),
        total_amount: totalPrice
      };

      // Send to backend API
      const response = await fetch('http://localhost/backend/api/orders.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store receipt data before resetting form
        setReceiptData({
          customer_name: formData.customer_name,
          customer_contact: formData.customer_contact,
          order_id: result.order_id,
          cart: [...cart],
          total: totalPrice
        });
        
        setSuccessMessage(`Thank you for your order! Order ID: ${result.order_id}. We'll contact you soon at ${formData.customer_contact}.`);
        setShowReceipt(true);
        
        // Reset form and cart
        setFormData({
          customer_name: '',
          customer_contact: '',
          coffee: '',
          size: 'Small',
          quantity: 1
        });
        setCart([]);
        setTotalPrice(0);
      } else {
        alert(`Error: ${result.message || 'Failed to place order. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to connect to server. Please check if XAMPP is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total whenever cart changes
  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <>
      <section className="container mt-3 pt-3">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Place Your Order</h2>
          <p className="lead">Add multiple coffees to your cart and customize your order</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="mx-auto" style={{maxWidth: '800px'}}>
            
            {successMessage && (
              <div className="alert alert-success text-center" role="alert">
                <i className="fas fa-check-circle me-2"></i>
                {successMessage}
              </div>
            )}
            
            {/* Customer Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-user me-2"></i>Customer Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="customerName" className="form-label fw-bold">Full Name</label>
                    <input 
                      type="text" 
                      id="customerName" 
                      name="customer_name" 
                      className={`form-control ${errors.customer_name ? 'is-invalid' : ''}`}
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required 
                    />
                    {errors.customer_name && (
                      <div className="invalid-feedback">{errors.customer_name}</div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="customerContact" className="form-label fw-bold">Contact Number</label>
                    <input
                      type="text"
                      id="customerContact"
                      name="customer_contact"
                      className={`form-control ${errors.customer_contact ? 'is-invalid' : ''}`}
                      value={formData.customer_contact}
                      onChange={handleInputChange}
                      placeholder="09XXXXXXXXX"
                      required
                    />
                    {errors.customer_contact && (
                      <div className="invalid-feedback">{errors.customer_contact}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-plus me-2"></i>Add Coffee to Cart</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="coffee" className="form-label fw-bold">Select Coffee</label>
                    <select 
                      id="coffee" 
                      name="coffee" 
                      className={`form-select ${errors.coffee ? 'is-invalid' : ''}`}
                      value={formData.coffee}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>-- Choose your coffee --</option>
                      <option value="Barako Coffee">Barako Coffee - ₱80</option>
                      <option value="Cafe Latte">Cafe Latte - ₱120</option>
                      <option value="Cappuccino">Cappuccino - ₱110</option>
                      <option value="Mocha">Mocha - ₱130</option>
                      <option value="Cold Brew">Cold Brew - ₱140</option>
                      <option value="Caffe Americano">Caffe Americano - ₱100</option>
                    </select>
                    {errors.coffee && (
                      <div className="invalid-feedback">{errors.coffee}</div>
                    )}
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="size" className="form-label fw-bold">Size</label>
                    <select 
                      id="size" 
                      name="size" 
                      className="form-select" 
                      value={formData.size}
                      onChange={handleInputChange}
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium (+25%)</option>
                      <option value="Large">Large (+50%)</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="quantity" className="form-label fw-bold">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                    />
                    {errors.quantity && (
                      <div className="invalid-feedback">{errors.quantity}</div>
                    )}
                  </div>
                  
                  <div className="col-md-2 mb-3 d-flex align-items-end">
                    <button 
                      type="button" 
                      className="btn btn-success w-100"
                      onClick={addToCart}
                    >
                      <i className="fas fa-plus"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-shopping-cart me-2"></i>Shopping Cart ({cart.length} items)</h5>
              </div>
              <div className="card-body">
                {cart.length === 0 ? (
                  <p className="text-center text-muted">Your cart is empty. Add some coffee!</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Coffee</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td className="fw-bold">{item.coffee}</td>
                            <td>{item.size}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td>₱{(item.total / item.quantity).toFixed(2)}</td>
                            <td className="fw-bold">₱{item.total.toFixed(2)}</td>
                            <td>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-receipt me-2"></i>Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h6>Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</h6>
                    <h6>Number of Different Coffees: {cart.length}</h6>
                  </div>
                  <div className="col-md-4 text-end">
                    <h4 className="fw-bold">Total: ₱{totalPrice.toFixed(2)}</h4>
                  </div>
                </div>
                
                <div className="d-grid mt-3">
                  <button 
                    type="button" 
                    className="btn btn-warning btn-lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || cart.length === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-credit-card me-2"></i>Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Receipt Sidebar */}
          <div className="col-lg-4">
            {showReceipt && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0"><i className="fas fa-receipt me-2"></i>Order Receipt</h5>
                </div>
                <div className="card-body">
                  <div className="text-center mb-3">
                    <h6 className="fw-bold">Kapeko Coffee</h6>
                    <small>123 Coffee Street, Makati City</small><br/>
                    <small>Phone: +63 912 345 6789</small>
                  </div>
                  
                  <hr/>
                  
                  <div className="mb-3">
                    <h6>Customer: {receiptData.customer_name}</h6>
                    <h6>Contact: {receiptData.customer_contact}</h6>
                    <h6>Order ID: #{receiptData.order_id}</h6>
                    <h6>Date: {new Date().toLocaleDateString()}</h6>
                    <h6>Time: {new Date().toLocaleTimeString()}</h6>
                  </div>
                  
                  <hr/>
                  
                  <div className="mb-3">
                    {receiptData.cart.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between mb-2">
                        <div>
                          <small>{item.coffee} ({item.size})</small><br/>
                          <small>Qty: {item.quantity}</small>
                        </div>
                        <div className="text-end">
                          <small>₱{item.total.toFixed(2)}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <hr/>
                  
                  <div className="d-flex justify-content-between">
                    <h6 className="fw-bold">Total:</h6>
                    <h6 className="fw-bold">₱{receiptData.total.toFixed(2)}</h6>
                  </div>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted">Thank you for your order!</small>
                    <div className="mt-3">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={startNewOrder}
                      >
                        <i className="fas fa-plus me-1"></i>New Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Kapeko Coffee</h5>
              <p className="text-muted">Thank you for choosing us for your coffee needs.</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/menu" className="text-warning text-decoration-none">Menu</a>
                <a href="/contact" className="text-warning text-decoration-none">Contact</a>
                <a href="/feedback" className="text-warning text-decoration-none">Feedback</a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="mb-0">© 2025 Kapeko Coffee | Thank you for ordering with us ☕️</p>
        </div>
      </footer>
    </>
  );
};

export default Order;
=======
import React, { useState, useEffect } from 'react';

const Order = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_contact: '',
    coffee: '',
    size: 'Small',
    quantity: 1
  });
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({
    customer_name: '',
    customer_contact: '',
    order_id: '',
    cart: [],
    total: 0
  });

  const priceMap = {
    "Barako Coffee": 80,
    "Cafe Latte": 120,
    "Cappuccino": 110,
    "Mocha": 130,
    "Cold Brew": 140,
    "Caffe Americano": 100
  };

  const sizeMultiplier = {
    "Small": 1,
    "Medium": 1.25,
    "Large": 1.5
  };

  const calculateItemPrice = (coffee, size, quantity) => {
    const basePrice = priceMap[coffee] || 0;
    const multiplier = sizeMultiplier[size] || 1;
    return basePrice * multiplier * quantity;
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    setTotalPrice(total);
    return total;
  };

  const addToCart = () => {
    if (!formData.coffee) {
      alert("Please select a coffee.");
      return;
    }

    const existingItemIndex = cart.findIndex(
      item => item.coffee === formData.coffee && item.size === formData.size
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += formData.quantity;
      updatedCart[existingItemIndex].total = calculateItemPrice(
        formData.coffee, 
        formData.size, 
        updatedCart[existingItemIndex].quantity
      );
      setCart(updatedCart);
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        coffee: formData.coffee,
        size: formData.size,
        quantity: formData.quantity,
        total: calculateItemPrice(formData.coffee, formData.size, formData.quantity)
      };
      setCart([...cart, newItem]);
    }

    // Clear receipt when adding new items
    setShowReceipt(false);
    
    // Reset form
    setFormData({
      customer_name: formData.customer_name,
      customer_contact: formData.customer_contact,
      coffee: '',
      size: 'Small',
      quantity: 1
    });
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const startNewOrder = () => {
    setFormData({
      customer_name: '',
      customer_contact: '',
      coffee: '',
      size: 'Small',
      quantity: 1
    });
    setCart([]);
    setTotalPrice(0);
    setShowReceipt(false);
    setSuccessMessage('');
    setReceiptData({
      customer_name: '',
      customer_contact: '',
      order_id: '',
      cart: [],
      total: 0
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          total: calculateItemPrice(item.coffee, item.size, newQuantity)
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.customer_name.length < 2) {
      newErrors.customer_name = "Please enter your full name (at least 2 characters).";
    }
    
    const contactRegex = /^[0-9]{11}$/;
    if (!contactRegex.test(formData.customer_contact)) {
      newErrors.customer_contact = "Please enter a valid 11-digit contact number.";
    }
    
    if (!formData.coffee) {
      newErrors.coffee = "Please select a coffee.";
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Please add items to your cart first.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare order data
      const orderData = {
        customer_name: formData.customer_name,
        customer_contact: formData.customer_contact,
        items: cart.map(item => ({
          coffee: item.coffee,
          size: item.size,
          quantity: item.quantity,
          price: item.total / item.quantity,
          total: item.total
        })),
        total_amount: totalPrice
      };

      // Send to backend API
      const response = await fetch('http://localhost/backend/api/orders.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store receipt data before resetting form
        setReceiptData({
          customer_name: formData.customer_name,
          customer_contact: formData.customer_contact,
          order_id: result.order_id,
          cart: [...cart],
          total: totalPrice
        });
        
        setSuccessMessage(`Thank you for your order! Order ID: ${result.order_id}. We'll contact you soon at ${formData.customer_contact}.`);
        setShowReceipt(true);
        
        // Reset form and cart
        setFormData({
          customer_name: '',
          customer_contact: '',
          coffee: '',
          size: 'Small',
          quantity: 1
        });
        setCart([]);
        setTotalPrice(0);
      } else {
        alert(`Error: ${result.message || 'Failed to place order. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to connect to server. Please check if XAMPP is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total whenever cart changes
  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <>
      <section className="container mt-3 pt-3">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Place Your Order</h2>
          <p className="lead">Add multiple coffees to your cart and customize your order</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="mx-auto" style={{maxWidth: '800px'}}>
            
            {successMessage && (
              <div className="alert alert-success text-center" role="alert">
                <i className="fas fa-check-circle me-2"></i>
                {successMessage}
              </div>
            )}
            
            {/* Customer Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-user me-2"></i>Customer Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="customerName" className="form-label fw-bold">Full Name</label>
                    <input 
                      type="text" 
                      id="customerName" 
                      name="customer_name" 
                      className={`form-control ${errors.customer_name ? 'is-invalid' : ''}`}
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required 
                    />
                    {errors.customer_name && (
                      <div className="invalid-feedback">{errors.customer_name}</div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="customerContact" className="form-label fw-bold">Contact Number</label>
                    <input
                      type="text"
                      id="customerContact"
                      name="customer_contact"
                      className={`form-control ${errors.customer_contact ? 'is-invalid' : ''}`}
                      value={formData.customer_contact}
                      onChange={handleInputChange}
                      placeholder="09XXXXXXXXX"
                      required
                    />
                    {errors.customer_contact && (
                      <div className="invalid-feedback">{errors.customer_contact}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-plus me-2"></i>Add Coffee to Cart</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="coffee" className="form-label fw-bold">Select Coffee</label>
                    <select 
                      id="coffee" 
                      name="coffee" 
                      className={`form-select ${errors.coffee ? 'is-invalid' : ''}`}
                      value={formData.coffee}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>-- Choose your coffee --</option>
                      <option value="Barako Coffee">Barako Coffee - ₱80</option>
                      <option value="Cafe Latte">Cafe Latte - ₱120</option>
                      <option value="Cappuccino">Cappuccino - ₱110</option>
                      <option value="Mocha">Mocha - ₱130</option>
                      <option value="Cold Brew">Cold Brew - ₱140</option>
                      <option value="Caffe Americano">Caffe Americano - ₱100</option>
                    </select>
                    {errors.coffee && (
                      <div className="invalid-feedback">{errors.coffee}</div>
                    )}
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="size" className="form-label fw-bold">Size</label>
                    <select 
                      id="size" 
                      name="size" 
                      className="form-select" 
                      value={formData.size}
                      onChange={handleInputChange}
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium (+25%)</option>
                      <option value="Large">Large (+50%)</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="quantity" className="form-label fw-bold">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                    />
                    {errors.quantity && (
                      <div className="invalid-feedback">{errors.quantity}</div>
                    )}
                  </div>
                  
                  <div className="col-md-2 mb-3 d-flex align-items-end">
                    <button 
                      type="button" 
                      className="btn btn-success w-100"
                      onClick={addToCart}
                    >
                      <i className="fas fa-plus"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-shopping-cart me-2"></i>Shopping Cart ({cart.length} items)</h5>
              </div>
              <div className="card-body">
                {cart.length === 0 ? (
                  <p className="text-center text-muted">Your cart is empty. Add some coffee!</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Coffee</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td className="fw-bold">{item.coffee}</td>
                            <td>{item.size}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td>₱{(item.total / item.quantity).toFixed(2)}</td>
                            <td className="fw-bold">₱{item.total.toFixed(2)}</td>
                            <td>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0"><i className="fas fa-receipt me-2"></i>Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h6>Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</h6>
                    <h6>Number of Different Coffees: {cart.length}</h6>
                  </div>
                  <div className="col-md-4 text-end">
                    <h4 className="fw-bold">Total: ₱{totalPrice.toFixed(2)}</h4>
                  </div>
                </div>
                
                <div className="d-grid mt-3">
                  <button 
                    type="button" 
                    className="btn btn-warning btn-lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || cart.length === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-credit-card me-2"></i>Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Receipt Sidebar */}
          <div className="col-lg-4">
            {showReceipt && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0"><i className="fas fa-receipt me-2"></i>Order Receipt</h5>
                </div>
                <div className="card-body">
                  <div className="text-center mb-3">
                    <h6 className="fw-bold">Kapeko Coffee</h6>
                    <small>123 Coffee Street, Makati City</small><br/>
                    <small>Phone: +63 912 345 6789</small>
                  </div>
                  
                  <hr/>
                  
                  <div className="mb-3">
                    <h6>Customer: {receiptData.customer_name}</h6>
                    <h6>Contact: {receiptData.customer_contact}</h6>
                    <h6>Order ID: #{receiptData.order_id}</h6>
                    <h6>Date: {new Date().toLocaleDateString()}</h6>
                    <h6>Time: {new Date().toLocaleTimeString()}</h6>
                  </div>
                  
                  <hr/>
                  
                  <div className="mb-3">
                    {receiptData.cart.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between mb-2">
                        <div>
                          <small>{item.coffee} ({item.size})</small><br/>
                          <small>Qty: {item.quantity}</small>
                        </div>
                        <div className="text-end">
                          <small>₱{item.total.toFixed(2)}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <hr/>
                  
                  <div className="d-flex justify-content-between">
                    <h6 className="fw-bold">Total:</h6>
                    <h6 className="fw-bold">₱{receiptData.total.toFixed(2)}</h6>
                  </div>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted">Thank you for your order!</small>
                    <div className="mt-3">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={startNewOrder}
                      >
                        <i className="fas fa-plus me-1"></i>New Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Kapeko Coffee</h5>
              <p className="text-muted">Thank you for choosing us for your coffee needs.</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/menu" className="text-warning text-decoration-none">Menu</a>
                <a href="/contact" className="text-warning text-decoration-none">Contact</a>
                <a href="/feedback" className="text-warning text-decoration-none">Feedback</a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="mb-0">© 2025 Kapeko Coffee | Thank you for ordering with us ☕️</p>
        </div>
      </footer>
    </>
  );
};

export default Order;
>>>>>>> 289777a7789e9e825f38c158b92b8748c62eae01
