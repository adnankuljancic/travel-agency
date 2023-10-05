<?php
     /**
    * @OA\Get(
    *     path="/trips", 
    *     description="Trips",
    *     tags={"Trip"},
    *     @OA\Response(
    *         response=200,
    *         description="Getting trips success"
    *     ),
    *     @OA\Response(
    *         response=500,
    *         description="Error"
    *     )
    * )
    */
    Flight::route('GET /trips', function() {
        Flight::json(Flight::tripService()->get_all());
    });
    /**
 * @OA\Get(
 *     path="/trips/{id}", 
 *     description="Get a trip by ID",
 *     tags={"Trip"},
 *     @OA\Parameter(
 *         name="id", 
 *         in="path", 
 *         required=true, 
 *         description="ID of the trip", 
 *         @OA\Schema(
 *             type="integer", 
 *             format="int64" 
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Get trip success"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error"
 *     )
 * )
 */

    
    Flight::route('GET /trips/@id', function($id) {
        Flight::json(Flight::tripService()->get_by_id($id));
    });

    /**
 * @OA\Put(
 *     path="/trips",
 *     description="Update a trip",
 *     tags={"Trip"},
 *     @OA\RequestBody(
 *         required=true,
 *         description="Updated trip data",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="id", type="integer", format="int64", description="ID of the trip"),
 *             @OA\Property(property="other_field", type="string", description="Other field to update"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Update trip success"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error"
 *     )
 * )
 */


    Flight::route('PUT /trips', function() {
        $entity = Flight::request()->data->getData();
        $id = $entity['id'];
        unset($entity['id']);
        Flight::json(Flight::tripService()->update($entity, $id));
    });

    Flight::route('DELETE /trips/@id', function($id) {
        Flight::json(Flight::tripService()->delete($id));
    });


    Flight::route('POST /trips', function() {
        $entity = Flight::request()->data->getData();
        Flight::json(Flight::tripService()->add($entity));
    });
?>