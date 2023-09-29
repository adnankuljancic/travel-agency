<?php
    Flight::route('POST /mytrips', function() {
        $entity = Flight::request()->data->getData();
        Flight::json(Flight::wishlistService()->add_trip($entity));
    });

    Flight::route('GET /mytrips', function() {
        Flight::json(Flight::wishlistService()->get_all());
    });
?>