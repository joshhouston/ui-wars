INSERT INTO angular (challenge_id, developer_id, angular_increment)
VALUES ($1, $2, $3) 
RETURNING *;