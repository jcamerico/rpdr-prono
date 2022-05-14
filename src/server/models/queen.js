const mongoose = require('mongoose');

const queenSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Queen', queenSchema);
