module.exports = {
    updateUser: (req, res) => {
        const {imageURL} = req.body.newValues
        const db = req.app.get('db')
        if(req.session.user){
            const user = db.update_user([imageURL])
            return status(200).json(user)
        }else {
            return res.status(404).json('not logged in')
        }
    }
    
}