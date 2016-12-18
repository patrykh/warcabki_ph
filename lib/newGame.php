<?php
session_start();

/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 16.10.2016
 * Time: 16:31
 */

include 'db_connection.php';

if (isset($_POST['submit'])){
    if (isset($_POST['channelName'])) {
        $channelName = addslashes($_POST['channelName']);

    }
}
var_dump($channelName);
$sql = $db->prepare("INSERT INTO rooms (name,created_at,owner) VALUES (
                        :channelName,
                        :created_at,
                        :owner)");
$sql -> bindValue(":channelName", $channelName);
$sql -> bindValue(":created_at", date("Y-m-d H:i:s"));
$sql -> bindValue(":owner", $_SESSION['user']);
$result = $sql -> execute();

// musisz pobrac id dodanego pokuju

//var_dump($_REQUEST, $_SERVER);|
//echo "<pre>";
header("Location: ".$_SERVER['HTTP_REFERER'] ); // ?=gameID=n, gdzie n = id
