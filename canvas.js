var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = 'blue';

let squares = [];
let started = false;
let start = 0;
let size = 50;
let speed = 10;

function play() {
    red = parseInt(document.getElementById("red").value);
    green = parseInt(document.getElementById("green").value);
    blue = parseInt(document.getElementById("blue").value);
    
    size = parseInt(document.getElementById("size").value);
    speed = parseInt(document.getElementById("speed").value);

    if (red >= 0 && red <= 255 && green >=0 && green <= 255 && blue >= 0 && blue <= 255) {
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 1.0)`
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
    squares.forEach(x => ctx.fillRect(x, 50, size, size));
    squares = squares.map(x => x += speed) // move x to right
        .filter(x => x < canvas.width);  // remove when at end

}

function animate(timestamp) {
    const elapsed  = timestamp - start;
    if (elapsed > 1) {
        start = timestamp;
        tick();
    }
    requestAnimationFrame(animate);  
}