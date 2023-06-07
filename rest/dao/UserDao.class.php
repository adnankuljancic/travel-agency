
<?php
require_once __DIR__ . '/BaseDao.class.php';


class UserDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("user");
    }


    function getUserById($id)
    {
        return $this->get_by_id($id);
    }

    public function get_user_by_column($column, $value)
    {
        $query = "SELECT * FROM user WHERE $column = :value";
        $params = array(':value' => $value);
        return $this->query_unique($query, $params);
    }

    public function column_value_count($value, $column) 
    {
        $query = "SELECT COUNT(*) as count FROM user WHERE $column = :value";
        $params = array(":value" => $value);
        return $this->query_unique($query, $params)['count'];
    }
}
?>
