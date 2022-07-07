const gameHeight = 800
const gameWidth = 800

let breakout =  new Breakout(gameWidth, gameHeight);

function setup() {
    breakout.addBall(gameWidth/2, gameHeight/2)
    createCanvas(gameWidth, gameHeight);
}

function draw() {
    background(255);
    breakout.gameLoop()
    breakout.draw()
}