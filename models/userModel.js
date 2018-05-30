//Import du module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');


//Création du schema
const userSchema = new Schema({
    email: { type: String, unique: true },
    password: {
        type: String, required: true,
        set: val => {
            let sha1 = crypto.createHash('sha1');
            sha1.update(val);
            return sha1.digest('hex');
        }
    },
    createdAt: { type: Date, default: Date.now },
    userName: {type:String, uppercase:true, trim: true},
    role: {type:String, enum: ['user', 'admin', 'guest']}
});

//Création d'un modèle à partir du schéma
const userModel = mongoose.model('UserCollection', userSchema);

module.exports = userModel;