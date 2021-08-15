require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();
const Forecast = require('./models/forecast');
const Resultat = require('./models/result');
const User = require('./models/user');
const queens = require('./data/queens');
const scores = require('./score');


app.set('view engine', 'ejs');

app.use(express.static('public'));
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

mongoose.connect(process.env['DB_URL'], { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.route('/')
.get(function(req, res) {
    if (req.isAuthenticated()) {
        res.render('home', { queens: queens, loggedIn: true, bonusScore: scores.BONUS_SCORE });
    } else {
        res.render('welcome', { loggedIn: false });
    }
})
.post(function(req, res) {
    if (req.isAuthenticated()) {
        const forecast = new Forecast(req.body);
        forecast.username = req.user.username;
        forecast.date = new Date();        
        forecast.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.render('thanks', { loggedIn: true });
            }
        });
    } else {
        res.redirect('/');
    }
});

app.route('/login')
.get(function(req, res) {
    // For now we render home for everyone, but for next time we will enable authentication
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login', { loggedIn: false });
    }
})
.post(passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }));

app.route('/logout')
.get(function(req, res){
    req.logout();
    res.redirect('/');
});

app.route('/register')
.get(function(req, res) {
    // For now we render home for everyone, but for next time we will enable authentication
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('register', { loggedIn: false });
    }
})
.post(function(req, res) {
    // create new user and save in the DB
    User.register({ username: req.body.username }, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/');
            });
        }
    });
});

app.route('/results')
.get(function(req, res) {
    // Query result
    if (req.isAuthenticated()) {
        Resultat.findOne({}, function(resultError, result){
            if (resultError) {
                console.log(resultError);
            } else if (result) {
                // Query all forecasts
                Forecast.find({}, function(forecastError, forecasts) {
                    if (forecastError) {
                        console.log(forecastError);
                    } else {
                        const allScores = scores.computeScores(result, forecasts);                    
                        res.render('results', { scores : allScores, loggedIn: true });
                    }
                })
            } else {
                console.log('No results found in the DB');
            }
        });
    } else {
        res.redirect('/');
    }
});

const port = process.env.PORT || 3000;    
app.listen(port, function() {
    console.log('Server started on port ' + port);
});