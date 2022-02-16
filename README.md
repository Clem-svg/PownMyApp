# PownMyApp

Pour lancer l'application 

```
$ git clone git@github.com:Clem-svg/PownMyApp.git
$ git checkout -b vuln
$ git pull origin vuln
$ npm install
$ node server.js
```
Dans le navigateur, aller à : http://localhost:3000/

## Pour corriger les failles
### xss 
Echapper les caractères
Dans le fichier app.js, remplacer les lignes 77 par :

```js
    let usrname = htmlEncode((foundUser.username));
```

### csrf 
Verifier les tokens
Dans le fichier app.js, avant même de vérifier si le user existe dans la base et lui permettre de se connecter, nous pouvons vérifier que le token fourni dans le formulaire html "login.html" est bien celui qui a été généré pour l'utilisateur lorsqu'il a visité la page "registration.html" :

```js
    let submittedToken = req.body.token

    if (submittedToken == tokens[tokens.length - 1]){           
        if (submittedPass == storedPass) {
            let usrname = foundUser.username;
            res.send(`<div align ='center'><h3>Hello ${usrname}</h3></div>`);
        } else {
            res.send("<div align ='center'><h2>Connection non autorisée</h2></div><br><br><div align ='center'><a href='./login.html'>Retour login</a></div>");
        }
    }
```
