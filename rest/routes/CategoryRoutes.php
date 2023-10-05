<?php
    Flight::route('GET /categories', function() {
        Flight::json(Flight::categoryService()->get_all());
    });

?>