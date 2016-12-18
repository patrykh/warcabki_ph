<?php
/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 08.12.2016
 * Time: 19:12
 */
session_start();

if (!$_SESSION['logged']) {
    header('Location: ../index2.html?err=Zaloguj się!');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="styles/styles.css" />
    <link rel="stylesheet" type="text/css" href="styles/style_white.css" />
    <!--<script src="js/scripts.js"></script>-->
    <script src="js/scripts.js"></script>
    <script src="js/PushStream.js"></script>
    <script src="js/PushStreamService.js"></script>
</head>
<body>
<p>Zalogowany użytkownik: <?=$_SESSION['user']?></p>
<p></p>
<div class="box-logout">
    <form action="lib/logout.php" method="post">
        <input type="hidden" name="logout" value="1">
        <input type="submit" value="wyloguj">
    </form>
</div>


<?php
include 'lib/db_connection.php';
try{
    $stmt = $db->prepare("SELECT * FROM `rooms`");
    $result = $stmt -> execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
}catch(PDOException $e){
    echo $e->getMessage();
}


$game = $_GET['gameID'];
?>

<div class="container">
    <div  id="box-roomlist">
        <div>
            <form action="lib/newGame.php" method="post">
                <input type="text" name="channelName" placeholder="Wpisz nazwę nowego kanału"/>
                <input type="submit" name="submit"/>
            </form>
            <p>Wybierz pokój:</p>
            <ul>

                <?php
                foreach($rows as $row) {
                    echo "<li><a href='index.php?gameID=".$row['id']."'>".$row['name']."</a> </li>";
                }
                ?>
        </div>
    </div>


<?php
if (isset($game)) {
    //echo 'wyswietl gre' . $game;
    ?>
    <div class="content">

    </div>

    <div id="box-stats">
        <p>Statystyki</p>
    </div>
    <?php
}

?>
</div>


<script>
    var gameID = <?=isset($_GET['gameID']) ? $_GET['gameID'] : 0?>;
    console.log(gameID);
</script>
</body>

</html>