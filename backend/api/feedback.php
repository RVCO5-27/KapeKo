<?php
require_once '../Database.php';

class FeedbackAPI {
    private $conn;
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Create a new feedback
    public function createFeedback($data) {
        try {
            $query = "INSERT INTO feedback (name, email, rating, message) 
                     VALUES (:name, :email, :rating, :message)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':rating', $data['rating']);
            $stmt->bindParam(':message', $data['message']);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Thank you for your feedback! We appreciate your input.',
                'feedback_id' => $this->conn->lastInsertId()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error submitting feedback: ' . $e->getMessage()
            ];
        }
    }

    // Get all feedback
    public function getFeedback() {
        try {
            $query = "SELECT * FROM feedback ORDER BY created_at DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return [
                'success' => true,
                'feedback' => $stmt->fetchAll()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching feedback: ' . $e->getMessage()
            ];
        }
    }

    // Get average rating
    public function getAverageRating() {
        try {
            $query = "SELECT AVG(rating) as average_rating, COUNT(*) as total_feedback 
                     FROM feedback WHERE status = 'reviewed'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $result = $stmt->fetch();
            
            return [
                'success' => true,
                'average_rating' => round($result['average_rating'], 1),
                'total_feedback' => $result['total_feedback']
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error calculating rating: ' . $e->getMessage()
            ];
        }
    }

    // Update feedback status
    public function updateFeedbackStatus($feedback_id, $status) {
        try {
            $query = "UPDATE feedback SET status = :status WHERE id = :feedback_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':feedback_id', $feedback_id);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Feedback status updated successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error updating feedback: ' . $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$feedbackAPI = new FeedbackAPI();

switch ($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $feedbackAPI->createFeedback($input);
        echo json_encode($result);
        break;
        
    case 'GET':
        $result = $feedbackAPI->getFeedback();
        echo json_encode($result);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $feedbackAPI->updateFeedbackStatus($input['feedback_id'], $input['status']);
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
