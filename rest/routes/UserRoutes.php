<?php
Flight::route('GET /api/users', function ($id) {
    echo 'Hi';
});

Flight::route('GET /api/users/@id', function ($id) {
    Flight::json(Flight::userService()->getUserById($id));
});



?>
