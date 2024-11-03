var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

let x = 0;
const size = 30;
const id = setInterval(() => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(x, 50, size, size);
    x += size;

    if (x >= c.width) {
        clearInterval(id);
    }
}, 200);  