INSERT INTO completed(challenge_id, developer_id, imageURL, links, description, tool)
VALUES($1, $2, $3, $4, $5, $6)
returning *;