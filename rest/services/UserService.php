<?php
require_once 'BaseService.php';
require_once __DIR__ . "/../dao/UserDao.class.php";
require_once __DIR__ . '/../config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class UserService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new UserDao);
    }


    function getUserById($id)
    {
        return $this->dao->getUserById($id);
    }

    public function register($entity)
    {
        //full name validation

        $full_name = $entity['full_name'];

        if (empty($full_name) || trim($full_name) === '') {
            return ['message' => 'Full name is required'];
        }

        //username validation

        $username = $entity['username'];

        if(strlen($username)<=3) {
            return ['message' => 'Username has to be longer than 3 characters'];
        }

        if (!preg_match('/^[a-zA-Z0-9]+$/', $username)) {
            return ['message' => 'Username has to be alphanumeric (no special characters and no spaces)'];
        }

        $username_count =$this->dao->column_value_count($username, "username");

        if($username_count!=0) {
            return ['message' => 'Username must be unique'];
        }


        //password validation

        $password = $entity['password'];

        if (strlen($password)<=8) {
            return ['message' => 'Password must be longer than 8 characters'];
        }

        $hash = sha1($password);
        $entity['password'] = $hash;

        //email validation

        $email = $entity['email'];

        if (empty($email) || trim($email) === '') {
            return ['message' => 'Email is required'];
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['message' => 'Invalid email format'];
        }

        return ['message' => 'success', 'user' => $this->dao->add($entity)];
    }

    public function login ($entity) {
        

        if (empty($entity['username']) || empty($entity['password'])) {
            return ['message' => "Username and password are required"];
        }
        
        $existingUser = $this->dao->get_user_by_column('username', $entity['username']);
        
        if (!$existingUser) {
            return ['message' => 'Invalid username or password'];
        }
        
        if (sha1($entity['password']) !== $existingUser['password']) {
            return ['message' => 'Invalid username or password'];
        }

        unset($entity['password']);
        $entity['full_name'] = $existingUser['full_name'];
        $entity['id'] = $existingUser['id'];

        $jwt = JWT::encode($entity, Config::$jwt_key, 'HS256');

        return ['token' => $jwt];
        
    }
}
?>
