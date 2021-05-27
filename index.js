const express = require('express');

const app = express();
const queens = [
    'Akeria Davenport', 
    'Eureka O\'Hara',
    'Ginger Minj',
    'Jan',
    'Jiggly Caliente',
    'Pandora Boxx',
    'Rajah O\'Hara',
    'Scarlet Envy',
    'Serena Chacha',
    'Silky Ganache',
    'Sonique',
    'Trinity K Bonet',
    'Yara Sofia'
];

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({
    extended : true
}));

app.route('/')
    .get(function(req, res) {
        res.render('home', { queens : queens });
    })
    .post(function(req, res) {
        console.log(req.body);
        res.render('thanks');
    });

app.listen(3000, function() {
    console.log('Server started on port 3000');
})