INSERT INTO developers (username, password, email, full_name)
VALUES ($1, $2, $3, $4) RETURNING username;