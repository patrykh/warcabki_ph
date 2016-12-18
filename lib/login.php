<?php
session_start();

/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 16.10.2016
 * Time: 16:31
 */

include 'db_connection.php';


$_SESSION['logged'] = 0;

// zmienia znaki specjalne - htmlspecialchars($name);

if (isset($_POST['submit'])){
	$login = addslashes(htmlspecialchars($_POST['login']));
	$password = addslashes(htmlspecialchars($_POST['password']));
}

try{
    $stmt = $db->prepare("SELECT * FROM `users` 
						WHERE `login` = :login");
    $stmt -> bindValue(":login", $login);
    $result = $stmt -> execute();

    $rows = $stmt->fetch(PDO::FETCH_ASSOC);

    if (password_verify($password, $rows['password'])){
        echo 'Zalogowano';

        $_SESSION['logged'] = 1;
        $_SESSION['user'] = $login;
        #include '../index.php';
        header('Location: ../index.php');
    }
    else {
        echo "Błędne hasło lub login!";
        header('Location: ../index2.html?err=Bledny user/haslo');
    }
}catch(PDOException $e){
    echo $e->getMessage();
}

#session unset session detroy wylogwanie#
#wylogowanie forulmarz z polem hidden logut


?>


