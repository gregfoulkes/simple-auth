var express = require('express')
var app = express();
var exphbs = require('express-handlebars');
let session = require('express-session');
//setup middleware
var bodyParser = require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));
//set up http session middleware

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'put your secret phrase here please',
    cookie: { maxAge: 60000 }
}));

// const Connection = require('./config/dbConnection.js')

app.use(function (req, res, next) {

    next();
});

//init the session in one route

app.get("/login", function(req, res){
    let userName = req.query.username
    // req.session will be defined now
    console.log(userName)
    if (userName && !req.session.username){
        //set a session value from a form variable
        req.session.username = userName;
    }
    res.redirect('/');
});

app.get('/', function(req, res){
    let greeting = "Hello";
    if (req.session.username) {
        greeting += (", " + req.session.username);
    }
    res.send(greeting);
});

app.get('/logout', function(req, res){
    delete req.session.username;
    res.redirect('/');
});


//start the server
let PORT = process.env.PORT || 7006;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});