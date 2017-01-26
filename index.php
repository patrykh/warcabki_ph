<?php
/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 08.12.2016
 * Time: 19:12
 */
session_start();

$color = isset($_COOKIE["color"]) ? $_COOKIE["color"] : "white";

if (!$_SESSION['logged']) {
    header('Location: ../index2.php?err=Zaloguj się!');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="styles/main_style.css" />
    <link rel="stylesheet" type="text/css" href="styles/styles.css" />
    <link rel="stylesheet" type="text/css" href="styles/style_<?=$color;?>.css" />
    <!--<script src="js/scripts.js"></script>-->
    <script src="js/game.js"></script>
    <script src="js/Utils.js"></script>
    <script src="js/PushStream.js"></script>
    <script src="js/PushStreamService.js"></script>
</head>
<body>
<header>
    <?php
    include ("header.html");
    ?>


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
</header>
<main>
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
</main>
</body>

</html>