const express = require('express');

const router = express.Router();

//Affichage de la liste des utilisateurs
router.get('/', (req, res)=>{
    res.render('user/home');
});

//Affichage du formulaire de création
router.get('/form', (req, res)=>{
    res.render('user/form');
});

//Affichage du formulaire de modification
router.get('/form/:id', (req, res)=>{
    res.render('user/form');
});

//Traitement du formulaire
router.post('/form*', (req, res)=>{
    res.redirect('/home');
});

module.exports = router;