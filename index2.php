<?php
session_start();

$color = isset($_COOKIE["color"]) ? $_COOKIE["color"] : "black";

?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="styles/main_style.css" />
	<link rel="stylesheet" type="text/css" href="styles/style_<?=$color;?>.css" />
</head>
<body>

<?php
	if ($_SESSION['logged'] === 1) {

	header('Location: index.php');
	}
?>
<?php
	$err = isset($_GET['err']) ? $_GET['err'] : '';
	if (!empty($err)) {
		echo "<script>alert(\"".$err."\");</script>";
	}
?>

<p>Warcabki</p>
<div id="box-login">
    <form id="login-form" action="lib/login.php" method="post">
        <input type="text" placeholder="Enter login" name="login" required><br>
		<input type="password" placeholder="Enter password" name="password" required><br>
		<input type="submit" name="submit" value="Zaloguj">

	</form>
	<form action="register.html" method="get">
		<input type="submit" name="register" value="Zarejestruj nowego użytkownika"/>
	</form>
</div>




</body>
</html>

