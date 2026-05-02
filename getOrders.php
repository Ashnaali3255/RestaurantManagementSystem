<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$result = $conn->query("SELECT * FROM orders ORDER BY id DESC");

$data = [];

while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>