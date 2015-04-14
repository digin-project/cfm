<?php
require_once "config.php";

$origin =  isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;
$request_method = $_SERVER['REQUEST_METHOD'];

$whitelist = DEV ? 'http://localhost:8080' : 'mobile.cfm33.fr';

if($request_method == "POST" && $origin == $whitelist) {
    $data = json_decode(file_get_contents('php://input'));

    /**
     * Check data before send email
     *
     * Date format, html injections, etc .
     */
    if(!empty($data)) {
        $to  = DEV ? "bellot.n@gmail.com" : "";
        $subject = "Contact CFM33";
        $message = "
            <html>
                <head>
                    <title></title>
                </head>
                <body>
                    <h1>{$data->firstname}</h1>
                </body>
            </html>
        ";

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        if(mail($to, $subject, $message, $headers)) {
            print json_encode(array("success" => true));
        } else {
            print json_encode(array("success" => false, "message" => "Mail non envoyé"));
        }

    }

    print json_encode(array("success" => false, "message" => "Requête vide"));
}

print json_encode(array("success" => false, "message" => "Unauthorized."));

exit();
?>
