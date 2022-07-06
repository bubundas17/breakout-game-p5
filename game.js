class Breakout {
    constructor(width, height) {
        this.height = height;
        this.width = width;

        // Hold Balls Classes here.
        this.balls = []
        this.board = new Board(0)
        this.board.game = this;
    }

    // Draw The Game
    draw() {
        // Loop through all the balls and draw them.
        for (let ball of this.balls) {
            ball.draw()

        }

        // Draw The Board
        this.board.draw()
    }

    // add ball 
    addBall(x, y, xv = 2, yv = 2) {
        let newBall = new Ball(x, y, xv, yv);
        newBall.game = this;
        this.balls.push(newBall)
    }

    // gameloop 
    gameLoop() {
        // Loop through all the balls and step them.
        for (let ball of this.balls) {
            ball.step()
        }

        // step through board 
        this.board.step()
    }
}

class Ball {
    constructor(x, y, xv, yv) {
        this.ballSize = 30;
        this.x = x; // ball x pos
        this.y = y; // ball y pos

        this.xv = xv; // ball x velocity (px per frame)
        this.yv = yv; // ball y velocity 
    }

    // step the ball state farther
    step() {
        if (!this.game) throw new Error("Game Class Is required.")
        this.x += this.xv
        this.y += this.yv
    }

    // Draw The Circle
    draw() {
        fill(0)
        circle(this.x, this.y, this.ballSize)
    }

}


class Board {
    constructor(pos, mode = "single") {
        this.pos = pos;
        this.mode = mode;
        this.length = 100;
        this.width = 10;
    }

    step() {
        if (!this.game) throw new Error("Game Class Is required.")
        this.pos = mouseX -  (this.length/2)
    }

    draw() {
        fill(0)
        rect(this.pos, height - (this.width + 2), this.length, this.width);
    }
}