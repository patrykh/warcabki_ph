<?php
/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 16.10.2016
 * Time: 16:31
 */

$servername = "localhost";
#$port = "13306";
$username = "root";
$password = "12345678";

try {
    $db = new PDO("mysql:host=$servername;dbname=pwi", $username, $password);
    #$db = new PDO("mysql:host=$servername;port:$port;dbname=pwi", $username, $password);
    // set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}
