<?php

header("Access-Control-Allow-Origin: *");

require_once('../db.php');

$db = new Database();
$db = $db->getConnection();

$id = isset($_GET['room']) ? $_GET['room'] : null;
$key = isset($_GET['key']) ? $_GET['key'] : null;
$sql = "";

if (!empty($id) && !empty($key)) {

    if ($key == -1) {
        $sql = "SELECT * FROM (SELECT * FROM `chats` WHERE `room_id` = '$id' ORDER BY `msg_id` DESC LIMIT 20) `sub` ORDER BY `msg_id` ASC";
    }
    else {
        $sql = "SELECT * FROM `chats` WHERE `room_id` = '$id' AND `msg_id` > '$key' LIMIT 20";
    }
    
    $msgs = $db->query($sql);
    $res = array();

    while ($msg = $msgs->fetch_object()) {
        $res[] = $msg;
    }

    if ($res == []) {
        print json_encode(array(['msg_id'=>$key]));
    }
    else {
        print json_encode($res);
    }
}

?>