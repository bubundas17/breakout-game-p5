const gameHeight = 800
const gameWidth = 800

let breakout =  new Breakout(gameWidth, gameHeight);

function setup() {
    breakout.addBall(0, 0)
    createCanvas(gameWidth, gameHeight);
}

function draw() {
    background(255);
    breakout.gameLoop()
    breakout.draw()
}