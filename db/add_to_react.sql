-- UPDATE react
-- SET developer_id = $2
-- WHERE challenge_id = $1
-- returning *;

INSERT INTO react (challenge_id, developer_id, react_increment)
VALUES ($1, $2, $3)
RETURNING *;