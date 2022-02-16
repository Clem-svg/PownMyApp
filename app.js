const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const tokens = require('./tokenData').tokenDB;
const app = express();
const server = http.createServer(app);
const randtoken = require('rand-token');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get ('/createcsrf', function (req, res) {
    try {
        let accessToken = randtoken.generate(16)
        tokens.push(accessToken)
        console.log(tokens)
        res.send(accessToken)
    }
    catch {
        res.send("Internal server error");
    }
})

app.get ('/validatecsrf', function (req, res) {
    try {
        res.send(tokens[tokens.length - 1])   
    }
    catch {
        res.send("Internal server error");
    }
})

app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.username === data.username);
        if (!foundUser) {
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                password: req.body.password,
            };
            users.push(newUser);
            console.log('User list', users);
            console.log(tokens)

            res.redirect("login.html");
        } else {
            res.send("<div align ='center'><h2>Nom d'utilisateur déjà utilisé</h2></div><br><br><div align='center'><a href='./registration.html'>Retour création compte</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});


app.post('/login', async (req, res) => {
    try{

        let foundUser = users.find((data) => req.body.username === data.username);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
            function htmlEncode(str){
                return String(str).replace(/[^\w. ]/gi, function(c){
                    return '&#'+c.charCodeAt(0)+';';
                });
            }
                if (submittedPass == storedPass) {
                let usrname = foundUser.username;
                res.send(`<div align ='center'><h3>Hello ${usrname}</h3></div>`);
            } else {
                res.send("<div align ='center'><h2>Erreur de mail ou mdp</h2></div><br><br><div align ='center'><a href='./login.html'>Retour login</a></div>");
            }
        }
        else {
    
            res.send("<div align ='center'><h2>Email ou mot de passe invalide</h2></div><br><br><div align='center'><a href='./login.html'>Retour login<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});


server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});