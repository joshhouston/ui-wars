-- UPDATE liked 
-- SET challenge_id = C.challenge_id, developer_id = C.developer_id, imageurl = C.imageurl, description = C.description
-- FROM challenges C
-- WHERE liked.challenge_id = C.challenge_id
-- AND liked.developer_id = C.developer_id
-- AND liked.imageurl = C.imageurl
-- AND liked.description = C.description;


INSERT INTO liked (challenge_id, developer_id)
VALUES ($1, $2)
returning *;