const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    places: [[String]],
    lipsyncs: [String],
    challenges: Map
});

module.exports = mongoose.model('Resultat', resultSchema);
