require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();
const User = require('./models/user');
const cors = require('cors');

const forecast = require('./routes/forecast');
const results = require('./routes/results');
const queens = require('./routes/queens');

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use(session({
    secret: process.env['SECRET'],
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

mongoose.connect(process.env['DB_URL'], { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/queens', queens);
app.use('/forecast', forecast);
app.use('/results', results);


const port = process.env.PORT || 3002;    
app.listen(port, function() {
    console.log('Server started on port ' + port);
});