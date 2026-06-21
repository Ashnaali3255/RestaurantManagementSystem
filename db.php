<?php
// AwardSpace database connection details
$db_host = "fdb29.awardspace.net";
$db_user = "4769668_restdb";
$db_pass = 'kPYj{(oq1NNm?NXK';   // single quotes used because password has special characters
$db_name = "4769668_restdb";
$db_port = 3306;

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>