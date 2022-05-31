<?php
namespace App;
require_once "./vendor/autoload.php";
use PDO;
use App\DbConnect;
class DbCommands extends DbConnect{
 private $sku;
 private $name;
 private $price;
 private $size;
 private $height;
 private $width;
 private $lenght;
 private $weight;
 private $method;
 private $stmt;
 private $query;

     public function insertInto(){
        $method=$_SERVER['REQUEST_METHOD'] ;
            if($method==='POST'){
                $data=json_decode(file_get_contents('php://input'));
                      while(!$data->sku || !$data->name || !$data->price || $data->value==="DVD" && !$data->size || $data->value==="Book" && !$data->weight ){
                       return true;
                    } 
                    if($data->value==="Furniture"){
                        while(!$data->height || !$data->width || !$data->lenght){
                            return true;
                        } 
                    }
                    if($data->sku || $data->name || $data->price){
                        while(!$data->height ^ !$data->width ^ !$data->lenght ^ !$data->weight ^ !$data->size){
                                  return true;
                        }
                        while($data->height ^ $data->width ^ $data->lenght ^ $data->weight ^ $data->size){
                            return true;
                        }
                    }
                  
  
                            $stmt=$this->conn()->prepare("INSERT INTO `information`(`id`,`sku`,`name`,`price`,`size`,`height`,`width`,`lenght`,`weight`) 
                            VALUES(null,:sku,:name,:price,:size,:height,:width,:lenght,:weight) ORDER BY `id`");
                            $stmt->execute(array(
                                ':sku'=>$data->sku,
                                ':name'=>$data->name,
                                ':price'=>$data->price,
                                ':size'=>$data->size,
                                ':height'=>$data->height,
                                ':width'=>$data->width,
                                ':lenght'=>$data->lenght,
                                ':weight'=>$data->weight,
                            ));
                        
                      
     }
    }

    public function selectAll(){
        $method=$_SERVER['REQUEST_METHOD'] ;
        if($method==='GET'){
        $sql="SELECT * FROM `information` ";
        $path=explode('/',$_SERVER['REQUEST_URI']);
        if(isset($path[6])&& is_numeric($path[6])){
            $sql.="WHERE id= :id";
            $stmt=$this->conn()->preapare($sql);
            $stmt->execute(array(
                ':id'=>$path[6]
            ));
            $info=$stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt=$this->conn()->prepare($sql);
            $stmt->execute();
            $info=$stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($info);
    }
    }
    public function delete(){
        $method=$_SERVER['REQUEST_METHOD'] ;
        if($method==="DELETE"){
            $sql = "DELETE FROM information WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
    
            $stmt = $this->conn()->prepare($sql);
            $stmt->execute(array(
               ":id"=>$path[6],
            ));
        }
    }   
    }
?>