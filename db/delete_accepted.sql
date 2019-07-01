DELETE FROM accepted
WHERE developer_id = $1
AND challenge_id = $2