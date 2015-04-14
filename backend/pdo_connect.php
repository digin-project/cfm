<?php
    require_once "config.php";

    function pdoConnect() {
        try {
            $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME."", DB_USER, DB_PASSWORD);
        } catch (PDOException $e) {
            if(DEV) {
                print "[PDO Error] : " . $e->getMessage() . "<br/>";
            }
            die();
        }
    }

    pdoConnect();
?>
