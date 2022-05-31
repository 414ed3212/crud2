<?php
namespace App;
use PDO;
Class DbConnect {
private $servername = "localhost";
private $username = "root";
private $password = "Kote_2005@2005";
private $dbname = "crud";
public function conn(){
try {
  $conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $conn;
} catch(PDOException $e) {
  echo "Error: " . $e->getMessage();

}
}
}
?>

