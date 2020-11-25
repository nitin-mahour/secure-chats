<?php

header("Access-Control-Allow-Origin: *");

require_once('../db.php');

$db = new Database();
$db = $db->getConnection();


$room = isset($_POST['room']) ? $_POST['room'] : null;
$user = isset($_POST['user']) ? $_POST['user'] : null;
$mssg = isset($_POST['mssg']) ? $_POST['mssg'] : null;

if (!empty($room) && !empty($user) && !empty($mssg)) {
    $sql = "INSERT INTO `chats` (`room_id`, `sender`, `message`) VALUES ('$room', '$user', '$mssg')";
    $rsp = $db->query($sql);

    if ($rsp) {
        print json_encode("INSERT_SUCCESS");
    }
    else {
        print json_encode("INSERT_FAILED");
    }

}


?>