# Crossword

This is a JavaScript program that is able to solve an empty crossword puzzle.

The main function is `crosswordSolver` which takes two arguments:

- An empty puzzle, passed as a string, and;
- A list of words to fill in the puzzle (no double words allowed).

The function prints on the console a string representing the puzzle filled with the input words.

The empty puzzle must be a string with the following rules:

- Each character is be either a `number`, a `.` or a `\n`;
- A `number` represents the number of words starting from the specific position;
- A dot `.` represents a space that does not need to be filled.

If the puzzle or list of words provided as inputs does not guarantee a unique solution, or any other conditions stated above are not met, the function prints 'Error'.

# Usage

1. Make sure that [node runtime](https://nodejs.org/en/download/package-manager) is installed on your machine.

2. Clone the repository:

```bash
git clone https://learn.zone01oujda.ma/git/asadiqui/crossword.git
```

3. Provide inputs:

```js
const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);
```

4. Run the program:

```bash
node crosswordSolver.js
```

5. Enjoy the solution:

```bash
casa
i..l
anta
o..n
```

6. You can also run a test:

```bash
node crosswordSolverTest.js
```

## License

This project is open-sourced under [the MIT License](https://opensource.org/license/mit).
