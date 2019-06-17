INSERT INTO developers (username, password, email)
VALUES ($1, $2, $3) RETURNING username;