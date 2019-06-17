require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const {registerDeveloper, loginUsers, logOut, getUser} = require('./controllers/authController');

const app = express();
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

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
)


// ENDPOINTS
app.post('/auth/registerDeveloper', registerDeveloper);
app.post('/auth/login', loginUsers);
app.post('/auth/logout', logOut);
app.get('/auth/user', getUser);




//
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})