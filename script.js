const words = ["apple", "banana", "cherry", "grape", "orange"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let remainingChances = 7;
let guessedLetters = new Set();

function displayWord() {
    let displayedWord = '';
    for (let letter of selectedWord) {
        if (guessedLetters.has(letter)) {
            displayedWord += `<span class="letter">${letter}</span>`;
        } else {
            displayedWord += '_';
        }
    }
    document.getElementById('word').innerHTML = displayedWord;
}

function displayLettersGuessed() {
    document.getElementById('lettersGuessed').textContent = [...guessedLetters].join(', ');
}

function displayChances() {
    document.getElementById('chances').textContent = remainingChances;
}

function checkGuess() {
    const guess = document.getElementById('guessInput').value.toLowerCase();
    if (!guess || guessedLetters.has(guess)) return;

    guessedLetters.add(guess);

    if (!selectedWord.includes(guess)) {
        remainingChances--;
    }

    displayWord();
    displayLettersGuessed();
    displayChances();

    if (remainingChances === 0) {
        alert(`You lost! The word was "${selectedWord}".`);
        resetGame();
    } else if ([...selectedWord].every(letter => guessedLetters.has(letter))) {
        highlightCorrectGuess();
        alert(`Congratulations! You guessed the word "${selectedWord}"!`);
        resetGame();
    }

    document.getElementById('guessInput').value = '';
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    remainingChances = 6;
    guessedLetters.clear();
    displayWord();
    displayLettersGuessed();
    displayChances();
}

function highlightCorrectGuess() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        if (guessedLetters.has(letter.textContent)) {
            letter.classList.add('correct-guess');
        }
    });
}

displayWord();
displayChances();
