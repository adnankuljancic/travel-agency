<?php
    Flight::route('GET /trips', function() {
        Flight::json(Flight::tripService()->get_all());
    });

    Flight::route('GET /trips/@id', function($id) {
        Flight::json(Flight::tripService()->get_by_id($id));
    });

    Flight::route('PUT /trips', function() {
        $entity = Flight::request()->data->getData();
        $id = $entity['id'];
        unset($entity['id']);
        Flight::json(Flight::tripService()->update($entity, $id));
    });

    Flight::route('DELETE /trips/@id', function($id) {
        Flight::json(Flight::tripService()->delete($id));
    });
?>