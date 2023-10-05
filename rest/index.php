<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

require '../vendor/autoload.php';


// import and register all business logic files (services) to FlightPHP
require_once __DIR__ . '/services/UserService.php';
require_once __DIR__ . '/services/TripService.php';
require_once __DIR__ . '/services/WishlistService.php';
require_once __DIR__ . '/services/CategoryService.php';


Flight::register('userService', "UserService");
Flight::register('tripService', "TripService");
Flight::register('wishlistService', "WishlistService");
Flight::register('categoryService', "CategoryService");


// import all routes
require_once __DIR__ . '/routes/UserRoutes.php';
require_once __DIR__ . '/routes/TripRoutes.php';
require_once __DIR__ . '/routes/WishlistRoutes.php';
require_once __DIR__ . '/routes/CategoryRoutes.php';


/* REST API documentation endpoint */
Flight::route('GET /docs.json', function(){
    $openapi = \OpenApi\scan('routes');
    header('Content-Type: application/json');
    echo $openapi->toJson();
  });


Flight::start();
?>
