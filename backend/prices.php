<?php
    require_once "config.php";
    require_once "pdo_connect.php";

    $db = pdoConnect();
    $result = array();

    // $query_ref = "SELECT item.id AS id_item, reference.id AS id_reference, reference.name, reference.prix, reference.reservation, reference.stock, reference.date, reference.publish FROM item, reference WHERE item.id_produit = ".$id_produit;
    // $query_ref .= " AND item.id_reference = reference.id";
    // $query_ref .= " AND reference.publish ='Y' AND reference.date > '".time()."'";
    // $query_ref .= " ORDER BY reference.date ASC;";

    // $req = $db->prepare("SELECT item.id AS id_item, reference.id AD id_reference, referance.name, reference.prix, reference.reservation, reference.stock, reference.date, reference.publish
    //     FROM item, reference
    //     WHERE item.id_product = ?
    //     AND item.id_reference = reference.id
    //     AND reference.publish = 'Y' AND reference.date > {time()}
    //     ORDER BY reference.date ASC");
    //
    // var_dump($req->execute(array(10)));
    //
    // var_dump($req->fetch());

    $req = $db->query("SELECT * FROM account");
    while($data = $req->fetch(PDO::FETCH_ASSOC)) {
        array_push($result, $data);
    }
    exit(json_encode($result));
?>
