<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kapeko Coffee - Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            min-height: 100vh;
        }
        .card {
            border: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .stat-card.success {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        .stat-card.warning {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .stat-card.info {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
    </style>
</head>
<body>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center mb-4">
                    <i class="fas fa-coffee me-2"></i>Kapeko Coffee Admin Panel
                </h1>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="row mb-4">
            <div class="col-md-3 mb-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <i class="fas fa-shopping-cart fa-2x mb-2"></i>
                        <h3 id="totalOrders">0</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card stat-card success">
                    <div class="card-body text-center">
                        <i class="fas fa-envelope fa-2x mb-2"></i>
                        <h3 id="totalMessages">0</h3>
                        <p>Contact Messages</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card stat-card warning">
                    <div class="card-body text-center">
                        <i class="fas fa-star fa-2x mb-2"></i>
                        <h3 id="totalFeedback">0</h3>
                        <p>Feedback Reviews</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card stat-card info">
                    <div class="card-body text-center">
                        <i class="fas fa-coffee fa-2x mb-2"></i>
                        <h3 id="totalMenuItems">0</h3>
                        <p>Menu Items</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs" id="adminTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button">
                    <i class="fas fa-shopping-cart me-2"></i>Orders
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="messages-tab" data-bs-toggle="tab" data-bs-target="#messages" type="button">
                    <i class="fas fa-envelope me-2"></i>Messages
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="feedback-tab" data-bs-toggle="tab" data-bs-target="#feedback" type="button">
                    <i class="fas fa-star me-2"></i>Feedback
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="menu-tab" data-bs-toggle="tab" data-bs-target="#menu" type="button">
                    <i class="fas fa-coffee me-2"></i>Menu
                </button>
            </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content" id="adminTabsContent">
            <!-- Orders Tab -->
            <div class="tab-pane fade show active" id="orders" role="tabpanel">
                <div class="card mt-3">
                    <div class="card-header">
                        <h5><i class="fas fa-shopping-cart me-2"></i>Recent Orders</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Contact</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Items</th>
                                    </tr>
                                </thead>
                                <tbody id="ordersTableBody">
                                    <!-- Orders will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Messages Tab -->
            <div class="tab-pane fade" id="messages" role="tabpanel">
                <div class="card mt-3">
                    <div class="card-header">
                        <h5><i class="fas fa-envelope me-2"></i>Contact Messages</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody id="messagesTableBody">
                                    <!-- Messages will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Feedback Tab -->
            <div class="tab-pane fade" id="feedback" role="tabpanel">
                <div class="card mt-3">
                    <div class="card-header">
                        <h5><i class="fas fa-star me-2"></i>Customer Feedback</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Rating</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody id="feedbackTableBody">
                                    <!-- Feedback will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Menu Tab -->
            <div class="tab-pane fade" id="menu" role="tabpanel">
                <div class="card mt-3">
                    <div class="card-header">
                        <h5><i class="fas fa-coffee me-2"></i>Menu Items</h5>
                    </div>
                    <div class="card-body">
                        <div class="row" id="menuItemsContainer">
                            <!-- Menu items will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Load data when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadStatistics();
            loadOrders();
            loadMessages();
            loadFeedback();
            loadMenu();
        });

        // Load statistics
        async function loadStatistics() {
            try {
                const [ordersRes, messagesRes, feedbackRes, menuRes] = await Promise.all([
                    fetch('api/orders.php'),
                    fetch('api/contact.php'),
                    fetch('api/feedback.php'),
                    fetch('api/menu.php')
                ]);

                const orders = await ordersRes.json();
                const messages = await messagesRes.json();
                const feedback = await feedbackRes.json();
                const menu = await menuRes.json();

                document.getElementById('totalOrders').textContent = orders.orders ? orders.orders.length : 0;
                document.getElementById('totalMessages').textContent = messages.messages ? messages.messages.length : 0;
                document.getElementById('totalFeedback').textContent = feedback.feedback ? feedback.feedback.length : 0;
                document.getElementById('totalMenuItems').textContent = menu.menu_items ? menu.menu_items.length : 0;
            } catch (error) {
                console.error('Error loading statistics:', error);
            }
        }

        // Load orders
        async function loadOrders() {
            try {
                const response = await fetch('api/orders.php');
                const data = await response.json();
                
                const tbody = document.getElementById('ordersTableBody');
                tbody.innerHTML = '';

                if (data.success && data.orders) {
                    data.orders.forEach(order => {
                        const row = `
                            <tr>
                                <td>#${order.id}</td>
                                <td>${order.customer_name}</td>
                                <td>${order.customer_contact}</td>
                                <td>₱${parseFloat(order.total_amount).toFixed(2)}</td>
                                <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
                                <td>${new Date(order.order_date).toLocaleDateString()}</td>
                                <td>${order.items || 'N/A'}</td>
                            </tr>
                        `;
                        tbody.innerHTML += row;
                    });
                }
            } catch (error) {
                console.error('Error loading orders:', error);
            }
        }

        // Load messages
        async function loadMessages() {
            try {
                const response = await fetch('api/contact.php');
                const data = await response.json();
                
                const tbody = document.getElementById('messagesTableBody');
                tbody.innerHTML = '';

                if (data.success && data.messages) {
                    data.messages.forEach(message => {
                        const row = `
                            <tr>
                                <td>${message.id}</td>
                                <td>${message.name}</td>
                                <td>${message.email}</td>
                                <td>${message.message.substring(0, 50)}...</td>
                                <td><span class="badge bg-${getStatusColor(message.status)}">${message.status}</span></td>
                                <td>${new Date(message.created_at).toLocaleDateString()}</td>
                            </tr>
                        `;
                        tbody.innerHTML += row;
                    });
                }
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        }

        // Load feedback
        async function loadFeedback() {
            try {
                const response = await fetch('api/feedback.php');
                const data = await response.json();
                
                const tbody = document.getElementById('feedbackTableBody');
                tbody.innerHTML = '';

                if (data.success && data.feedback) {
                    data.feedback.forEach(feedback => {
                        const stars = '⭐'.repeat(feedback.rating);
                        const row = `
                            <tr>
                                <td>${feedback.id}</td>
                                <td>${feedback.name}</td>
                                <td>${feedback.email}</td>
                                <td>${stars} (${feedback.rating}/5)</td>
                                <td>${feedback.message.substring(0, 50)}...</td>
                                <td><span class="badge bg-${getStatusColor(feedback.status)}">${feedback.status}</span></td>
                                <td>${new Date(feedback.created_at).toLocaleDateString()}</td>
                            </tr>
                        `;
                        tbody.innerHTML += row;
                    });
                }
            } catch (error) {
                console.error('Error loading feedback:', error);
            }
        }

        // Load menu
        async function loadMenu() {
            try {
                const response = await fetch('api/menu.php');
                const data = await response.json();
                
                const container = document.getElementById('menuItemsContainer');
                container.innerHTML = '';

                if (data.success && data.menu_items) {
                    data.menu_items.forEach(item => {
                        const card = `
                            <div class="col-md-4 mb-3">
                                <div class="card">
                                    <img src="${item.image_url}" class="card-img-top" style="height: 200px; object-fit: cover;">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>
                                        <p class="card-text">${item.description}</p>
                                        <p class="card-text"><strong>₱${parseFloat(item.price).toFixed(2)}</strong></p>
                                        <small class="text-muted">Sizes: ${item.sizes.join(', ')}</small>
                                    </div>
                                </div>
                            </div>
                        `;
                        container.innerHTML += card;
                    });
                }
            } catch (error) {
                console.error('Error loading menu:', error);
            }
        }

        // Get status color for badges
        function getStatusColor(status) {
            switch(status) {
                case 'pending': return 'warning';
                case 'confirmed': return 'info';
                case 'completed': return 'success';
                case 'new': return 'primary';
                case 'read': return 'info';
                case 'reviewed': return 'success';
                default: return 'secondary';
            }
        }
    </script>
</body>
</html>
