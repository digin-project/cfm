<?php
    require_once "config.php";

    function pdoConnect() {
        try {
            return new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME."", DB_USER, DB_PASSWORD, array( PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        } catch (PDOException $e) {
            if(DEV) print "[PDO Error] : " . $e->getMessage() . "<br/>";
            die();
        }
    }
?>
