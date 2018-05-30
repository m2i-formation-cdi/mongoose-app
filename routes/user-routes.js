const express = require('express');
const userModel = require('./../models/userModel');

const router = express.Router();

//Affichage de la liste des utilisateurs
router.get('/', (req, res)=>{
    //Récupération des utilisateurs
    userModel.find({}, (err, data)=>{
        if(err){
            console.log(err);
            res.end('erreur Mongoose');
        } else {
            res.render('user/home', {userList: data});
        }
    });
    
});

//Affichage du formulaire de création
router.get('/form', (req, res)=>{
    res.render('user/form', 
        {user:{email:null,password:null,_id:null, userName: null, role:null}}
    );
});

//Affichage du formulaire de modification
router.get('/form/:id', (req, res)=>{
    userModel.findById(req.params.id, (err, data)=>{
        if(err){
            console.log(err);
            res.end('erreur mongoose');
        } else{
            res.render('user/form', {user: data});
        }
    });
});

//Traitement du formulaire
router.post('/form*', (req, res)=>{
    let user = {
        email: req.body.email,
        password: req.body.pwd,
        userName: req.body.userName,
        role: req.body.role
    };
    if(req.body.id){
        //modification d'un utilisateur existant
        userModel.updateOne({_id: req.body.id}, user, (err)=>{
            if(err){
                res.end('erreur');
                console.log(err);
            } else {
                res.redirect('/user');
            }
        });
    } else {
        //Création d'un nouvel utilisateur
        let model = new userModel(user);
        model.save((err)=>{
            if(err){
                res.end('erreur');
                console.log(err);
            } else {
                res.redirect('/user');
            }
        });
    }
    
});

//Suppression d'un utilisateur
router.get('/delete/:id', (req, res)=>{
    userModel.remove({_id:req.params.id}, (err)=>{
        if(err){
            console.log(err);
            res.end('erreur');
        } else {
            res.redirect('/user');
        }
    });
})

module.exports = router;