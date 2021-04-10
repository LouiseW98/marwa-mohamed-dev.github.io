if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Individu = require('./models/individu');
const Article = require('./models/article');
const Employee = require('./models/employee');
const Commande = require('./models/commande');
const CibleDeRoutage = require('./models/cibleDeRoutage');
const { render } = require('ejs');

//////////////////////////////////////////////
const multer = require('multer');
const path = require('path');
const uploadPath = path.join('public', Article.imageBasePath)
const imageMimeTypes = ['images/jpeg', 'images/jpg', 'images/png', 'images/gif']
const upload = multer({
    dest: uploadPath
    // fileFilter: (req, file, callback) => {
    //     callback(null, imageMimeTypes.includes(file.mimetype))
    // }
})

// //////////////////////////////////////////
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const initializePassport = require('./passport-config');
const { authorize } = require('passport');
initializePassport(
    passport,
    identifiant => users.find(user => user.identifiant === identifiant),
    id => users.find(user => user.id === id)
);

const users = [ {id: '1', identifiant: "winkler", mdp: "astrid"},
{id: '2', identifiant: "lee", mdp: "jiou"}, 
{id: '3', identifiant: "weber", mdp: "louise"}, 
{id: '4', identifiant: "gomes", mdp: "lucie"}, 
{id: '5', identifiant: "mohamed", mdp: "marwa"}
]
///////////////////////////////////////////////


// on créé une instance d'une application express
// permet de faciliter le routing
const app = express();

//connect to database mongodb
const dbURI = 'mongodb+srv://mimirdev:mimir1234@fenouil.t2pik.mongodb.net/fenouil_app?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
// configure quelques paramètres de l'application
app.set('view engine', 'ejs');

//midleware & static files
// rend disponible au front-end les fichiers contenus dans le folder public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Connexion à l'app
// avec utilisation package passeport
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// requête de type app.get
// routing

app.get('/', checkNotAuthenticated, (req, res) => {
    console.log("coucou");
    //res.render('Connexion', {title: 'Connexion' });
});
