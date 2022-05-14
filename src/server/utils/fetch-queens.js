const Queen = require('../models/queen');

function fetchQueens() {
    return new Promise(resolve => {
        Queen.find({}, function(error, queens){
            if (error) {
                console.log(error);
                resolve([]);
            } else {                
                const names = queens.map(q => q.name);
                resolve(names);
            }
        });
    });
}

module.exports = fetchQueens;