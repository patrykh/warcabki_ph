<?php
//nasz skrypt jest mocno ograniczony - to tylko przykład

include 'db_connection.php';
//echo $_GET['msg'];

/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 16.10.2016
 * Time: 16:31
 */

if (isset($_GET['msg'])){
    $login = addslashes(htmlspecialchars($_GET['msg']));
}

//$login = 'patryk';

try{
    $stmt = $db->prepare("SELECT * FROM `users` 
						WHERE `login` = :login");
    $stmt -> bindValue(":login", $login);
    $result = $stmt -> execute();

    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($rows){
        echo 'Taki użytkownik istnieje!';
    }
    else {
        echo "Login jest wolny! :)";
    }
}catch(PDOException $e){
    echo $e->getMessage();
}

#session unset session detroy wylogwanie#
#wylogowanie forulmarz z polem hidden logut


?>


