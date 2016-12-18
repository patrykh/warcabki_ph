<?php
/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 26.10.2016
 * Time: 21:29
 */

session_start();

var_dump($_POST['logout']);
if (isset($_POST['logout'])){

    session_unset();
    session_destroy();
    header('Location: ../index2.html');
}