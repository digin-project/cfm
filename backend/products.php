<?php
    require_once "utils.php";
    isAllowedRequest(array('method' => 'POST'));

    $origin =  isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;
    $request_method = $_SERVER['REQUEST_METHOD'];

    $whitelist = DEV ? 'http://localhost:8080' : 'mobile.cfm33.fr';

    if($request_method == "POST" && $origin == $whitelist) {
        $data = json_decode(file_get_contents('php://input'));
        if(!empty($data)) {

            $db = pdoConnect();
            $result = array();
            
            $req = $db->prepare("SELECT item.id AS id_item, reference.id AS id_reference, reference.name, reference.prix, reference.reservation, reference.stock, reference.date, reference.publish
                FROM item, reference
                AND item.id_reference = reference.id
                ORDER BY reference.date ASC");
            
            $req->execute();

            while($data = $req->fetch(PDO::FETCH_ASSOC)) {
                array_push($result, $data);
            }

            return JsonResponse($result);

        } else {
            return ErrorJsonResponse();
        }
    }