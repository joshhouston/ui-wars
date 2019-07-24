-- SELECT 
-- developer.username
-- FROM developers
-- INNER JOIN completed on developer.developer_id = completed.developer_id
-- WHERE completed.challenge_id = $1;

SELECT DISTINCT developers.username,
developers.profile_picture,
completed.imageurl,
completed.links 
FROM completed
INNER JOIN developers
ON developers.developer_id = completed.developer_id
WHERE completed.challenge_id = $1;