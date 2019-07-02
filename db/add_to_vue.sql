INSERT INTO vue (challenge_id, developer_id)
VALUES ($1, $2) 
RETURNING *;