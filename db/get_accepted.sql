SELECT 
challenges.challenge_id,
challenges.imageurl,
challenges.description
FROM challenges
INNER JOIN accepted ON challenges.challenge_id = accepted.challenge_id
WHERE accepted.developer_id = $1;