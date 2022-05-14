const mongoose = require('mongoose');

const forecastSchema = new mongoose.Schema({
    name: String,
    date: Date,
    places: [String],
    lipsyncs: [String],
    challenges: {
        type: Map,
        of: String
    }
});

module.exports = mongoose.model('Prono', forecastSchema);
