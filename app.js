//importation des modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');

//Importation des modèles Mongoose
const userModel = require('./models/userModel');

//Importation de la route
const userRoutes = require('./routes/user-routes');

//Initialisation de l'application
const app = express();

//Middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Initialisation de la session
app.use(session({secret: 'mon code secret que je ne dois pas divulguer'}))

//connexion au serveur mongodb
mongoose.connect('mongodb://localhost/mongo-test');

//Initialisation du moteur de template
app.set('views', './views');
app.set('view engine', 'pug');


//Routes d'authentification

//Affichage du formulaire
app.get('/login', (req, res)=>{
    //Récupération du message enregistré en session
    let err = req.session.errorMessage || null;
    //destruction du message enregistré en session
    delete req.session.errorMessage;
    res.render('login', {error: err});
});

//Traitement du formulaire de login
app.post('/login', (req, res) =>{
    //Définition des critères de la requête
    let search = {
        email: req.body.email,
        password: req.body.pwd
    };

    console.log(search);
    //Exécution de la requête
    userModel.findOne(search, (err, data) =>{
        if(err){
            console.log(err);
            res.end('Erreur d\'authentification');
        } else {
            if(data){
                //Redirection si l'utilisateur est bien authentifié
                //Enregistrement des données de l'utilisateur dans la session
                req.session.user = data;

                if(data.role == 'guest'){
                    res.redirect('/guest');
                } else {
                    res.redirect('/user');
                }
                
            } else {
                //redirection si échec de l'authentification
                //Enregistrement d'un message en variable de session
                req.session.errorMessage = "Tu t'es trumpé Donald";
                res.redirect('/login');
            }
        }
    });
});

//Route pour la page des invités
app.get('/guest', (req, res) => {
    res.render('guest');
});

//Utilisation des routes
app.use('/user', userRoutes);


//Lancement du serveur
app.listen(3000, ()=>{
    console.log('Le serveur écoute le port 3000')
});