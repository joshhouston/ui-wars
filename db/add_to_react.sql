-- UPDATE react
-- SET developer_id = $2
-- WHERE challenge_id = $1
-- returning *;

INSERT INTO react (challenge_id, developer_id)
VALUES ($1, $2) 
RETURNING *;