var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.textAlign = "center"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flip = false;
let started = false;
let start = 0;
let textColor = "white"
let shapeColor = "blue"
let title = "satisfying.js"
let count = 0;
let numBlocks = 45;
let squareWidth = canvas.width / numBlocks;
let squareHeight = canvas.height / numBlocks;

var buttons = []
var enterButton = new Button('ENTER', 'black', 'white', canvas.width / 2 - 100, canvas.height / 2 - 40, 200, 80)
enterButton.onClick = function () { return console.log('ENTERING SATISFYING.JS!'); };
buttons.push(enterButton);

if (!started) {
    animate();
}

function play() {
    if (!started) {
        animate();
    }
}

function tick() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    ctx.font = "100px Lucida Console";
    ctx.font = "100px Georgia, serif";
    ctx.fillText(title, canvas.width / 2, canvas.height / 3);

    // Paint objects
    ctx.fillStyle = shapeColor;

    ctx.globalAlpha = (!flip ? 1.0 : 0.0);

    for (currCount = count; currCount >= 0; currCount--) {
        ctx.globalAlpha += (!flip ? -0.075 : 0.075);
        ctx.globalAlpha = Math.max(0, ctx.globalAlpha);
        ctx.globalAlpha = Math.min(1, ctx.globalAlpha);

        if (flip && currCount <= count - 10) {
            ctx.globalAlpha = 0.0;
        }

        colorIndex = currCount % 6;
        switch(colorIndex) {
            case 0: ctx.fillStyle = "red"; break;
            case 1: ctx.fillStyle = "orange"; break;
            case 2: ctx.fillStyle = "yellow"; break;
            case 3: ctx.fillStyle = "green"; break;
            case 4: ctx.fillStyle = "blue"; break;
            case 5: ctx.fillStyle = "purple"; break;
        }
        for (i = 0; i <= currCount; i++) {
            for (j = 0; j <= currCount; j++) {
                if (i == j) {
                    ctx.fillRect((currCount - i) * squareWidth, j * squareHeight, squareWidth, squareHeight);
                    ctx.fillRect((numBlocks - (currCount - i) - 1) * squareWidth, j * squareHeight, squareWidth, squareHeight);
                    ctx.fillRect((currCount - i) * squareWidth, (numBlocks - j - 1) * squareHeight, squareWidth, squareHeight);
                    ctx.fillRect((numBlocks - (currCount - i) - 1) * squareWidth, (numBlocks - j - 1) * squareHeight, squareWidth, squareHeight);
                }
            }
        }
    }

    ctx.globalAlpha = 1.0;
    
    buttons.forEach(function (b) { return b.draw(ctx); });
}

function animate(timestamp) {
    started = true

    const elapsed  = timestamp - start;
    if (elapsed > 1) {
        start = timestamp;
        tick();
    }

    requestAnimationFrame(animate);  
}

window.onload = function() {
    // Code to execute when the page has fully loaded
    const timer = setInterval(() => {
        count += (!flip ? 1 : -1);
        play();
        if (count >= numBlocks + 3) {
            flip = true;
        } 
        if (count == 0) {
            flip = false;
        }
    }, 100);
};

canvas.addEventListener('click', function (event) {
    var x = event.pageX - (canvas.clientLeft + canvas.offsetLeft);
    var y = event.pageY - (canvas.clientTop + canvas.offsetTop);
    buttons.forEach(function (b) {
        if (b.inBounds(x, y) && !!b.onClick)
            b.onClick();
    });
});