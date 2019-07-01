module.exports = {

    get_User: async (req, res) => {
        const db = req.app.get('db')
        if(req.session.user){
            const user = await db.findUser(req.session.user.username)
            return res.status(200).json(user)
        } else {
            return res.status(404).json('not logged in')
        }
    },

    addChallenge: async (req, res) => {
        const {id, imageURL, description, links, title} = req.body.newValues
        const db = req.app.get('db')
        if(req.session.user){
            const user = await db.add_challenge([id, imageURL, description, links, title])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
        
    },

    getChallenge: (req, res) => {
        const db = req.app.get('db')
        // if(req.session.user) {
        //     const user = db.findChallenge(req.session.user.challenge_id)
        //     console.log(user)
        //     return res.status(200).json(user)
        // }else {
        //     return res.status(404).json('not logged in')
        // }
        db.findChallenge()
            .then(challenge => res.status(200).send(challenge))
            .catch(err => {
                res.status(500).send({errMessage: 'something went wrong'})
                console.log(err)
            })

    },

    addToLikes: async (req, res) => {
        const {challenge_id} = req.body
        const db = req.app.get('db')
        if(req.session.user) {
            const liked = await db.add_to_likes([challenge_id, req.session.user.developer_id])
            if(liked[0]){
                return res.sendStatus(200)
            }
        }else {
            console.log('not logged in')
            return res.status(404).json('not logged in')
        }
    },

    addToAccepted: async (req, res) => {
        const {challenge_id} = req.body
        const db = req.app.get('db')
        if(req.session.user) {
            const accepted = await db.add_to_accepted([challenge_id, req.session.user.developer_id])
            if(accepted[0]){
                return res.sendStatus(200)
            }
            else {
                return res.status(404).json('not logged in')
            }
        }
    },

    getAccepted: async (req, res) => {
        const db = req.app.get('db')
        if(req.session.user) {
            const accepted = await db.get_accepted(req.session.user.developer_id)
            return res.status(200).json(accepted)
        }
        else {
            return res.status(404).json('not logged in')
        }
    },

    getLikes: async (req, res) => {
        const db = req.app.get('db')
        if(req.session.user) {
            const likes = await db.get_likes(req.session.user.developer_id)
            return res.status(200).json(likes)
        }
        else {
            return res.status(404).json('not logged in')
        }
    },

    deleteLikes: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        if(req.session.user){
            const user = await db.delete_likes([req.session.user.developer_id, id])
            return res.status(200).json(user)    
        } else {
            return res.status(404).json('not logged in')
        }
    },

    deleteAccepted: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        if(req.session.user) {
            const user = await db.delete_accepted([req.session.user.developer_id, id])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    },
    
    editProfile: async (req, res) => {
        const {id, fullname, email, github, profilePic} = req.body.newValues
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.update_user([id, fullname, email, github, profilePic])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
        
    }
    
}