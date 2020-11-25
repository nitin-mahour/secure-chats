<?php
header("Access-Control-Allow-Origin: *");

if(empty($_POST)){
    print json_encode("POST_BODY_MISSING");
    exit;
}

if(!empty($_POST['usr']) && !empty($_POST['pwd'])) {
    $usr = $_POST['usr'];
    $pwd = $_POST['pwd'];

    checkCreds($usr, $pwd);
} else {
    print json_encode("CREDENTIALS_MISSING");
}


function checkCreds($usr, $pwd) {

    require_once('../db.php');

    $usr = str_replace("'", "\'", $usr);
    $pwd = str_replace("'", "\'", $pwd);
    
    $db = new Database();
    $db = $db->getConnection();

    $sql = "SELECT * FROM `users` WHERE `username` = '$usr' AND `password` = '$pwd'";
    $res = $db->query($sql);
    
    if($res->fetch_object()){
        print json_encode("SIGNIN_SUCCESS");
    } else {
        print json_encode("WRONG_CREDENTIALS");
    }
}

?>