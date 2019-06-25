-- SELECT * FROM challenges 
-- JOIN liked ON challenges.challenge_id = liked.challenge_id 
-- WHERE liked.developer_id = $1;

SELECT 
    challenges.challenge_id,
    challenges.imageurl,
    challenges.description
FROM challenges
INNER JOIN liked ON challenges.challenge_id = liked.challenge_id
WHERE liked.developer_id = $1

