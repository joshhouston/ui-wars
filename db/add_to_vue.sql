INSERT INTO vue (challenge_id, developer_id, vue_increment)
VALUES ($1, $2, $3) 
RETURNING *;