const Queen = require('../models/queen');

function fetchQueens() {
    return new Promise(resolve => {
        Queen.find({}, function(error, queens){
            if (error) {
                console.log(error);
                resolve([]);
            } else {                
                const names = queens.map(q => q.name);
                names.sort();
                resolve(names);
            }
        });
    });
}

module.exports = fetchQueens;