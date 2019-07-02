INSERT INTO completed(challenge_id, developer_id, imageURL, links, description)
VALUES($1, $2, $3, $4, $5)
returning *;