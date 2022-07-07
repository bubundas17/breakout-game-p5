class Breakout {
    constructor(width, height) {
        this.height = height;
        this.width = width;

        // Hold Balls Classes here.
        this.balls = []
        this.bricks = []
        this.board = new Board(0)
        this.board.game = this;

        this.brickHeight = 10
        this.brickWidth = width / 10 // 10 Bricks in x direction
        this.seedBricks()
    }

    // Draw The Game
    draw() {
        // Loop through all the balls and draw them.
        for (let ball of this.balls) {
            ball.draw()

        }

        // loop throuch each brick and draw them
        for (let brick of this.bricks) {
            brick.draw()
        }

        // Draw The Board
        this.board.draw()
    }

    // add ball 
    addBall(x, y, xv = 0, yv = 5) {
        let newBall = new Ball(x, y, xv, yv);
        newBall.game = this;
        this.balls.push(newBall)
    }

    // Remove Destroied Balls.
    removeDestroiedBalls() {
        for (let i in this.balls) {
            // remove destroyed balls
            if (this.balls[i].destroyed) {
                // removing the destroyed ball.
                this.balls.splice(i, 1);
                console.log("Ball Removed at index: " + i)
            }
        }
    }

    // Remove Destroied Bricks.
    removeDestroiedBricks() {
        for (let i in this.bricks) {
            // remove destroyed balls
            if (this.bricks[i].destroyed) {
                // removing the destroyed ball.
                this.bricks.splice(i, 1);
                console.log("Brick Removed at index: " + i)
            }
        }
    }

    // gameloop 
    gameLoop() {
        // Loop through all the balls and step them.
        for (let ball of this.balls) {
            ball.step()
        }

        // loop throuch each brick and step them
        for (let brick of this.bricks) {
            brick.step()
        }

        this.removeDestroiedBalls();
        this.removeDestroiedBricks();


        // step through board 
        this.board.step()
    }

    // seed bricks 
    seedBricks() {
        for (let i = 0; i <= this.width; i += this.brickWidth) {
            for (let j = 0; j <= 300; j += this.brickHeight) {
                let brick = new Brick(this.brickHeight, this.brickWidth, i, j);
                brick.game = this;
                this.bricks.push(brick)
            }
        }

    }
}

class Ball {
    constructor(x, y, xv, yv) {
        this.ballSize = 15;
        this.x = x; // ball x pos
        this.y = y; // ball y pos

        this.xv = xv; // ball x velocity (px per frame)
        this.yv = yv; // ball y velocity 

        // Destroyrd
        this.destroyed = false;
    }

    // step the ball state farther
    step() {
        if (!this.game) throw new Error("Game Class Is required.")
        this.x += this.xv
        this.y += this.yv
        this.detectCollision()
    }

    // detect collision
    detectCollision() {
        if (this.x > this.game.height) { this.xv = - Math.abs(this.xv); return; };
        if (this.x < 0) { this.xv = Math.abs(this.xv); return };
        if (this.y < 0) { this.yv = Math.abs(this.yv); return };

        // if (this.y > this.game.width) { this.yv = - Math.abs(this.yv); return; };
        // this.destroyed = true;
        if (this.y > this.game.width) { this.destroy(); return; };
    }

    // destroy the ball if it falls out of screen.
    destroy() {
        this.destroyed = true; // cleanup the ball class after some time.
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
        this.pos = mouseX - (this.length / 2)
        this.bounce()
    }

    // lets bounce the ball if it touches the board.
    bounce() {
        let boardStart = this.pos
        let boardEnd = this.pos + this.length
        // console.log(`Start: ${boardStart}; end: ${boardEnd}; pos: ${this.pos}`)

        for (let ball of this.game.balls) {
            // no need to do anything if the ball is not close to the board.
            if (ball.y < (this.game.width - this.width)) continue;

            if (ball.x > boardStart && ball.x < boardEnd) {
                // bounce the ball in y direction
                ball.yv = -Math.abs(ball.yv);

                // lets also adjust the ball x velocity depending on where the ball hit the board.

                let boardCenter = this.pos + (this.length / 2)
                let destance = ball.x - boardCenter;
                let xv = map(destance, -(this.length / 2), (this.length / 2), -4, 4)
                // console.log(xv)
                ball.xv = xv;
            }


        }
    }


    draw() {
        fill(0)
        rect(this.pos, height - (this.width + 2), this.length, this.width);
    }
}

class Brick {
    constructor(height, width, posX, posY) {
        this.height = height
        this.width = width
        this.posX = posX
        this.posY = posY

        this.destroyed = false;
    }

    draw() {
        fill(200)
        strokeWeight(1);
        stroke(0);
        rect(this.posX, this.posY, this.width, this.height);
    }

    step() {
        for (let ball of this.game.balls) {
            this.bounce(ball);
        }
    }

    destroy() {
        this.destroyed = true
    }


    bounce(ball) {
        let startY = this.posY
        let stopY = this.posY + this.height

        let startX = this.posX
        let stopX = this.posX + this.width;


        if (ball.y > startY && ball.y < stopY) {
            if (ball.x > startX && ball.x < stopX) {
                ball.xv = -ball.xv
                ball.yv = -ball.yv
                this.destroy()
            }
        }

    }

    // bounceBottom() {

    // }

    // bounceLeft() {

    // }

    // bounceRight() {

    // }

}