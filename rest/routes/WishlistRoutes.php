<?php
    Flight::route('POST /wishlist', function() {
        $entity = Flight::request()->data->getData();
        Flight::json(Flight::wishlistService()->add_trip($entity));
    });

    Flight::route('GET /wishlist', function() {
        Flight::json(Flight::wishlistService()->get_all());
    });

    Flight::route('DELETE /wishlist/@id', function($id) {
        Flight::json(Flight::wishlistService()->delete($id));
    });
?>