<?php
include 'db.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$result = $conn->query("SELECT * FROM menu");
$data = [];
$base_url = "http://localhost/restuarant-backend/";

while ($row = $result->fetch_assoc()) {
    if (!empty($row['image_url'])) {
        $row['image_url'] = $base_url . $row['image_url'];
    }
    $data[] = $row;
}

echo json_encode($data);
?>