SELECT * FROM challenges 
JOIN liked ON challenges.challenge_id = liked.challenge_id 
WHERE liked.developer_id = $1;