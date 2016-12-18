<?php

session_start();
?>

<html>
<head>
    <link rel="stylesheet" type="text/css" href="styles/style.css" >
</head>
<body>
<?php
/**
 * Created by IntelliJ IDEA.
 * User: patry
 * Date: 26.10.2016
 * Time: 20:12
 */
var_dump($_SESSION);
#require "lib/login.php";


var_dump($_SESSION);
if (!isset($_SESSION['logged']) ||  $_SESSION['logged'] === 0){
?>
	<div id="box-login">
		<form id="login-form" action="lib/login.php" method="post">
			<input type="text" placeholder="Enter login" name="login" required><br>
			<input type="password" placeholder="Enter password" name="password" required><br>
			<input type="submit" name="submit">

		</form>
	</div>
	<?php
}
var_dump($_SESSION);
if (isset($_SESSION['logged']) && $_SESSION['logged'] === 1){
	?>
<form action="lib/logout.php" method="post">
	<input type="hidden" name="logout" value="1">
	<input type="submit" value="wyloguj">
</form>

</body>
</html>
<?php
}
?>