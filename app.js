//importation des modules
const express = require('express');
const mongoose = require('mongoose');

//Importation des modèles Mongoose
const userModel = require('./models/userModel');

//Importation de la route
const userRoutes = require('./routes/user-routes');

//Initialisation de l'application
const app = express();

//connexion au serveur mongodb
mongoose.connect('mongodb://localhost/mongo-test');

//Initialisation du moteur de template
app.set('views', './views');
app.set('view engine', 'pug');

//Utilisation de la route
app.use('/user', userRoutes);

//Contrôleurs de l'application
app.get('/', (req, res)=>{
    //Création d'un utilisateur en fonction du modèle
    let user = new userModel({
        email: 'toto@mail.com',
        password: '123',
        createdAt: new Date()
    });
    // Enregistrement de l'utilisateur dans la BD
    user.save();

    //Liste des utilisateurs
    userModel.find({}, (err, result) =>{
        if(err){
            console.log(err);
            res.end('Erreur Mongoose');
        } else {
            res.json(result);
        }
    });

    
});

app.listen(3000, ()=>{
    console.log('Le serveur écoute le port 3000')
});