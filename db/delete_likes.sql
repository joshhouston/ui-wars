DELETE FROM liked 
WHERE developer_id = $1
AND challenge_id = $2