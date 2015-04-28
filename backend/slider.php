<?php
    require_once "utils.php";
    // isAllowedRequest();

    $db = pdoConnect();
    $result = array();

    $req = $db->query("SELECT * FROM image_flash WHERE id_module = 1 AND module = 'slider' ORDER BY ordre");
    while($data = $req->fetch(PDO::FETCH_ASSOC)) {
        array_push($result, $data);
    }

    return JsonResponse($result);
?>
