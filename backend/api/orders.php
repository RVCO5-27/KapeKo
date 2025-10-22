<<<<<<< HEAD
<?php
require_once '../Database.php';

class OrderAPI {
    private $conn;
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Create a new order
    public function createOrder($data) {
        try {
            $this->conn->beginTransaction();

            // Insert customer if not exists
            $customer_id = $this->getOrCreateCustomer($data['customer_name'], $data['customer_contact']);

            // Insert order
            $query = "INSERT INTO orders (customer_id, customer_name, customer_contact, total_amount) 
                     VALUES (:customer_id, :customer_name, :customer_contact, :total_amount)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':customer_name', $data['customer_name']);
            $stmt->bindParam(':customer_contact', $data['customer_contact']);
            $stmt->bindParam(':total_amount', $data['total_amount']);
            $stmt->execute();

            $order_id = $this->conn->lastInsertId();

            // Insert order items
            foreach ($data['items'] as $item) {
                $this->insertOrderItem($order_id, $item);
            }

            $this->conn->commit();

            return [
                'success' => true,
                'message' => 'Order placed successfully!',
                'order_id' => $order_id
            ];

        } catch (Exception $e) {
            $this->conn->rollBack();
            return [
                'success' => false,
                'message' => 'Error placing order: ' . $e->getMessage()
            ];
        }
    }

    // Get or create customer
    private function getOrCreateCustomer($name, $contact) {
        // Check if customer exists
        $query = "SELECT id FROM customers WHERE contact = :contact";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':contact', $contact);
        $stmt->execute();
        
        $customer = $stmt->fetch();
        
        if ($customer) {
            return $customer['id'];
        }

        // Create new customer
        $query = "INSERT INTO customers (name, contact) VALUES (:name, :contact)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':contact', $contact);
        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    // Insert order item
    private function insertOrderItem($order_id, $item) {
        $query = "INSERT INTO order_items (order_id, coffee_name, size, quantity, unit_price, total_price) 
                 VALUES (:order_id, :coffee_name, :size, :quantity, :unit_price, :total_price)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $order_id);
        $stmt->bindParam(':coffee_name', $item['coffee']);
        $stmt->bindParam(':size', $item['size']);
        $stmt->bindParam(':quantity', $item['quantity']);
        $stmt->bindParam(':unit_price', $item['price']); // Changed from 'unit_price' to 'price'
        $stmt->bindParam(':total_price', $item['total']);
        $stmt->execute();
    }

    // Get all orders
    public function getOrders() {
        try {
            $query = "SELECT o.*, GROUP_CONCAT(
                        CONCAT(oi.coffee_name, ' (', oi.size, ') x', oi.quantity, ' = ₱', oi.total_price)
                        SEPARATOR ', '
                     ) as items
                     FROM orders o
                     LEFT JOIN order_items oi ON o.id = oi.order_id
                     GROUP BY o.id
                     ORDER BY o.order_date DESC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return [
                'success' => true,
                'orders' => $stmt->fetchAll()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching orders: ' . $e->getMessage()
            ];
        }
    }

    // Update order status
    public function updateOrderStatus($order_id, $status) {
        try {
            $query = "UPDATE orders SET status = :status WHERE id = :order_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':order_id', $order_id);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Order status updated successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error updating order: ' . $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$orderAPI = new OrderAPI();

switch ($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $orderAPI->createOrder($input);
        echo json_encode($result);
        break;
        
    case 'GET':
        $result = $orderAPI->getOrders();
        echo json_encode($result);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $orderAPI->updateOrderStatus($input['order_id'], $input['status']);
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
=======
<?php
require_once '../Database.php';

class OrderAPI {
    private $conn;
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Create a new order
    public function createOrder($data) {
        try {
            $this->conn->beginTransaction();

            // Insert customer if not exists
            $customer_id = $this->getOrCreateCustomer($data['customer_name'], $data['customer_contact']);

            // Insert order
            $query = "INSERT INTO orders (customer_id, customer_name, customer_contact, total_amount) 
                     VALUES (:customer_id, :customer_name, :customer_contact, :total_amount)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':customer_id', $customer_id);
            $stmt->bindParam(':customer_name', $data['customer_name']);
            $stmt->bindParam(':customer_contact', $data['customer_contact']);
            $stmt->bindParam(':total_amount', $data['total_amount']);
            $stmt->execute();

            $order_id = $this->conn->lastInsertId();

            // Insert order items
            foreach ($data['items'] as $item) {
                $this->insertOrderItem($order_id, $item);
            }

            $this->conn->commit();

            return [
                'success' => true,
                'message' => 'Order placed successfully!',
                'order_id' => $order_id
            ];

        } catch (Exception $e) {
            $this->conn->rollBack();
            return [
                'success' => false,
                'message' => 'Error placing order: ' . $e->getMessage()
            ];
        }
    }

    // Get or create customer
    private function getOrCreateCustomer($name, $contact) {
        // Check if customer exists
        $query = "SELECT id FROM customers WHERE contact = :contact";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':contact', $contact);
        $stmt->execute();
        
        $customer = $stmt->fetch();
        
        if ($customer) {
            return $customer['id'];
        }

        // Create new customer
        $query = "INSERT INTO customers (name, contact) VALUES (:name, :contact)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':contact', $contact);
        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    // Insert order item
    private function insertOrderItem($order_id, $item) {
        $query = "INSERT INTO order_items (order_id, coffee_name, size, quantity, unit_price, total_price) 
                 VALUES (:order_id, :coffee_name, :size, :quantity, :unit_price, :total_price)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $order_id);
        $stmt->bindParam(':coffee_name', $item['coffee']);
        $stmt->bindParam(':size', $item['size']);
        $stmt->bindParam(':quantity', $item['quantity']);
        $stmt->bindParam(':unit_price', $item['price']); // Changed from 'unit_price' to 'price'
        $stmt->bindParam(':total_price', $item['total']);
        $stmt->execute();
    }

    // Get all orders
    public function getOrders() {
        try {
            $query = "SELECT o.*, GROUP_CONCAT(
                        CONCAT(oi.coffee_name, ' (', oi.size, ') x', oi.quantity, ' = ₱', oi.total_price)
                        SEPARATOR ', '
                     ) as items
                     FROM orders o
                     LEFT JOIN order_items oi ON o.id = oi.order_id
                     GROUP BY o.id
                     ORDER BY o.order_date DESC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return [
                'success' => true,
                'orders' => $stmt->fetchAll()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching orders: ' . $e->getMessage()
            ];
        }
    }

    // Update order status
    public function updateOrderStatus($order_id, $status) {
        try {
            $query = "UPDATE orders SET status = :status WHERE id = :order_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':order_id', $order_id);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Order status updated successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error updating order: ' . $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$orderAPI = new OrderAPI();

switch ($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $orderAPI->createOrder($input);
        echo json_encode($result);
        break;
        
    case 'GET':
        $result = $orderAPI->getOrders();
        echo json_encode($result);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $orderAPI->updateOrderStatus($input['order_id'], $input['status']);
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
>>>>>>> 289777a7789e9e825f38c158b92b8748c62eae01
