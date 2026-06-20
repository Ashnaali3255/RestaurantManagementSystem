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
$phone = isset($data["phone"]) ? $data["phone"] : "";
$address = isset($data["address"]) ? $data["address"] : "";
$payment_method = isset($data["payment_method"]) ? $data["payment_method"] : "COD";
$total = $data["total"];
$items = $data["items"];

// 1️⃣ Insert into orders (now with phone + address + payment_method)
$stmt = $conn->prepare(
    "INSERT INTO orders (customer_name, phone, address, payment_method, total, status)
     VALUES (?, ?, ?, ?, ?, 'Pending')"
);
$stmt->bind_param("ssssd", $customer_name, $phone, $address, $payment_method, $total);

if ($stmt->execute()) {
    $order_id = $stmt->insert_id;

    // 2️⃣ Insert into order_items
    if (!empty($items)) {
        $stmt2 = $conn->prepare(
            "INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)"
        );
        foreach ($items as $item) {
            $menu_id = $item["id"];
            $quantity = $item["qty"];
            $stmt2->bind_param("iii", $order_id, $menu_id, $quantity);
            if (!$stmt2->execute()) {
                echo json_encode(["error" => $stmt2->error]);
                exit;
            }
        }
        $stmt2->close();
    }

    echo json_encode([
        "success" => true,
        "order_id" => $order_id
    ]);
} else {
    echo json_encode(["error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>