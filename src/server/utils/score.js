
function computeScores(result, forecasts, bonusScore) {
    const scores = [];
    if (forecasts) {
        forecasts.forEach(function(forecast) {
            const score = computeScore(result, forecast, bonusScore);
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
    return scores;
}

function computeScore(result, forecast, bonusScore) {
    
    const answer = [];

    var score = 0;
    const numberOfQueens = forecast.places.length;

    // positions
    for (let i = 0; i < numberOfQueens; i++) {
        const position = numberOfQueens - i;
        const queen = forecast.places[i];
        const message = position + 'e place: ' + queen;
        let found = false;
        result.places[i].forEach(function(value) {
            if (value === queen) {
                answer.push({ message: message, status: 'correct'} );
                found = true;
                score += Math.pow(2, i);
                if (position <= 4) {
                    score += bonusScore;
                }
            }
        });
        if (!found) {
            if (result.places[i].length === 0) {
                answer.push({ message: message, status: 'unknown'} );
            } else {
                answer.push({ message: message, status: 'incorrect'} );
            }
        }
    }

    // lipsync assassin
    forecast.lipsyncs.forEach(function(queen) {
        const queenName = queen.toLowerCase();
        const message = 'Lipsync assassin: ' + queen;
        let found = false;
        result.lipsyncs.forEach(function(assassin){
            if (queenName === assassin.toLowerCase()) {
                answer.push({ message: message, status: 'correct'});
                score += bonusScore;
                found = true;
            }
        });
        if (!found && queen) {
            answer.push({ message: message, status: 'unknown'} );
        }
    });

    // Extra challenges
    result.challenges.forEach(function(winners, challenge, map) {
        const queen = forecast.challenges.get(challenge);
        const message = challenge + ': ' + queen;
        let found = false;
        if (winners.includes(queen)) {
            found = true;
            answer.push({ message: message, status: 'correct' });
            score += bonusScore;
        } else if ((winners.length === 0) && queen) {
            answer.push({ message: message, status: 'unknown' });
        } else if (queen) {
            answer.push({ message: message, status: 'incorrect' });
        }        
    });
    
    return { score : score, rightAnswers : answer, forecast: forecast };
}

module.exports = computeScores;
