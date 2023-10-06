<?php
require_once __DIR__ . '/BaseDao.class.php';


class TripDao extends BaseDao
{
    
    public function __construct()
    {
        parent::__construct("trip");
    }

    public function get_by_id($id)
    {
        $stmt = $this->conn->prepare("SELECT t.*, c.name AS category_name FROM trip AS t JOIN category AS c ON t.category_id = c.id WHERE t.id = :id");
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return reset($result);
    }

}
?>
