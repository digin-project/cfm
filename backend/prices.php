<?php
    require_once "utils.php";
    isAllowedRequest();

    if(isset($_GET['item']) && !empty($_GET['item'])) {

        $db = pdoConnect();
        $result = array();

        $req = $db->prepare("SELECT item.id AS id_item, reference.id AS id_reference, reference.name, reference.prix, reference.reservation, reference.stock, reference.date, reference.publish
            FROM item, reference
            WHERE item.id_produit = ?
            AND item.id_reference = reference.id
            AND reference.publish = 'Y' AND reference.date > ?
            ORDER BY reference.date ASC");

        $req->execute(array($_GET['item'], time()));

        while($data = $req->fetch(PDO::FETCH_ASSOC)) {
            array_push($result, $data);
        }

        return JsonResponse($result);

    } else {
        return ErrorJsonResponse();
    }
?>
