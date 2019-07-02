INSERT INTO angular (challenge_id, developer_id)
VALUES ($1, $2) 
RETURNING *;