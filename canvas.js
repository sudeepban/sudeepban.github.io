var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let squares = [];
let started = false;
let start = 0;
let size = 50;
let speed = 10;
let textColor = "black"
let shapeColor = "blue"
let title = "HELLO WORLD!"
let count = 0;
let numBlocks = 30;
let squareWidth = canvas.width / numBlocks;
let squareHeight = canvas.height / numBlocks;

if (!started) {
    animate();
}

function play() {
    console.log("here")
    red = parseInt(document.getElementById("red").value);
    green = parseInt(document.getElementById("green").value);
    blue = parseInt(document.getElementById("blue").value);
    
    size = parseInt(document.getElementById("size").value);
    speed = parseInt(document.getElementById("speed").value);

    if (red >= 0 && red <= 255 && green >=0 && green <= 255 && blue >= 0 && blue <= 255) {
        shapeColor = `rgba(${red}, ${green}, ${blue}, 1.0)`
    }

    // Add 0 as x value for object to start from the left.
    squares.push(0);

    if (!started) {
        animate();
    }
}

function tick() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Paint objects
    ctx.fillStyle = shapeColor;

    currCount = count;
    for (currCount = count; currCount >= count - 4; currCount--) {
        colorIndex = currCount % 6
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

    ctx.fillStyle = textColor;
    ctx.font = "100px Lucida Console";
    ctx.fillText(title, (canvas.width / 2) - (ctx.measureText(title).width / 2), canvas.height / 2);

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
    console.log("Page is fully loaded!"); 

    const timer = setInterval(() => {
        count++;
        console.log(count);
        play();
        if (count >= numBlocks * 2) {
            count = 0;
        }
    }, 100);
};
