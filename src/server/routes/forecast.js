const express = require('express')
const router = express.Router()
const Forecast = require('../models/forecast');

router.post('/', function(req, res) {
    const forecast = new Forecast(req.body);
    forecast.date = new Date();
    forecast.save(function(err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send('ok');
        }
    });
});

module.exports = router;