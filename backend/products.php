<?php
    require_once "utils.php";
    isAllowedRequest(array('method' => 'POST'));

    $origin =  isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;
    $request_method = $_SERVER['REQUEST_METHOD'];

    $whitelist = DEV ? 'http://localhost:8000' : 'mobile.cfm33.fr';

    if($request_method == "POST" && $origin == $whitelist) {
        $data = json_decode(file_get_contents('php://input'));
        if(!empty($data)) {

            $db = pdoConnect();
            $result = array();
            
            $req = $db->prepare("SELECT item.id_produit, reference.id AS id_reference, produit.type, reference.name, reference.prix, reference.reservation, reference.stock, reference.date, reference.publish
                FROM item
                LEFT JOIN reference ON reference.id = item.id_reference
                LEFT JOIN produit ON produit.id = item.id_produit
                WHERE reference.publish = 'Y' 
                AND reference.date > ? 
                ORDER BY item.id_produit ASC, reference.date ASC");
            
            $req->execute(array(time()));

            while($data = $req->fetch(PDO::FETCH_ASSOC)) {
                array_push($result, $data);
            }
            return JsonResponse($result);

        } else {
            return ErrorJsonResponse();
        }
    }