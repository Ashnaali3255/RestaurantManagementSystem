<?php
ob_start();
error_reporting(0);

// CORS - using multiple methods to maximize compatibility
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

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

ob_end_clean();
echo json_encode($data);
exit();
?>