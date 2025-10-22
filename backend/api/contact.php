<<<<<<< HEAD
<?php
require_once '../Database.php';

class ContactAPI {
    private $conn;
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Create a new contact message
    public function createMessage($data) {
        try {
            $query = "INSERT INTO contact_messages (name, email, message) 
                     VALUES (:name, :email, :message)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':message', $data['message']);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Message sent successfully! We will get back to you soon.',
                'message_id' => $this->conn->lastInsertId()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error sending message: ' . $e->getMessage()
            ];
        }
    }

    // Get all contact messages
    public function getMessages() {
        try {
            $query = "SELECT * FROM contact_messages ORDER BY created_at DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return [
                'success' => true,
                'messages' => $stmt->fetchAll()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching messages: ' . $e->getMessage()
            ];
        }
    }

    // Update message status
    public function updateMessageStatus($message_id, $status) {
        try {
            $query = "UPDATE contact_messages SET status = :status WHERE id = :message_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':message_id', $message_id);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Message status updated successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error updating message: ' . $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$contactAPI = new ContactAPI();

switch ($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $contactAPI->createMessage($input);
        echo json_encode($result);
        break;
        
    case 'GET':
        $result = $contactAPI->getMessages();
        echo json_encode($result);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $contactAPI->updateMessageStatus($input['message_id'], $input['status']);
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

class ContactAPI {
    private $conn;
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Create a new contact message
    public function createMessage($data) {
        try {
            $query = "INSERT INTO contact_messages (name, email, message) 
                     VALUES (:name, :email, :message)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':message', $data['message']);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Message sent successfully! We will get back to you soon.',
                'message_id' => $this->conn->lastInsertId()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error sending message: ' . $e->getMessage()
            ];
        }
    }

    // Get all contact messages
    public function getMessages() {
        try {
            $query = "SELECT * FROM contact_messages ORDER BY created_at DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return [
                'success' => true,
                'messages' => $stmt->fetchAll()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching messages: ' . $e->getMessage()
            ];
        }
    }

    // Update message status
    public function updateMessageStatus($message_id, $status) {
        try {
            $query = "UPDATE contact_messages SET status = :status WHERE id = :message_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':message_id', $message_id);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Message status updated successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error updating message: ' . $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$contactAPI = new ContactAPI();

switch ($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $contactAPI->createMessage($input);
        echo json_encode($result);
        break;
        
    case 'GET':
        $result = $contactAPI->getMessages();
        echo json_encode($result);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $contactAPI->updateMessageStatus($input['message_id'], $input['status']);
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
>>>>>>> 289777a7789e9e825f38c158b92b8748c62eae01
