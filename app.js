//importation des modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Importation des modèles Mongoose
const userModel = require('./models/userModel');

//Importation de la route
const userRoutes = require('./routes/user-routes');

//Initialisation de l'application
const app = express();

//Middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//connexion au serveur mongodb
mongoose.connect('mongodb://localhost/mongo-test');

//Initialisation du moteur de template
app.set('views', './views');
app.set('view engine', 'pug');

//Utilisation des routes
app.use('/user', userRoutes);


//Lancement du serveur
app.listen(3000, ()=>{
    console.log('Le serveur écoute le port 3000')
});