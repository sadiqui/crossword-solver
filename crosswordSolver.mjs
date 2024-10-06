// Check if all rows in the puzzle have the same length
const hasSameLength = (puzzle) => {
    let rows = puzzle.split('\n');
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].length !== rows[0].length) return false;
    }
    return true;
}

// Validate puzzle format
const isValidPuzzleFormat = (puzzle) => {
    if (typeof puzzle !== "string" || puzzle === "" || new RegExp(!/^[.\n012]+$/).test(puzzle) || !hasSameLength(puzzle)) return false;
    return true;
}

// Validate words format
const isValidWordsFormat = (words) => {
    if (!Array.isArray(words) || new Set(words).size !== words.length) return false;
    return true;
}

// Check if word fits horizontally
const canInsertRow = (puzzle, word, row, col) => {
    if (word.length > puzzle[row].length - col) return false;

    // Ensure characters match or are empty (".")
    let substring = puzzle[row].substring(col, col + word.length);
    for (let k = 0; k < substring.length; k++) {
        if ((/[a-z]/.test(substring[k]) && substring[k] !== word[k]) || substring[k] === ".") return false;
    }

    // Ensure no conflicts after the word
    substring = puzzle[row].substring(col);
    if (substring.length > word.length) {
        for (let k = word.length; k < substring.length; k++) {
            if (substring[k] === ".") break;
            else return false;
        }
    }
    return true;
}

// Check if word fits vertically
const canInsertColumn = (puzzle, word, row, col) => {
    let substring = "";

    // Build column string
    for (let k = row; k < puzzle.length; k++) {
        substring += puzzle[k][col];
    }

    if (word.length > substring.length) return false;

    // Ensure characters match or are empty (".")
    for (let k = 0; k < word.length; k++) {
        if ((/[a-z]/.test(substring[k]) && substring[k] !== word[k]) || substring[k] === ".") return false;
    }

    // Ensure no conflicts below the word
    if (substring.length > word.length) {
        for (let k = word.length; k < substring.length; k++) {
            if (substring[k] === ".") break;
            else return false;
        }
    }
    return true;
}

// Insert word horizontally
const insertWordInRow = (puzzle, words, row, col) => {
    for (let k = 0; k < words.length; k++) {
        if (canInsertRow(puzzle, words[k], row, col)) {
            puzzle[row] = puzzle[row].substring(0, col) + words[k] + puzzle[row].substring(col + words[k].length);
            words.splice(k, 1);
            k -= 1;
            break;
        }
    }
}

// Insert word vertically
const insertWordInColumn = (puzzle, words, row, col) => {
    for (let k = 0; k < words.length; k++) {
        if (canInsertColumn(puzzle, words[k], row, col)) {
            for (let l = row; l - row < words[k].length; l++) {
                puzzle[l] = puzzle[l].substring(0, col) + words[k][l - row] + puzzle[l].substring(col + 1);
            }
            words.splice(k, 1);
            k -= 1;
            break;
        }
    }
}

// Solve the puzzle
const solvePuzzle = (puzzle, words) => {
    if (words.length === 0 || (puzzle.length === 1 && puzzle[0].length === 0)) return puzzle;

    let wordsCount = words.length;
    let puzzleCopy = [...puzzle];
    let count = 0;

    for (let x = 0; x < puzzle.length; x++) {
        for (let y = 0; y < puzzle[0].length; y++) {
            if (/\d/.test(puzzle[x][y]) && puzzle[x][y] > "0") {
                count += parseInt(puzzle[x][y]);
                if (count > wordsCount) return ['Error'];

                insertWordInRow(puzzleCopy, words, x, y);
                insertWordInColumn(puzzleCopy, words, x, y);
            }
        }
    }

    return words.length === 0 ? puzzleCopy : ["Error"];
}

// Main crossword solver
function crosswordSolver(puzzle, words) {
    if (puzzle === '' || typeof puzzle !== 'string' || !Array.isArray(words)) return 'Error';

    let canBeSolved = true;

    function markError() {
        canBeSolved = false;
        return "Error";
    }

    if (!isValidPuzzleFormat(puzzle) || !isValidWordsFormat(words) || words.length < 3) return markError();

    if (canBeSolved && isValidWordsFormat(words)) {
        let wordsCopy = [...words].reverse();
        let result = solvePuzzle(puzzle.split("\n"), words).join("\n");

        return result === "Error" ? solvePuzzle(puzzle.split("\n"), wordsCopy).join("\n") : result;
    } else {
        return "Error";
    }
}

// Export to be used in test file
export default crosswordSolver;

// Direct testing from here
const puzzle = '2000\n0...\n0...\n0...'
const words = ['abba', 'assa']

console.log(crosswordSolver(puzzle, words));