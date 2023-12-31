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
};

class topPipe {
    constructor(value) {
        (this.sX = 554),
            (this.sY = 0),
            (this.w = 54),
            (this.h = 400),
            (this.x = cvs.width),
            (this.y = value),
            (this.passed = false);
    }

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
    }
}

class bottomPipe {
    constructor(value) {
        (this.sX = 500),
            (this.sY = 0),
            (this.w = 54),
            (this.h = 400),
            (this.x = cvs.width),
            (this.y = value),
            (this.passed = false);
    }

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
    }
}

const score = {
    value: 0,

    draw() {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.font = "35px Teko";
        ctx.fillText(this.value, cvs.width / 2, 50);
        ctx.strokeText(this.value, cvs.width / 2, 50);
    },
};

const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 40,
    x: cvs.width / 2 - 225 / 2,
    y: 200,

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
    },
};

const restart = {
    sX: 175,
    sY: 400,
    w: 225,
    h: 50,
    x: cvs.width / 2 - 225 / 2,
    y: 260,

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
    },
};

// /*----- state variables -----*/

let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0;
let x = cvs.width / 8;
let y = cvs.height / 2;
let collided = false;

//pipes
let pipeArray = [];
let pipeX = cvs.width;
let pipeY = 0;

// /*----- event listeners -----*/
document.addEventListener("keydown", moveBird);
document.addEventListener("click", reloadWepPage);
setInterval(addPipes, 1500);

// /*----- functions -----*/

function moveBird(e) {
    if (e.code == "Space") {
        velocityY -= 6;
        gravity = 0.4;
    }
}

function reloadWepPage(e) {
    const coord = cvs.getBoundingClientRect();

    const x_start = coord.left + restart.x + 72.5;
    const y_start = coord.top + restart.y + 3.5;

    //these numbers (72.5, and 3.5 are arbitrary numbers to
    //get the coordinates of start box which is estimated to be around (492, 332))
    //find a way to calculate this without arbitrary numbers

    //this is buggy
    if (
        e.clientX >= x_start &&
        e.clientX <= x_start + restart.w &&
        e.clientY >= y_start &&
        e.clientY <= y_start + restart.h
    ) {
        console.log("hiiiiiii");
        window.location.reload();
    }
}

function addPipes() {
    if (collided) {
        return;
    }

    let randomY = 0 - 400 / 4 - Math.random() * (400 / 2);
    let opening = cvs.height / 4;

    const newTPipe = new topPipe(randomY);
    const newBPipe = new bottomPipe(randomY + 400 + opening);
    pipeArray.push(newTPipe);
    pipeArray.push(newBPipe);
}

function detectCollision(pipe) {
    //a is flappy bird b is pipe
    return (
        x < pipe.x + pipe.w &&
        x + bird.w > pipe.x &&
        y < pipe.y + pipe.h &&
        y + bird.h > pipe.y
    );
}

function endOfGame() {
    gameOver.draw();
    restart.draw();
    return;
}

function loop() {
    if (collided) {
        endOfGame();
        return;
    }

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    bg.draw();
    fg.draw();
    score.draw();

    //bird mechanics
    velocityY += gravity;
    y = Math.max(y + velocityY, 0);
    bird.draw(x, y);

    if (y > cvs.height) {
        collided = true;
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        pipe.draw(pipe.x);

        if (detectCollision(pipe)) {
            collided = true;
        }

        if (!pipe.passed && x > pipe.x + pipe.w) {
            score.value += 0.5;
            pipe.passed = true;
        }
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
