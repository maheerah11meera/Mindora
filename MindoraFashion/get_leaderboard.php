<?php
require_once "db.php";

$result = $conn->query("SELECT name, coins FROM leaderboard ORDER BY coins DESC LIMIT 10");

$leaderboard = [];

while ($row = $result->fetch_assoc()) {
  $leaderboard[] = $row;
}

echo json_encode($leaderboard);
?>
