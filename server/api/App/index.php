<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
require_once "./vendor/autoload.php";
use App\DbCommands;
$obj=new DbCommands;
$obj->insertInto();
$obj->selectAll();
$obj->delete();








?>
