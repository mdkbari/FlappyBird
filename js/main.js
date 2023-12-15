// /*----- HTML elements -----*/

const cvs = document.getElementById("screen");
const ctx = cvs.getContext("2d");

var sprite = new Image();
sprite.src = "imgs/fbsprite.png"; //why is "../" not needed here?

// /*----- constants -----*/
const bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height - 226,

    draw() {
        ctx.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x,
            this.y,
            this.w,
            this.h
        );
        ctx.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x + this.w,
            this.y,
            this.w,
            this.h
        );
    },
};

const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,

    draw() {
        ctx.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x,
            this.y,
            this.w,
            this.h
        );

        ctx.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x + this.w,
            this.y,
            this.w,
            this.h
        );
    },

    update() {
        if (state.current == state.game) {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
    },
};

const bird = {
    sX: 276,
    sY: 112,
    w: 34,
    h: 26,

    draw(x, y) {
        ctx.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            x,
            y,
            this.w,
            this.h
        );
    },

    // update(velocityY, gravity) {
    //     velocityY += gravity;
    //     bird.y = Math.max(bird.y + velocityY, 0);
    //     ctx.drawImage(
    //         sprite,
    //         this.sX,
    //         this.sY,
    //         this.w,
    //         this.h,
    //         this.x,
    //         this.y,
    //         this.w,
    //         this.h
    //     );
    // },
};

// /*----- state variables -----*/

let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0;

let x = cvs.width / 8;
let y = cvs.height / 2;
let gameStarted = false;

// /*----- event listeners -----*/
document.addEventListener("keydown", moveBird);

// /*----- functions -----*/

function moveBird(e) {
    if (e.code == "Space") {
        // console.log("move me move");
        // console.log(e.code);
        velocityY -= 6;
        gravity = 0.4;
    }
}

function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    bg.draw();
    fg.draw();

    //bird
    velocityY += gravity;
    // bird.y += velocityY;
    y = Math.max(y + velocityY, 0);

    bird.draw(x, y);
    requestAnimationFrame(loop);
    // ctx.clearRect(0, 0, cvs.width, cvs.height);
}

requestAnimationFrame(loop);

// //board variables

// //bird hitbox variables

// //physic variables

// window.addEventListener(
//     "load",
//     () => {
//         let board;
//         board = document.getElementById("game-background");
//         let context;

//         context = board.getContext("2d"); //used for drawing on the board
//     },
//     false
// );

// //pipe array --> for random pipes

// //score

// //collision (gameOver)

// /*----- event listeners -----*/
// //space bar to listen to jump button

// // initialise() //--> initialise game state

// //renderPipes() // --> pipe functionality

// //move() // --> bird functionality

// // checkCollision() // --> check collion with pipes

// //run() //--> main game functionality here
