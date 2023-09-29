
<?php
require_once __DIR__ . '/../config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{
    public static function decodeJwt($encodedToken) {
        try {
            // Decode the JWT token
            $decodedToken = JWT::decode($encodedToken, new Key(Config::$jwt_key, 'HS256'));
            return $decodedToken;
            // Access the payload data (claims) from the decoded token
            $payloadData = $decodedToken->data;
            return $payloadData;
        } catch (Exception $e) {
            // Handle decoding errors here
            echo 'Error decoding JWT token: ' . $e->getMessage();
            return null; // Return null or handle the error as needed
        }
    }
}
?>
