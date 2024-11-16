var Button = /** @class */ (function () {
    function Button(text, fillColor, textColor, x, y, width, height) {
        if (fillColor === void 0) { fillColor = '#ffffff'; }
        if (textColor === void 0) { textColor = '#000000'; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fillColor = fillColor;
        this.textColor = textColor;
    }
    Button.prototype.draw = function (c) {
        c.fillStyle = this.fillColor;
        c.roundRect(this.x, this.y, this.width, this.height, 10);
        c.font = '25px arial';
        c.lineWidth = 20;
        c.strokeStyle = this.textColor;
        c.stroke();
        c.fill()
        
        c.fillStyle = this.textColor;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = this.textColor;
        c.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
    };
    Button.prototype.inBounds = function (mouseX, mouseY) {
        return !(mouseX < this.x || mouseX > this.x + this.width || mouseY < this.y || mouseY > this.y + this.height);
    };
    return Button;
}());