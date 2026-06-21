<?php
ob_start();
error_reporting(0);

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

// Detect environment and build the correct base URL including the folder
if ($_SERVER['HTTP_HOST'] === 'localhost' || $_SERVER['HTTP_HOST'] === '127.0.0.1') {
    $base_url = "http://localhost/restuarant-backend/";
} else {
    $protocol = (!empty($_SERVER['HTTPS'])) ? "https://" : "http://";
    $base_url = $protocol . $_SERVER['HTTP_HOST'] . "/";
}

while ($row = $result->fetch_assoc()) {
    if (!empty($row['image_url'])) {
        // Strip any old/incorrect host that might already be saved, keep only the path
        $path = preg_replace('#^https?://[^/]+/#', '', $row['image_url']);
        $row['image_url'] = $base_url . $path;
    }
    $data[] = $row;
}

ob_end_clean();
echo json_encode($data);
exit();
?>