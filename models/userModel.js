//Import du module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création du schema
const userSchema = new Schema({
    email: String,
    password: String,
    createdAt: Date
});

//Création d'un modèle à partir du schéma
const userModel = mongoose.model('UserCollection', userSchema);

module.exports =  userModel;