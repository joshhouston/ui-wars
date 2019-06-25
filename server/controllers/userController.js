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
        const {id, imageURL, description, links} = req.body.newValues
        const db = req.app.get('db')
        if(req.session.user){
            const user = await db.add_challenge([id, imageURL, description, links])
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
        console.log(req.session.user)
        db.delete_likes(id)
            .then(() => {
                res.status(200)
            })
            .catch(err => {
                res.status(500).send({errorMessage: 'not logged in'})
                console.log(err)
            })
    }

    
    
}