<?php
// CORS headers MUST be the very first thing, before any other output
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$result = $conn->query("SELECT * FROM menu");
$data = [];

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