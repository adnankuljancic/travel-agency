<?php
require_once __DIR__ . '/BaseDao.class.php';


class WishlistDao extends BaseDao
{
    
    public function __construct()
    {
        parent::__construct("wishlist");
    }

    /**
     * Method used to read all objects from database
     */
    public function get_all()
    {
        $stmt = $this->conn->prepare("SELECT w.id, t.name, t.image_link, t.short_description, t.price FROM wishlist w JOIN trip t ON w.trip_id = t.id;");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
?>
