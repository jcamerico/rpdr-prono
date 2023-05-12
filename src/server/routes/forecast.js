const express = require('express')
const router = express.Router()
const Forecast = require('../models/forecast');
const limitDate = new Date('2023-05-13');
const deadlineErrorMessage = 'Sorry, but the deadline for submitting new forecasts is over! Sashay away!';

router.post('/', function(req, res) {
    const forecast = new Forecast(req.body);
    const now = new Date();
    if (now >= limitDate) {
        console.log(deadlineErrorMessage);
        res.status(400).send(deadlineErrorMessage);
    } else {
        forecast.date = now;
        forecast.save(function(err) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send('ok');
            }
        });
    }
});

module.exports = router;
