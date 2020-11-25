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

    // check if same user id exists
    $sql = "SELECT id FROM `users` WHERE username = '$usr'";
    $res = $db->query($sql);

    if($res->fetch_object()) {
        print json_encode("USERID_NOT_AVAILABLE");
        exit;
    }

    $sql = "INSERT INTO `users` (username, password) VALUES ('$usr', '$pwd')";
    $res = $db->query($sql);

    if($res){
        print json_encode("SIGNUP_SUCCESS");
    } else {
        print json_encode("SIGNUP_ERROR");
        // print json_encode($res);
    }
}

?>