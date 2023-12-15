// /*----- constants -----*/

//canvas and context variables
const cvs = document.getElementById("screen");
const ctx = cvs.getContext("2d");

var sprite = new Image();
sprite.src = "imgs/fbsprite.png"; //why is "../" not needed here?

const bg = {
    // draw: function () {
    //     ctx.drawImage(sprite, 0, 0, 360, 640, 0, 0, 360, 640);
    // },
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

    dx: 2,

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

function loop() {
    bg.draw();
    fg.draw();
}

134;
195;
211;

requestAnimationFrame(loop);

setTimeout(() => {}, 300);

// //board variables

// //bird hitbox variables

// //physic variables

// let boardWidth = 340;
// let boardHeight = 640;

// let birdWidth = 34;
// let birdHeight = 24;

// // console.log("heyyyyyyy");

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

// // var birdImg = document.getElementById("bird-sprite");

// // birdImg.onload = function () {
// //     context.drawImage(
// //         birdImg,
// //         boardWidth / 8,
// //         boardHeight / 2,
// //         birdWidth,
// //         birdHeight
// //     );
// // };

// /*----- HTML elements -----*/

// /*----- state variables -----*/

// //pipe array --> for random pipes

// //score

// //collision (gameOver)

// /*----- event listeners -----*/
// //space bar to listen to jump button

// /*----- functions -----*/
// // initialise() //--> initialise game state

// //renderPipes() // --> pipe functionality

// //move() // --> bird functionality

// // checkCollision() // --> check collion with pipes

// //run() //--> main game functionality here
