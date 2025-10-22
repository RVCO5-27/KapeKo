<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: "Barako Coffee",
      description: "Strong and bold, the classic Filipino brew.",
      price: 80,
      image: "https://echostore.ph/cdn/shop/articles/image1_a42275c9-b4e0-43c5-8ec6-baa6ef3b498a_1200x1200.jpg?v=1653717760",
      details: "Our signature Barako coffee is made from premium Liberica beans grown in the volcanic soil of Batangas. This full-bodied coffee offers a rich, earthy flavor with notes of chocolate and a slightly bitter finish that coffee connoisseurs love.",
      ingredients: ["Liberica Coffee Beans", "Hot Water", "Optional: Sugar", "Optional: Cream"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    },
    {
      id: 2,
      name: "Cafe Latte",
      description: "Espresso with steamed milk for a smooth taste.",
      price: 120,
      image: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZSUyMGxhdHRlfGVufDB8fDB8fHww",
      details: "A perfect blend of our signature espresso and steamed milk, creating a creamy and smooth coffee experience. The milk adds sweetness and reduces the coffee's acidity.",
      ingredients: ["Espresso", "Steamed Milk", "Milk Foam", "Optional: Vanilla Syrup"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    },
    {
      id: 3,
      name: "Cappuccino",
      description: "Perfectly balanced espresso, milk, and foam.",
      price: 110,
      image: "https://images.unsplash.com/photo-1499961524705-bfd103e65a6d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: "The classic Italian coffee drink with equal parts espresso, steamed milk, and milk foam. Our baristas create the perfect microfoam for a velvety texture.",
      ingredients: ["Espresso", "Steamed Milk", "Milk Foam", "Optional: Cinnamon"],
      sizes: ["Small (6oz)", "Medium (8oz)", "Large (12oz)"]
    },
    {
      id: 4,
      name: "Mocha",
      description: "Rich chocolate blended with smooth espresso.",
      price: 130,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefU6BIUDyTAORf1o8WrByF7poO_Wnw_c1Cw&s",
      details: "A delightful combination of espresso, steamed milk, and rich chocolate. Perfect for those who love both coffee and chocolate. We use premium cocoa powder for an authentic chocolate taste.",
      ingredients: ["Espresso", "Steamed Milk", "Chocolate Syrup", "Whipped Cream", "Chocolate Shavings"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    },
    {
      id: 5,
      name: "Cold Brew",
      description: "Brewed for hours, bold yet refreshing.",
      price: 140,
      image: "https://starbucks.ph/seed_data/CBRE_ColdBrew.jpg",
      details: "Our cold brew is steeped for 12-24 hours in cold water, resulting in a smooth, less acidic coffee with natural sweetness. Perfect for hot Philippine weather.",
      ingredients: ["Cold Brew Coffee", "Ice", "Optional: Milk", "Optional: Sweetener"],
      sizes: ["Small (12oz)", "Medium (16oz)", "Large (20oz)"]
    },
    {
      id: 6,
      name: "Caffe Americano",
      description: "Espresso diluted with hot water for a smooth, mellow cup.",
      price: 100,
      image: "https://images.unsplash.com/photo-1673846685646-675aca3b2d11?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW1lcmljYW5vJTIwY29mZmVlfGVufDB8fDB8fHww",
      details: "A simple yet elegant coffee drink made by adding hot water to espresso. This creates a coffee similar to drip coffee but with the rich flavor of espresso.",
      ingredients: ["Espresso", "Hot Water", "Optional: Sugar", "Optional: Cream"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <section className="container mt-5 pt-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Our Menu</h2>
          <p className="lead">Discover our carefully crafted coffee selection</p>
        </div>
        
        <div className="row g-4">
          {menuItems.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="card h-100 interactive" onClick={() => handleItemClick(item)}>
                <div className="position-relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="card-img-top" 
                    style={{height: '250px', objectFit: 'cover'}}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-warning text-dark fs-6">₱{item.price}</span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text flex-grow-1">{item.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-warning btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                    <Link to="/order" className="btn btn-warning btn-sm">
                      <i className="fas fa-shopping-cart me-1"></i>Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Item Modal */}
      {showModal && selectedItem && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{selectedItem.name}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name}
                      className="img-fluid rounded"
                      style={{height: '300px', objectFit: 'cover', width: '100%'}}
                    />
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold text-warning mb-3">₱{selectedItem.price}</h6>
                    <p className="text-muted mb-3">{selectedItem.details}</p>
                    
                    <h6 className="fw-bold">Ingredients:</h6>
                    <ul className="list-unstyled">
                      {selectedItem.ingredients.map((ingredient, index) => (
                        <li key={index} className="mb-1">
                          <i className="fas fa-check text-success me-2"></i>{ingredient}
                        </li>
                      ))}
                    </ul>
                    
                    <h6 className="fw-bold">Available Sizes:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedItem.sizes.map((size, index) => (
                        <span key={index} className="badge bg-light text-dark">{size}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <Link to="/order" className="btn btn-warning" onClick={closeModal}>
                  <i className="fas fa-shopping-cart me-2"></i>Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Kapeko Coffee</h5>
              <p className="text-muted">Crafting authentic Filipino coffee experiences since 2020.</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/" className="text-warning text-decoration-none">Home</Link>
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

export default Menu;
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: "Barako Coffee",
      description: "Strong and bold, the classic Filipino brew.",
      price: 80,
      image: "https://echostore.ph/cdn/shop/articles/image1_a42275c9-b4e0-43c5-8ec6-baa6ef3b498a_1200x1200.jpg?v=1653717760",
      details: "Our signature Barako coffee is made from premium Liberica beans grown in the volcanic soil of Batangas. This full-bodied coffee offers a rich, earthy flavor with notes of chocolate and a slightly bitter finish that coffee connoisseurs love.",
      ingredients: ["Liberica Coffee Beans", "Hot Water", "Optional: Sugar", "Optional: Cream"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    },
    {
      id: 2,
      name: "Cafe Latte",
      description: "Espresso with steamed milk for a smooth taste.",
      price: 120,
      image: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZSUyMGxhdHRlfGVufDB8fDB8fHww",
      details: "A perfect blend of our signature espresso and steamed milk, creating a creamy and smooth coffee experience. The milk adds sweetness and reduces the coffee's acidity.",
      ingredients: ["Espresso", "Steamed Milk", "Milk Foam", "Optional: Vanilla Syrup"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    },
    {
      id: 3,
      name: "Cappuccino",
      description: "Perfectly balanced espresso, milk, and foam.",
      price: 110,
      image: "https://images.unsplash.com/photo-1499961524705-bfd103e65a6d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      details: "The classic Italian coffee drink with equal parts espresso, steamed milk, and milk foam. Our baristas create the perfect microfoam for a velvety texture.",
      ingredients: ["Espresso", "Steamed Milk", "Milk Foam", "Optional: Cinnamon"],
      sizes: ["Small (6oz)", "Medium (8oz)", "Large (12oz)"]
    },
    {
      id: 4,
      name: "Mocha",
      description: "Rich chocolate blended with smooth espresso.",
      price: 130,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefU6BIUDyTAORf1o8WrByF7poO_Wnw_c1Cw&s",
      details: "A delightful combination of espresso, steamed milk, and rich chocolate. Perfect for those who love both coffee and chocolate. We use premium cocoa powder for an authentic chocolate taste.",
      ingredients: ["Espresso", "Steamed Milk", "Chocolate Syrup", "Whipped Cream", "Chocolate Shavings"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    },
    {
      id: 5,
      name: "Cold Brew",
      description: "Brewed for hours, bold yet refreshing.",
      price: 140,
      image: "https://starbucks.ph/seed_data/CBRE_ColdBrew.jpg",
      details: "Our cold brew is steeped for 12-24 hours in cold water, resulting in a smooth, less acidic coffee with natural sweetness. Perfect for hot Philippine weather.",
      ingredients: ["Cold Brew Coffee", "Ice", "Optional: Milk", "Optional: Sweetener"],
      sizes: ["Small (12oz)", "Medium (16oz)", "Large (20oz)"]
    },
    {
      id: 6,
      name: "Caffe Americano",
      description: "Espresso diluted with hot water for a smooth, mellow cup.",
      price: 100,
      image: "https://images.unsplash.com/photo-1673846685646-675aca3b2d11?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW1lcmljYW5vJTIwY29mZmVlfGVufDB8fDB8fHww",
      details: "A simple yet elegant coffee drink made by adding hot water to espresso. This creates a coffee similar to drip coffee but with the rich flavor of espresso.",
      ingredients: ["Espresso", "Hot Water", "Optional: Sugar", "Optional: Cream"],
      sizes: ["Small (8oz)", "Medium (12oz)", "Large (16oz)"]
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <section className="container mt-5 pt-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Our Menu</h2>
          <p className="lead">Discover our carefully crafted coffee selection</p>
        </div>
        
        <div className="row g-4">
          {menuItems.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="card h-100 interactive" onClick={() => handleItemClick(item)}>
                <div className="position-relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="card-img-top" 
                    style={{height: '250px', objectFit: 'cover'}}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-warning text-dark fs-6">₱{item.price}</span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text flex-grow-1">{item.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-warning btn-sm">
                      <i className="fas fa-info-circle me-1"></i>Details
                    </button>
                    <Link to="/order" className="btn btn-warning btn-sm">
                      <i className="fas fa-shopping-cart me-1"></i>Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Item Modal */}
      {showModal && selectedItem && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{selectedItem.name}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name}
                      className="img-fluid rounded"
                      style={{height: '300px', objectFit: 'cover', width: '100%'}}
                    />
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold text-warning mb-3">₱{selectedItem.price}</h6>
                    <p className="text-muted mb-3">{selectedItem.details}</p>
                    
                    <h6 className="fw-bold">Ingredients:</h6>
                    <ul className="list-unstyled">
                      {selectedItem.ingredients.map((ingredient, index) => (
                        <li key={index} className="mb-1">
                          <i className="fas fa-check text-success me-2"></i>{ingredient}
                        </li>
                      ))}
                    </ul>
                    
                    <h6 className="fw-bold">Available Sizes:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedItem.sizes.map((size, index) => (
                        <span key={index} className="badge bg-light text-dark">{size}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <Link to="/order" className="btn btn-warning" onClick={closeModal}>
                  <i className="fas fa-shopping-cart me-2"></i>Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Kapeko Coffee</h5>
              <p className="text-muted">Crafting authentic Filipino coffee experiences since 2020.</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/" className="text-warning text-decoration-none">Home</Link>
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

export default Menu;
>>>>>>> 289777a7789e9e825f38c158b92b8748c62eae01
