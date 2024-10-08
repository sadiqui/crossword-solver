// Import the crosswordSolver function
import crosswordSolver from './crosswordSolver.js';

const crosswordSolverTest = () => {
    const testCases = [
        {
            puzzle: `2001
0..0
1000
0..0`,
            words: ['casa', 'alan', 'ciao', 'anta'],
            description: "Test with a standard puzzle"
        },
        {
            puzzle: `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`,
            words: [
                'sun', 'sunglasses', 'suncream', 'swimming', 'bikini', 'beach', 'icecream',
                'tan', 'deckchair', 'sand', 'seaside', 'sandals'
            ],
            description: "Test with a complex puzzle"
        },
        {
            puzzle: `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`,
            words: [
                'popcorn', 'fruit', 'flour', 'chicken', 'eggs', 'vegetables', 'pasta',
                'pork', 'steak', 'cheese'
            ],
            description: "Test with another standard puzzle"
        },
        {
            puzzle: `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`,
            words: [
                'sun', 'sunglasses', 'suncream', 'swimming', 'bikini', 'beach', 'icecream',
                'tan', 'deckchair', 'sand', 'seaside', 'sandals'
            ].reverse(),
            description: "Test with reversed words"
        },
        {
            puzzle: `2001
0..0
2000
0..0`,
            words: ['casa', 'alan', 'ciao', 'anta'],
            description: "Test mismatched number words and starting cells"
        },
        {
            puzzle: `0001
0..0
3000
0..0`,
            words: ['casa', 'alan', 'ciao', 'anta'],
            description: "Test starting words higher than 2"
        },
        {
            puzzle: `2001
0..0
1000
0..0`,
            words: ['casa', 'casa', 'ciao', 'anta'],
            description: "Test words repetition"
        },
        {
            puzzle: '',
            words: ['casa', 'alan', 'ciao', 'anta'],
            description: "Test empty puzzle"
        },
        {
            puzzle: 123,
            words: ['casa', 'alan', 'ciao', 'anta'],
            description: "Test wrong format checks"
        },
        {
            puzzle: '',
            words: 123,
            description: "Test wrong format checks"
        },
        {
            puzzle: `2000
0...
0...
0...`,
            words: ['abba', 'assa'],
            description: "Test multiple solutions"
        },
        {
            puzzle: `2001
0..0
1000
0..0`,
            words: ['aaab', 'aaac', 'aaad', 'aaae'],
            description: "Test no solution"
        }
    ];

    testCases.forEach(({ puzzle, words, description }) => {
        try {
            const result = crosswordSolver(puzzle, words);
            console.log(`${description}:\n${result}`);
        } catch (error) {
            console.error(`${description} - Error occurred:`, error.message);
        }
        console.log('--------------------------------');
    });
};

crosswordSolverTest();
