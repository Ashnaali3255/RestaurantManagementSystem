<?php
include 'db.php';
header("Access-Control-Allow-Origin: *");
$result = $conn->query("SELECT * FROM menu");

$data = [];

while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>