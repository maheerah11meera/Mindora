<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$coins = intval($data['coins']);

if (!$name) {
  echo json_encode(["success" => false, "message" => "No name"]);
  exit;
}

// Check if player exists
$stmt = $conn->prepare("SELECT * FROM leaderboard WHERE name = ?");
$stmt->bind_param("s", $name);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $player = $result->fetch_assoc();
  if ($coins > $player['coins']) {
    $update = $conn->prepare("UPDATE leaderboard SET coins = ? WHERE name = ?");
    $update->bind_param("is", $coins, $name);
    $update->execute();
  }
} else {
  $insert = $conn->prepare("INSERT INTO leaderboard (name, coins) VALUES (?, ?)");
  $insert->bind_param("si", $name, $coins);
  $insert->execute();
}

// Return rank
$rank_result = $conn->query("SELECT name, coins FROM leaderboard ORDER BY coins DESC");
$rank = 1;
while ($row = $rank_result->fetch_assoc()) {
  if ($row['name'] === $name) {
    break;
  }
  $rank++;
}

echo json_encode(["success" => true, "rank" => $rank]);
?>
