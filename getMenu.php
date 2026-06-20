<?php
include 'db.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$result = $conn->query("SELECT * FROM menu");
$data = [];

// Automatically builds the correct URL whether running on localhost or live server
$protocol = (!empty($_SERVER['HTTPS'])) ? "https://" : "http://";
$base_url = $protocol . $_SERVER['HTTP_HOST'] . "/";

while ($row = $result->fetch_assoc()) {
    if (!empty($row['image_url'])) {
        $row['image_url'] = $base_url . $row['image_url'];
    }
    $data[] = $row;
}

echo json_encode($data);
?>