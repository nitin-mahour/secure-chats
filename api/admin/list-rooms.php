<?php

header("Access-Control-Allow-Origin: *");

require_once('../db.php');

$db = new Database();
$db = $db->getConnection();

$key = isset($_GET['key']) ? $_GET['key'] : null;
$sql = "";

if (empty($key)) {

    print json_encode("KEY_MISSING");

} else {

    if ($key == "ncoder") {
        
        $sql = "SELECT DISTINCT `room_id` FROM `chats`";
        
        $msgs = $db->query($sql);
        $res = array();
        
        while ($msg = $msgs->fetch_object()) {
            $res[] = $msg;
        }
        
        if ($res == []) {
            print json_encode("EMPTY");
        }
        else {
            print json_encode($res);
        }

    } else {

        print json_encode("KEY_ERROR");
    }

}

?>