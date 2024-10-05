// Check if all rows in the puzzle have the same length
const hasUniformLength = (puzzle) => {
    const rows = puzzle.split('\n');
    const firstRowLength = rows[0].length;

    for (let i = 1; i < rows.length; i++) {
        if (rows[i].length !== firstRowLength) return false;
    }
    return true;
}

// Validate puzzle format
const isValidPuzzleFormat = (puzzle) => {
    const puzzleRegex = /^[.\n012]+$/;

    return (
        typeof puzzle === "string" &&
        puzzle !== "" &&
        puzzleRegex.test(puzzle) &&
        hasUniformLength(puzzle)
    );
}

// Validate words format
const isValidWordsFormat = (words) => {
    return Array.isArray(words) && new Set(words).size === words.length;
}

// Check if word fits horizontally
function canPlaceInRow(puzzle, word, rowIndex, colIndex) {
    const row = puzzle[rowIndex];

    if (word.length > row.length - colIndex) return false;

    const segment = row.substring(colIndex, colIndex + word.length);

    // Ensure characters match or are empty (".")
    for (let k = 0; k < word.length; k++) {
        if ((/[a-z]/.test(segment[k]) && segment[k] !== word[k]) || segment[k] === ".") {
            return false;
        }
    }

    // Ensure no conflicts after the word
    const remainingSegment = row.substring(colIndex + word.length);
    for (let k = 0; k < remainingSegment.length; k++) {
        if (remainingSegment[k] !== ".") return false;
    }

    return true;
}

// Check if word fits vertically
function canPlaceInColumn(puzzle, word, rowIndex, colIndex) {
    let columnContent = "";

    // Build column string
    for (let i = rowIndex; i < puzzle.length; i++) {
        columnContent += puzzle[i][colIndex];
    }

    if (word.length > columnContent.length) return false;

    // Ensure characters match or are empty (".")
    for (let k = 0; k < word.length; k++) {
        if ((/[a-z]/.test(columnContent[k]) && columnContent[k] !== word[k]) || columnContent[k] === ".") {
            return false;
        }
    }

    // Ensure no conflicts below the word
    const remainingSegment = columnContent.substring(word.length);
    for (let k = 0; k < remainingSegment.length; k++) {
        if (remainingSegment[k] !== ".") return false;
    }

    return true;
}

// Insert word horizontally
function insertInRow(puzzle, words, rowIndex, colIndex) {
    for (let i = 0; i < words.length; i++) {
        if (canPlaceInRow(puzzle, words[i], rowIndex, colIndex)) {
            const row = puzzle[rowIndex];
            puzzle[rowIndex] = row.substring(0, colIndex) + words[i] + row.substring(colIndex + words[i].length);
            words.splice(i, 1);
            return;
        }
    }
}

// Insert word vertically
function insertInColumn(puzzle, words, rowIndex, colIndex) {
    for (let i = 0; i < words.length; i++) {
        if (canPlaceInColumn(puzzle, words[i], rowIndex, colIndex)) {
            for (let j = 0; j < words[i].length; j++) {
                puzzle[rowIndex + j] = puzzle[rowIndex + j].substring(0, colIndex) + words[i][j] + puzzle[rowIndex + j].substring(colIndex + 1);
            }
            words.splice(i, 1);
            return;
        }
    }
}

// Solve the puzzle
function solvePuzzle(puzzle, words) {
    if (words.length === 0 || puzzle.length === 0 || puzzle[0].length === 0) return puzzle;

    const puzzleCopy = [...puzzle];
    const totalWords = words.length;
    let wordCount = 0;

    for (let rowIndex = 0; rowIndex < puzzle.length; rowIndex++) {
        for (let colIndex = 0; colIndex < puzzle[0].length; colIndex++) {
            if (/\d/.test(puzzle[rowIndex][colIndex]) && puzzle[rowIndex][colIndex] > "0") {
                wordCount += Number(puzzle[rowIndex][colIndex]);
                if (wordCount > totalWords) return ['Error'];

                insertInRow(puzzleCopy, words, rowIndex, colIndex);
                insertInColumn(puzzleCopy, words, rowIndex, colIndex);
            }
        }
    }

    return words.length === 0 ? puzzleCopy : ['Error'];
}

// Main crossword solver
function crosswordSolver(puzzle, words) {
    if (typeof puzzle !== 'string' || !Array.isArray(words)) {
        return 'Error';
    }

    if (!isValidPuzzleFormat(puzzle) || !isValidWordsFormat(words) || words.length < 3) {
        return 'Error';
    }

    const puzzleGrid = puzzle.split('\n');
    let result = solvePuzzle(puzzleGrid, words).join('\n');

    if (result === 'Error') {
        result = solvePuzzle(puzzleGrid, words.reverse()).join('\n');
    }

    return result;
}
