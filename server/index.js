require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const {registerDeveloper, loginUsers, logOut, getUser} = require('./controllers/authController');
const uc = require('./controllers/userController');

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;


const app = express();

app.use(express.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);


// Auth Endpoints
app.post('/auth/registerDeveloper', registerDeveloper);
app.post('/auth/login', loginUsers);
app.post('/auth/logout', logOut);
app.get('/auth/user', getUser);

//Challenge Endpoints
app.get('/api/challenges', uc.getChallenge);
app.get('/api/user/challenge', uc.get_User);
app.put('/api/user', uc.addChallenge);

//Liked Endpoints
app.put('/api/liked', uc.addToLikes);
app.get('/api/user/likes', uc.getLikes);
app.delete('/api/likes/:id', uc.deleteLikes);

//Accepted Endpoint
app.get('/api/user/accepted', uc.getAccepted);
app.put('/api/accepted', uc.addToAccepted);
app.delete('/api/accepted/:id', uc.deleteAccepted);
app.put('/api/completed', uc.addToCompleted);

//Send to language table
app.put('/api/react', uc.addToReact);
app.put('/api/angular', uc.addToAngular);
app.put('/api/vue', uc.addToVue);

//Dashboard Endpoints
app.get('/api/dashboard', uc.get_User);

//Edit Endpoints
app.put('/api/edit', uc.editProfile);





//
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})