<?php
/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 16.10.2016
 * Time: 16:31
 */


include 'db_connection.php';


if (isset($_POST['submit'])){
    if (isset($_POST['login']) && isset($_POST['password']) && isset($_POST['repassword']) && isset($_POST['mail']) ) {
        $login = addslashes($_POST['login']);
        $password = addslashes($_POST['password']);
        $repassword = $_POST['repassword'];
        $mail = $_POST['mail'];
    }
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

echo $hashed_password;

$sql = $db->prepare("INSERT INTO users (login,password,email) VALUES (
                        :login,
                        :hashed_password,
                        :mail)");
$sql -> bindValue(":login", $login);
$sql -> bindValue(":hashed_password", $hashed_password);
$sql -> bindValue(":mail", $mail);
$result = $sql -> execute();

header('Location: ../index2.php');

var_dump($result);
#mb_send_mail()