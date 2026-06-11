<?php

if(session_status()===PHP_SESSION_NONE){

//session_start();

} 

date_default_timezone_set('Africa/Lagos');

$time=date("h:i:sa", time());

# FileName="Connection_php_mysql.htm"

# Type="MYSQL"

# HTTP="true"

$hostname_config = "localhost";

$database_config = "ratesour_rateldb";

$username_config = "ratesour_root";

$password_config = "eFO4oD2G;y(}me&p";

$config =mysqli_connect($hostname_config, $username_config, $password_config);



if (!mysqli_select_db($config, $database_config)){



   echo 'Error connnecting to the database ';

}

//mysqli_close($config);