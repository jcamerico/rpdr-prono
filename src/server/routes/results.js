const express = require('express')
const router = express.Router()
const Forecast = require('../models/forecast');
const Resultat = require('../models/result');
const scores = require('../utils/score');
const fetchQueens = require('../utils/fetch-queens');

router.get('/', function(req, res) {
    Resultat.findOne({}, function(resultError, result){
        if (resultError) {
            console.log(resultError);
        } else if (result) {
            // Query all forecasts
            Forecast.find({}, async function(forecastError, forecasts) {
                if (forecastError) {
                    console.log(forecastError);
                } else {
                    const allQueens = await fetchQueens();  
                    const bonusScore = Math.pow(2, allQueens.length - 3);
                    const allScores = scores(result, forecasts, bonusScore);                    
                    res.status(200).send(allScores);
                }
            })
        } else {
            console.log('No results found in the DB');
        }
    });
});

module.exports = router;