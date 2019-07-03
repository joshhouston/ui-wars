-- SELECT 
-- developer.username
-- FROM developers
-- INNER JOIN completed on developer.developer_id = completed.developer_id
-- WHERE completed.challenge_id = $1;

SELECT * FROM completed
WHERE developer_id = $1;