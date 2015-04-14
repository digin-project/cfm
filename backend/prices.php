<?php
    require_once "utils.php";

    $db = pdoConnect();
    $result = array();
    $now = time();

    isAllowedRequest();

    $req = $db->prepare("SELECT item.id AS id_item, reference.id AS id_reference, reference.name, reference.prix, reference.reservation, reference.stock, reference.date, reference.publish
        FROM item, reference
        WHERE item.id_produit = ?
        AND item.id_reference = reference.id
        AND reference.publish = 'Y' AND reference.date > ?
        ORDER BY reference.date ASC");

    $req->execute(array(5, $now));

    while($data = $req->fetch(PDO::FETCH_ASSOC)) {
        array_push($result, $data);
    }

    return JsonResponse($result);
?>
