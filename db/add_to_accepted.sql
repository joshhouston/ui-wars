INSERT INTO accepted(challenge_id, developer_id)
VALUES($1, $2)
returning *;