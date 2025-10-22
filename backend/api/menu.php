<?php
require_once '../Database.php';

class MenuAPI {
    private $conn;
    private $db;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    // Get all menu items
    public function getMenuItems() {
        try {
            $query = "SELECT * FROM menu_items WHERE is_active = 1 ORDER BY name";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $items = $stmt->fetchAll();
            
            // Decode JSON fields
            foreach ($items as &$item) {
                $item['sizes'] = json_decode($item['sizes'], true);
                $item['ingredients'] = explode(', ', $item['ingredients']);
            }
            
            return [
                'success' => true,
                'menu_items' => $items
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching menu: ' . $e->getMessage()
            ];
        }
    }

    // Get single menu item
    public function getMenuItem($id) {
        try {
            $query = "SELECT * FROM menu_items WHERE id = :id AND is_active = 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            $item = $stmt->fetch();
            
            if ($item) {
                $item['sizes'] = json_decode($item['sizes'], true);
                $item['ingredients'] = explode(', ', $item['ingredients']);
                
                return [
                    'success' => true,
                    'menu_item' => $item
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Menu item not found'
                ];
            }

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching menu item: ' . $e->getMessage()
            ];
        }
    }

    // Add new menu item
    public function addMenuItem($data) {
        try {
            $query = "INSERT INTO menu_items (name, description, price, image_url, ingredients, sizes) 
                     VALUES (:name, :description, :price, :image_url, :ingredients, :sizes)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':image_url', $data['image_url']);
            $stmt->bindParam(':ingredients', $data['ingredients']);
            $stmt->bindParam(':sizes', $data['sizes']);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Menu item added successfully',
                'item_id' => $this->conn->lastInsertId()
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error adding menu item: ' . $e->getMessage()
            ];
        }
    }

    // Update menu item
    public function updateMenuItem($id, $data) {
        try {
            $query = "UPDATE menu_items SET 
                     name = :name, 
                     description = :description, 
                     price = :price, 
                     image_url = :image_url, 
                     ingredients = :ingredients, 
                     sizes = :sizes 
                     WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':image_url', $data['image_url']);
            $stmt->bindParam(':ingredients', $data['ingredients']);
            $stmt->bindParam(':sizes', $data['sizes']);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Menu item updated successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error updating menu item: ' . $e->getMessage()
            ];
        }
    }

    // Delete menu item (soft delete)
    public function deleteMenuItem($id) {
        try {
            $query = "UPDATE menu_items SET is_active = 0 WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Menu item deleted successfully'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error deleting menu item: ' . $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$menuAPI = new MenuAPI();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $result = $menuAPI->getMenuItem($_GET['id']);
        } else {
            $result = $menuAPI->getMenuItems();
        }
        echo json_encode($result);
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $menuAPI->addMenuItem($input);
        echo json_encode($result);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $menuAPI->updateMenuItem($input['id'], $input);
        echo json_encode($result);
        break;
        
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        $result = $menuAPI->deleteMenuItem($input['id']);
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
