<?php
$conn = new mysqli("localhost", "root", "", "restaurant_db");
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>