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

    addToCompleted: async (req, res) => {
        const {challenge_id, developer_id, imageURL, links, description, tool} = req.body.newValues
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.add_to_completed([challenge_id, developer_id, imageURL, links, description, tool])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }  
    },

    getChallenge: (req, res) => {
        const db = req.app.get('db')
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
    getCompleted: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_completed(id)
        .then(completed => res.status(200).send(completed))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something went wrong.'})
            console.log(errorMessage)
        })
        
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
        
    },

    getReactData: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_react_data(id)
        .then(react => res.status(200).send(react))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something went wrong.'})
            console.log(errorMessage)
        })
        
    },

    addToReact: async(req, res) => {
        const {challenge_id, developer_id, reactMax} = req.body.react
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.add_to_react([challenge_id, developer_id, reactMax])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    },

    reactOne: async(req, res) => {
        const {challenge_id, reactMax} = req.body.update
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.update_react([challenge_id, reactMax])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    },
    
    angularOne: async(req, res) => {
        const {challenge_id, reactMax} = req.body.update
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.update_angular([challenge_id, reactMax])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    },

    vueOne: async(req, res) => {
        const {challenge_id, reactMax} = req.body.update
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.update_vue([challenge_id, reactMax])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    },

    getAngularData: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_angular_data(id)
        .then(angular => res.status(200).send(angular))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something went wrong.'})
            console.log(errorMessage)
        })
        
    },

    addToAngular: async(req, res) => {
        const {challenge_id, developer_id, reactMax} = req.body.angular
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.add_to_angular([challenge_id, developer_id, reactMax])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    },

    getVueData: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_vue_data(id)
        .then(vue => res.status(200).send(vue))
        .catch(err => {
            res.status(500).send({errorMessage: 'Something went wrong.'})
            console.log(errorMessage)
        })
    },
    
    addToVue: async(req, res) => {
        const {challenge_id, developer_id, reactMax} = req.body.vue
        const db = req.app.get('db')
        if(req.session.user) {
            const user = await db.add_to_vue([challenge_id, developer_id, reactMax])
            return res.status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    }

    
}