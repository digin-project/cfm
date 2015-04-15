<?php
    require_once "config.php";

    /**
     * Create a new pdo intent
     *
     * @return {Object} PDO
     */
    function pdoConnect() {
        try {
            return new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME."", DB_USER, DB_PASSWORD, array( PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        } catch (PDOException $e) {
            if(DEV) print "[PDO Error] : " . $e->getMessage() . "<br/>";
            die();
        }
    }

    /**
     * Create a json response
     * if env is dev, return a pretty json
     *
     * @param {Array} $result
     */
    function JsonResponse(array $result) {
        if(DEV) {
            print "<pre>";
            print json_encode($result, JSON_PRETTY_PRINT);
            print "</pre>";
            die();
        } else {
            exit(json_encode($result));
        }
    }

    /**
     * Return an json error
     *
     * @return {String} json error
     */
    function ErrorJsonResponse() {
        return JsonResponse(array("error" => 'Request not allowed.'));
    }

    /**
     * Check if request is allowed
     * width server host and request method
     *
     * @param {Array} $opts, default contain GET method
     * @return {Bool}
     * @return {String} Json string
     */
    function isAllowedRequest(array $opts = array('method' => 'GET')) {
        if($_SERVER['HTTP_HOST'] == HOST){
            if($_SERVER['REQUEST_METHOD'] == $opts['method']) {
                return true;
            }
        }
        return ErrorJsonResponse();
    }

?>
