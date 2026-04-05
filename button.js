var Button = /** @class */ (function () {
    function Button(text, fillColor, hoverColor, pressColor, textColor, x, y, width, height, fontSize) {
        if (fillColor === void 0) { fillColor = '#ffffff'; }
        if (textColor === void 0) { textColor = '#000000'; }
        if (fontSize === void 0) { fontSize = 25; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fillColor = fillColor;
        this.hoverColor = hoverColor;
        this.pressColor = pressColor;
        this.textColor = textColor;
        this.fontSize = fontSize;
        this.color = this.fillColor;
        this.hoverState = 0;
        this.xAdj = 0;
        this.yAdj = 0;
    }
    Button.prototype.draw = function (c) {
        if (this.color == this.hoverColor) {
            if (this.hoverState == 0) {
                this.xAdj = 2;
                this.yAdj = 0;
            } else if (this.hoverState == 1) {
                this.xAdj = -2;
                this.yAdj = 0;
            } else if (this.hoverState == 2) {
                this.xAdj = 0;
                this.yAdj = -2;
            } else if (this.hoverState == 3) {
                this.xAdj = 0;
                this.yAdj = 2;
            }
        } else {
            this.xAdj = 0;
            this.yAdj = 0;
        }
        c.beginPath();
        c.fillStyle = this.color;
        c.roundRect(this.x + this.xAdj, this.y + this.yAdj, this.width, this.height, 10);
        c.font = this.fontSize + 'px arial';
        c.lineWidth = 20;
        c.strokeStyle = this.textColor;
        c.stroke();
        c.fill()
        
        c.fillStyle = this.textColor;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        var words = this.text.split(' ');
        var lines = [];
        var line = '';
        for (var i = 0; i < words.length; i++) {
            var testLine = line ? line + ' ' + words[i] : words[i];
            if (c.measureText(testLine).width > this.width - 20 && line) {
                lines.push(line);
                line = words[i];
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        var lineHeight = this.fontSize * 1.3;
        var startY = this.y + this.yAdj + this.height / 2 - (lines.length - 1) * lineHeight / 2;
        for (var i = 0; i < lines.length; i++) {
            c.fillText(lines[i], this.x + this.xAdj + this.width / 2, startY + i * lineHeight);
        }
        this.hoverState++;
        if (this.hoverState == 4) {
            this.hoverState = 0;
        }
    };
    Button.prototype.inBounds = function (mouseX, mouseY) {
        return !(mouseX < this.x || mouseX > this.x + this.width || mouseY < this.y || mouseY > this.y + this.height);
    };
    return Button;
}());