var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

const size = 30;
ctx.fillStyle = 'blue';

let squares = [];
let started = false;
let start = 0;

function play() {
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

  squares = squares.map(x => x += size) // move x to right
      .filter(x => x < canvas.width);  // remove when at end
}

function animate(timestamp) {
    //const elapsed  = timestamp - start;
    //if (elapsed > 20) {
    //start = timestamp;
    tick();
    //}
    requestAnimationFrame(animate);  
}