/* static/app.js */
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const cellElements = document.querySelectorAll('[data-cell]')
    const board = document.querySelector('.game-board')
    const winningMessageElement = document.getElementById('winningMessage')
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
    const restartButton = document.getElementById('restartButton')
    const themeToggle = document.getElementById('themeToggle')
    const xWinsElement = document.getElementById('xWins')
    const oWinsElement = document.getElementById('oWins')
    const X_CLASS = 'x'
    const CIRCLE_CLASS = 'circle'
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let circleTurn
    let xWins = 0
    let oWins = 0

    startGame()

    restartButton.addEventListener('click', startGame)
    themeToggle.addEventListener('click', toggleTheme)

    function startGame() {
        console.log("Game started");
        circleTurn = false
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
            cell.textContent = ''
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        })
        setBoardHoverClass()
        winningMessageElement.classList.remove('show')
    }

    function handleClick(e) {
        const cell = e.target
        console.log("Cell clicked", cell);
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        placeMark(cell, currentClass)
        if (checkWin(currentClass)) {
            endGame(false)
        } else if (isDraw()) {
            endGame(true)
        } else {
            swapTurns()
            setBoardHoverClass()
        }
    }

    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!'
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
            if (circleTurn) {
                oWins++
                oWinsElement.textContent = oWins
            } else {
                xWins++
                xWinsElement.textContent = xWins
            }
        }
        winningMessageElement.classList.add('show')
        console.log("Game ended", draw ? "Draw" : `${circleTurn ? "O's" : "X's"} Wins!`);
    }

    function isDraw() {
        const draw = [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        })
        console.log("Is draw:", draw);
        return draw
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
        cell.textContent = currentClass === X_CLASS ? 'X' : 'O'
        console.log("Placed mark", currentClass, "on cell", cell);
    }

    function swapTurns() {
        circleTurn = !circleTurn
        console.log("Swapped turns. Circle turn:", circleTurn);
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS)
        board.classList.remove(CIRCLE_CLASS)
        if (circleTurn) {
            board.classList.add(CIRCLE_CLASS)
        } else {
            board.classList.add(X_CLASS)
        }
        console.log("Set board hover class", circleTurn ? CIRCLE_CLASS : X_CLASS);
    }

    function checkWin(currentClass) {
        const win = WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
        console.log("Check win for", currentClass, ":", win);
        return win
    }

    function toggleTheme() {
        document.body.classList.toggle('modern')
        console.log("Theme toggled");
    }
})

