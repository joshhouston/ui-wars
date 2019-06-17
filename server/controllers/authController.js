const bcrypt = require('bcryptjs');

module.exports = {
    registerDeveloper: (req, res) => {
        const {username, password, email} = req.body;
        const db = req.app.get('db');


        // Check if username already exists in my db
        db.findUser(username).then(usersList => {
            if(usersList.length > 0) {
                res.status(403).json({error: 'USERNAME_TAKEN'})
            }else {
                bcrypt.hash(password, 10).then(newPassword => {
                    // Create a new user and put them in db
                    db.registerDeveloper(username, newPassword, email).then(() => {
                        res.status(200).json(username)
                    })
                })
            }
        })
    }
}