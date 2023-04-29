const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const database = require('@replit/database');
const port = 3000;

const app = express();
const db = new database();

app.use(express.json());
app.use(bodyParser.urlencoded( { extended: true } ));

let signedToken = false;

var get = path => { app.get(path, (req, res) => { res.sendFile(__dirname + path) }) }; 

app.listen(port, () => {
    console.log(`App Listening On ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

get('/style.css');
get('/script.js');

app.get('/music', (req, res) => {
    
    res.sendFile(__dirname + '/music.html'); 
    get('/public/images/repeat-it.png');
    get('/public/images/pop-out.png');
    get('/public/images/blinding-lights.png');
    get('/public/images/shape-of-you.png');
    get('/public/images/dance-monkey.jpeg');
    get('/public/images/someone-you-loved.png');
    get('/public/images/rockstar.jpeg');
    
    get('/public/music/repeat-it.mp3');
    get('/public/music/pop-out.mp3');
    get('/public/music/blinding-lights.mp3');
    get('/public/music/shape-of-you.mp3');
    get('/public/music/dance-monkey.mp3');
    get('/public/music/someone-you-loved.mp3');
    get('/public/music/rockstar.mp3');
    
});

get('/music.css');
get('/music.js');

app.get('/join', (req, res) => {
    res.sendFile(__dirname + '/join.html');
});

get('/join.css');
get('/join.js');

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})

get('/login.css');
get('/login.js');

app.post('/join', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const unhashed = req.body.password;

    console.log(`Username: ${username}, Email: ${email}`);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(unhashed, salt, function(err, hash) {
            const user = {
                name: username,
                email: email,
                password: hash
            };
            db.set(`${user.name}`, user).then(() => {
                console.log('user created!');
            });
        });
    });

    res.redirect('https://spatial.veenitxs.repl.co/music');
    
});

app.post('/login', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // const compare = db.get("password").then(() => {
    //     console.log('Password fetched!');
    // });

    db.get(`${username}`).then(value => {

        if (value.name === username && value.email === email) {
            
            bcrypt.compare(password, value.password, function(err, result) {
                if (result) {
                    res.redirect('https://spatial.veenitxs.repl.co/music');
                } else {
                    res.redirect('https://spatial.veenitxs.repl.co/login');
                };
            });
            
        } else {

            res.redirect('https://spatial.veenitxs.repl.co/login')
            
        }
        
    });
    
});
