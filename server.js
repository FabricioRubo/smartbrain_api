const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signIn = require('./controllers/signIn.js');
const profile = require('./controllers/profile.js');
const imagePut = require('./controllers/imagePut.js');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'databusy',
        database : 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('Success') });
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.post('/signin', (req, res) => {signIn.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.post('/imageURL', (req, res) => {imagePut.handleApiCall(req, res)})

app.put('/image', (req, res) => {imagePut.handleImagePut(req, res, db)});

app.listen(process.env.PORT || 3000, () => {console.log('app is running on port' + process.env.PORT)});