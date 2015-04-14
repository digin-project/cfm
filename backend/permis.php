<?php
    require_once "utils.php";
    isAllowedRequest();

    $db = pdoConnect();
    $result = array();

    $req = $db->query("SELECT * FROM vitrine WHERE publish ='Y' AND type = 'permis' ORDER BY ordre LIMIT 0,1");
    while($data = $req->fetch(PDO::FETCH_ASSOC)) {
        array_push($result, $data);
    }

    return JsonResponse($result);
?>
