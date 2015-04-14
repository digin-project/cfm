<?php
    require_once "config.php";

    function pdoConnect() {
        try {
            return new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME."", DB_USER, DB_PASSWORD);
        } catch (PDOException $e) {
            if(DEV) print "[PDO Error] : " . $e->getMessage() . "<br/>";
            die();
        }
    }
?>
