<?php
    Flight::route('GET /trips', function() {
        Flight::json(Flight::tripService()->get_all());
    });
?>