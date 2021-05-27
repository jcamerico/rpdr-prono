require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const queens = [
    'Akeria Davenport', 
    "Eureka O'Hara",
    'Ginger Minj',
    'Jan',
    'Jiggly Caliente',
    'Pandora Boxx',
    "Rajah O'Hara",
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

mongoose.connect(process.env['DB_URL'], { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const forecastSchema = new mongoose.Schema({
    name: String,
    place13: String,
    place12: String,
    place11: String,
    place10: String,
    place9: String,
    place8: String,
    place7: String,
    place6: String,
    place5: String,
    place4: String,
    place3: String,
    place2: String,
    winner: String,
    lipsync1: String,
    lipsync2: String,
    lipsync3: String,
    lipsync4: String,
    lipsync5: String,
    snatch: String,
    talent: String,
    reading: String,
    bitchfest: String,
    topallstar: String
});
const Forecast = new mongoose.model('Forecast', forecastSchema);

const resultSchema = new mongoose.Schema({
    place13: String,
    place12: String,
    place11: String,
    place10: String,
    place9: String,
    place8: String,
    place7: String,
    place6: String,
    place5: String,
    place4: String,
    place3: String,
    place2: String,
    winner: String,
    lipsyncs: Array,
    snatch: String,
    talent: String,
    reading: String,
    bitchfest: String,
    topallstar: String
});
const Result = new mongoose.model('Result', resultSchema);


app.route('/')
    .get(function(req, res) {
        res.render('home', { queens : queens });
    })
    .post(function(req, res) {
        console.log(req.body);
        const forecast = new Forecast(req.body);
        forecast.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.render('thanks');
            }
        });
    });

app.route('/results')
    .get(function(req, res) {
        // Query result
        Result.findOne({}, function(resultError, result){
            if (resultError) {
                console.log(resultError);
            } else if (result) {
                // Query all forecasts
                Forecast.find({}, function(forecastError, forecasts) {
                    if (forecastError) {
                        console.log(forecastError);
                    } else {
                        // Compute scores
                        const scores = [];
                        if (forecasts) {
                            forecasts.forEach(function(forecast) {
                                const score = computeScore(result, forecast);
                                scores.push({name: forecast.name, score: score.score, rightAnswers: score.rightAnswers});
                            });
                        }
                        // Sort forecasts by score, decreasing
                        scores.sort(function(a, b) {
                            if (a.score > b.score) {
                                return -1;
                            } else if (a.score < b.score) {
                                return 1;
                            } 
                            return 0;
                        });
                        res.render('results', { scores : scores });
                    }
                })
            } else {
                console.log('No results found in the DB');
            }
        });
    });

const port = process.env.PORT || 3000;    
app.listen(port, function() {
    console.log('Server started on port ' + port);
});

/*
* UTILITY FUNCTIONS
*/

function computeScore(result, forecast) {
    const rightAnswers = [];
    var score = 0;
    if (result.place13 === forecast.place13) {
        rightAnswers.push('13e place');
        score += 1;
    }
    if (result.place12 === forecast.place12) {
        rightAnswers.push('12e place');
        score += 2;
    }
    if (result.place11 === forecast.place11) {
        rightAnswers.push('11e place');
        score += 4;
    }
    if (result.place10 === forecast.place10) {
        rightAnswers.push('10e place');
        score += 8;
    }
    if (result.place9 === forecast.place9) {
        rightAnswers.push('9e place');
        score += 16;
    }
    if (result.place8 === forecast.place8) {
        rightAnswers.push('8e place');
        score += 32;
    }
    if (result.place7 === forecast.place7) {
        rightAnswers.push('7e place');
        score += 64;
    }
    if (result.place6 === forecast.place6) {
        rightAnswers.push('6e place');
        score += 128;
    }
    if (result.place5 === forecast.place5) {
        rightAnswers.push('5e place');
        score += 256;
    }
    if (result.place4 === forecast.place4) {
        rightAnswers.push('4e place');
        score += 512 + 256;
    }
    if (result.place3 === forecast.place3) {
        rightAnswers.push('3e place');
        score += 1024 + 256;
    }
    if (result.place2 === forecast.place2) {
        rightAnswers.push('2e place');
        score += 2048 + 256;
    }
    if (result.winner === forecast.winner) {
        rightAnswers.push('1e place');
        score += 4096 + 256;
    }
    // Extras
    if (forecast.bitchfest === result.bitchfest) {
        rightAnswers.push('Bitch fest');
        score += 256;
    }
    if (forecast.snatch === result.snatch) {
        rightAnswers.push('Snatch game');
        score += 256;
    }
    if (forecast.talent === result.talent) {
        rightAnswers.push('Talent show');
        score += 256;
    }
    if (forecast.reading === result.reading) {
        rightAnswers.push('Reading challenge');
        score += 256;
    }
    if (forecast.topallstar === result.topallstar) {
        rightAnswers.push('Top all start');
        score += 256;
    }
    // Lipsync assassins
    if (result.lipsyncs.indexOf(forecast.lipsync1) > 0) {
        rightAnswers.push('Lipsync assassin');
        score += 256;
    }
    if (result.lipsyncs.indexOf(forecast.lipsync2) > 0) {
        rightAnswers.push('Lipsync assassin');
        score += 256;
    }
    if (result.lipsyncs.indexOf(forecast.lipsync3) > 0) {
        rightAnswers.push('Lipsync assassin');
        score += 256;
    }
    if (result.lipsyncs.indexOf(forecast.lipsync4) > 0) {
        rightAnswers.push('Lipsync assassin');
        score += 256;
    }
    if (result.lipsyncs.indexOf(forecast.lipsync5) > 0) {
        rightAnswers.push('Lipsync assassin');
        score += 256;
    }
    return { score : score, rightAnswers : rightAnswers };
}