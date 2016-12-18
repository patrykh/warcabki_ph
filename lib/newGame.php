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
        var_dump($channelName);
    }
}