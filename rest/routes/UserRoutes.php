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

 /**
* @OA\Post(
*     path="/login", 
*     description="Login",
*     tags={"login"},
*     @OA\RequestBody(description="Login", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*             @OA\Property(property="username", type="string", example="username",	description="Username" ),
*             @OA\Property(property="password", type="string", example="12345",	description="Password" ),
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Logged in successfuly"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/

Flight::route('POST /login', function() {
    $entity = Flight::request()->data->getData();
    Flight::json(Flight::userService()->login($entity));
});



?>
