class GameView {
    constructor() {
        this.startButton = document.getElementById('start-game');
        this.scoreCounter = document.getElementById('score-counter');
        this.timerCountdown = document.getElementById('timer-countdown');
        this.gameBoard = document.getElementById('game-board');
    }

    initializeBoard() {
        this.gameBoard.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            const block = document.createElement('div');
            block.classList.add('game-block');
            block.dataset.id = i;
            this.gameBoard.appendChild(block);
        }
    }

    updateScore(score) {
        this.scoreCounter.textContent = `Your total Score: ${score}`;
    }

    updateTimer(timer) {
        this.timerCountdown.textContent = timer;
    }

    updateBlock(id, status) {
        const block = this.gameBoard.querySelector(`[data-id='${id}']`);
        if (status === 'mole') {
            block.innerHTML = '<img src="images/mole.jpg" alt="Mole" />';
        } else if (status === 'snake') {
            block.innerHTML = '<img src="images/snake.jpg" alt="Snake" />';
        } else {
            block.innerHTML = '';
        }
    }
}
