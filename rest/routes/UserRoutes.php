<?php
Flight::route('GET /api/users', function ($id) {
    echo 'Hi';
});

Flight::route('GET /api/users/@id', function ($id) {
    Flight::json(Flight::userService()->getUserById($id));
});

Flight::route('POST /register', function() {
    $entity = Flight::request()->data->getData();
    Flight::json(Flight::userService()->register($entity));
});

Flight::route('POST /login', function() {
    $entity = Flight::request()->data->getData();
    Flight::json(Flight::userService()->login($entity));
});



?>
