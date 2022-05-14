const scores = require('../score');

test('expects score to be correct', () => {
    
    const forecastChallenges = new Map();
    forecastChallenges.set('Snatch Game', 'A');
    forecastChallenges.set('Reading Challenge', 'A');
    const forecasts = [{
        name: 'tester',
        places: ['E', 'D', 'C', 'B', 'A'],
        lipsyncs: ['X', 'Y', 'Z'],
        challenges: forecastChallenges
    }];

    const resultChallenges = new Map();
    resultChallenges.set('Snatch Game', ['A']);
    resultChallenges.set('Reading Challenge', ['B']);
    const result = {
        places: [['E'], ['D'], ['P'], [], []],
        lipsyncs: ['V', 'U', 'X'],
        challenges: resultChallenges
    };

    const obtainedResults = scores(result, forecasts);
    expect(obtainedResults.length).toBe(1);
    expect(obtainedResults[0].name).toBe('tester');
    expect(obtainedResults[0].score).toBe(1 + 2 + 256 + 256 + 256);
    expect(obtainedResults[0].rightAnswers).toEqual([
        { message : '5e place: E', status : 'correct'},
        { message : '4e place: D', status : 'correct'},
        { message : '3e place: C', status : 'incorrect' }, 
        { message : '2e place: B', status : 'unknown' }, 
        { message : '1e place: A', status : 'unknown' }, 
        { message : 'Lipsync assassin: X', status : 'correct' },
        { message : 'Lipsync assassin: Y', status : 'unknown' },
        { message : 'Lipsync assassin: Z', status : 'unknown' }, 
        { message : 'Snatch Game: A', status : 'correct' },
        { message : 'Reading Challenge: A', status : 'incorrect' }
    ]);

});