class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.startButton.addEventListener('click', this.startGame.bind(this));
        this.view.gameBoard.addEventListener('click', this.handleBoardClick.bind(this));
    }

    startGame() {
        this.model.resetGame();
        this.view.updateScore(this.model.score);
        this.view.updateTimer(this.model.timer);
        this.view.initializeBoard();
        this.startTimer();
        this.spawnMoles();
        this.spawnSnakes();
        this.view.startButton.classList.add('started');
    }

    startTimer() {
        const timerInterval = setInterval(() => {
            if (this.model.timer === 0) {
                clearInterval(timerInterval);
                this.endGame();
            } else {
                this.model.decrementTimer();
                this.view.updateTimer(this.model.timer);
            }
        }, 1000);
    }

    spawnMoles() {
        this.model.moleInterval = setInterval(() => {
            const emptyBlocks = this.model.board.filter(block => block.status === 'empty');
            if (emptyBlocks.length > 0) {
                const randomBlock = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];
                this.model.setMole(randomBlock.id);
                this.view.updateBlock(randomBlock.id, 'mole');
                setTimeout(() => {
                    this.model.clearMole(randomBlock.id);
                    this.view.updateBlock(randomBlock.id, 'empty');
                }, 2000);
            }
        }, 1000);
    }

    spawnSnakes() {
        this.model.snakeInterval = setInterval(() => {
            const allBlocks = this.model.board;
            const randomBlock = allBlocks[Math.floor(Math.random() * allBlocks.length)];
            this.model.setSnake(randomBlock.id);
            this.view.updateBlock(randomBlock.id, 'snake');
            setTimeout(() => {
                this.model.clearMole(randomBlock.id);
                this.view.updateBlock(randomBlock.id, 'empty');
            }, 2000);
        }, 2000);
    }

    handleBoardClick(event) {
        const block = event.target.closest('.game-block');
        if (!block) return;

        const blockId = Number(block.dataset.id);
        const blockStatus = this.model.board[blockId].status;

        if (blockStatus === 'mole') {
            this.model.updateScore(1);
            this.view.updateScore(this.model.score);
            this.model.clearMole(blockId);
            this.view.updateBlock(blockId, 'empty');
        } else if (blockStatus === 'snake') {
            alert('Game Over! You clicked a snake!');
            this.endGame();
        }
    }

    endGame() {
        alert('Time is Over!');
        this.model.resetGame();
        this.view.startButton.classList.remove('started');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const model = new GameModel();
    const view = new GameView();
    new GameController(model, view);
});
