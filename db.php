<?php
// InfinityFree database connection details
$db_host = "sql106.infinityfree.com";
$db_user = "if0_42228787";
$db_pass = "VIPkG2SyanFD";   // <-- yahan apna MySQL password daalein
$db_name = "if0_42228787_restaurant_db";
$db_port = 3306;

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>