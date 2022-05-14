const express = require('express')
const router = express.Router()
const fetchQueens = require('../utils/fetch-queens');

router.get('/', async function(req, res) {
    const allQueens = await fetchQueens();  
    res.status(200).send(allQueens);
});

module.exports = router;