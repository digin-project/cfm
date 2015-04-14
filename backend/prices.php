<?php
    require_once "config.php";
    require_once "pdo_connect.php";

    $db = pdoConnect();

    $req = $db->query("SELECT * FROM account");
    var_dump($req->fetch());

?>
