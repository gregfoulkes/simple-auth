var express = require('express')
var app = express();
var exphbs = require('express-handlebars');
let session = require('express-session');
//setup middleware
var bodyParser = require('body-parser');

let loginRoutes = require('./routes/login_routes')
let LoginRoutes = loginRoutes()

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

app.get("/login", LoginRoutes.login)

app.get('/', LoginRoutes.home)

app.get('/logout', LoginRoutes.logout);


//start the server
let PORT = process.env.PORT || 7006;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});