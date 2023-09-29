<?php
require_once 'BaseService.php';
require_once 'JwtService.php';
require_once __DIR__ . "/../dao/WishlistDao.class.php";
require_once __DIR__ . '/../config.php';

class WishlistService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new WishlistDao);
    }
    
    public function add_trip($entity) {
        $jwtService = new JwtService();
        $jwt = $entity['jwt'];
        $decodedToken =  $jwtService->decodeJwt($jwt);
        $entity['user_id'] = $decodedToken->id;
        unset($entity['jwt']);
        return parent::add($entity);
    }

}
?>