UPDATE developers
SET full_name = $2,
    email = $3,
    socials = $4,
    profile_picture = $5
WHERE developer_id = $1
returning *;
