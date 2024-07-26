class GameModel {
    constructor() {
        this.score = 0;
        this.timer = 30;
        this.board = Array.from({ length: 12 }, (_, id) => ({ id, status: 'empty' }));
        this.moleInterval = null;
        this.snakeInterval = null;
    }

    resetGame() {
        this.score = 0;
        this.timer = 30;
        this.board.forEach(block => block.status = 'empty');
        clearInterval(this.moleInterval);
        clearInterval(this.snakeInterval);
    }

    updateScore(points) {
        this.score += points;
    }

    decrementTimer() {
        this.timer--;
    }

    setMole(id) {
        this.board[id].status = 'mole';
    }

    clearMole(id) {
        this.board[id].status = 'empty';
    }

    setSnake(id) {
        this.board[id].status = 'snake';
    }
}
