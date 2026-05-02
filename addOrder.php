<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "restaurant_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "DB connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit;
}

$customer_name = $data["customer_name"];
$total = $data["total"];
$items = $data["items"];

// 1️⃣ Insert into orders
$sql = "INSERT INTO orders (customer_name, total, status) 
        VALUES ('$customer_name', '$total', 'Pending')";

if ($conn->query($sql) === TRUE) {

    $order_id = $conn->insert_id;

    // 2️⃣ Insert into order_items (FIXED)
    if (!empty($items)) {
        foreach ($items as $item) {

            $menu_id = $item["id"];     // ✅ IMPORTANT FIX
            $quantity = $item["qty"];   // ✅ IMPORTANT FIX

            $sql2 = "INSERT INTO order_items (order_id, menu_id, quantity)
                     VALUES ('$order_id', '$menu_id', '$quantity')";

            if (!$conn->query($sql2)) {
                echo json_encode(["error" => $conn->error]);
                exit;
            }
        }
    }

    echo json_encode([
        "success" => true,
        "order_id" => $order_id
    ]);

} else {
    echo json_encode(["error" => $conn->error]);
}

?>