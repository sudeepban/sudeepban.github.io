var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.textAlign = "center"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PageState = Object.freeze({
    INTRO: 0,
    ENTERED1: 1,
    ENTERED2: 2,
    SELECTION: 3
});

let flip = false;
let started = false;
let pageState = PageState.INTRO;
let enteredCount = 0;
let start = 0;
let textColor = "white"
let shapeColor = "blue"
let title = "satisfying.js"
let count = 0;
let numBlocks = 45;
let origSquareWidth = canvas.width / numBlocks;
let origSquareHeight = canvas.height / numBlocks;

var introButtons = []

var enterButton = new Button('ENTER', 'black', 'red', 'blue', 'white', canvas.width / 2 - 100, canvas.height / 2 - 40, 200, 80)
enterButton.onClick = function () {
    if (pageState == PageState.INTRO) {
        pageState = PageState.ENTERED1;
        enteredCount = 100;
        return console.log('ENTERING SATISFYING.JS!');
    }
};

introButtons.push(enterButton);

let selectedCategory = 'visuals';

// Category tab buttons
var tabY = 30;
var tabW = 190;
var tabH = 50;
var tabGap = 20;
var tabsTotal = 3 * tabW + 2 * tabGap;
var tabX0 = canvas.width / 2 - tabsTotal / 2;

var visualsTab = new Button('Visuals', '#222', '#444', '#555', 'white', tabX0, tabY, tabW, tabH, 17);
visualsTab.onClick = function () { selectedCategory = 'visuals'; };

var simulationsTab = new Button('Simulations', '#222', '#444', '#555', 'white', tabX0 + tabW + tabGap, tabY, tabW, tabH, 17);
simulationsTab.onClick = function () { selectedCategory = 'simulations'; };

var interactiveTab = new Button('Interactive Sims', '#222', '#444', '#555', 'white', tabX0 + 2 * (tabW + tabGap), tabY, tabW, tabH, 17);
interactiveTab.onClick = function () { selectedCategory = 'interactive'; };

var categoryTabs = [visualsTab, simulationsTab, interactiveTab];

// Per-category button sets
var contentY = canvas.height / 4;
var contentH = 200;
var contentW = 200;

var visualsButtons = [
    new Button('Bouncing Objects', 'black', 'red', 'blue', 'white', canvas.width / 4 - 100, contentY, contentW, contentH, 22),
    new Button('Bar Selection', 'black', 'red', 'blue', 'white', canvas.width / 2 - 100, contentY, contentW, contentH),
    new Button('Foo Selection', 'black', 'red', 'blue', 'white', 3 * canvas.width / 4 - 100, contentY, contentW, contentH)
];
visualsButtons[0].onClick = function () { console.log("Clicked Bouncing Objects!"); };
visualsButtons[1].onClick = function () { console.log("Clicked Bar Selection!"); };
visualsButtons[2].onClick = function () { console.log("Clicked Foo Selection!"); };

var simulationsButtons = [
    new Button('Sim A', 'black', 'red', 'blue', 'white', canvas.width / 4 - 100, contentY, contentW, contentH),
    new Button('Sim B', 'black', 'red', 'blue', 'white', canvas.width / 2 - 100, contentY, contentW, contentH)
];
simulationsButtons[0].onClick = function () { console.log("Clicked Sim A!"); };
simulationsButtons[1].onClick = function () { console.log("Clicked Sim B!"); };

var interactiveButtons = [
    new Button('Interactive A', 'black', 'red', 'blue', 'white', canvas.width / 4 - 100, contentY, contentW, contentH),
    new Button('Interactive B', 'black', 'red', 'blue', 'white', canvas.width / 2 - 100, contentY, contentW, contentH)
];
interactiveButtons[0].onClick = function () { console.log("Clicked Interactive A!"); };
interactiveButtons[1].onClick = function () { console.log("Clicked Interactive B!"); };

var categoryButtonSets = {
    'visuals': visualsButtons,
    'simulations': simulationsButtons,
    'interactive': interactiveButtons
};

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    origSquareWidth = canvas.width / numBlocks;
    origSquareHeight = canvas.height / numBlocks;

    enterButton.x = canvas.width / 2 - 100;
    enterButton.y = canvas.height / 2 - 40;

    var newTabX0 = canvas.width / 2 - tabsTotal / 2;
    visualsTab.x = newTabX0;
    simulationsTab.x = newTabX0 + tabW + tabGap;
    interactiveTab.x = newTabX0 + 2 * (tabW + tabGap);

    var newContentY = canvas.height / 4;
    [visualsButtons, simulationsButtons, interactiveButtons].forEach(function (set) {
        set[0].x = canvas.width / 4 - 100;  set[0].y = newContentY;
        set[1].x = canvas.width / 2 - 100;  set[1].y = newContentY;
        if (set[2]) { set[2].x = 3 * canvas.width / 4 - 100; set[2].y = newContentY; }
    });
}

window.addEventListener('resize', handleResize);

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

    if (pageState < PageState.SELECTION) {
        handleIntro();
    } else {
        handleSelection();
    }
}

function handleIntro() {
    buttons = introButtons;

    if (pageState == PageState.ENTERED1 || pageState == PageState.ENTERED2) {
        ctx.globalAlpha = 1.0 * enteredCount / 100;
    }

    if (pageState != PageState.ENTERED2) {
        ctx.fillStyle = textColor;
        ctx.font = "100px Lucida Console";
        ctx.font = "100px Georgia, serif";
        ctx.fillText(title, canvas.width / 2, canvas.height / 3);
    }

    // Paint objects
    ctx.fillStyle = shapeColor;

    ctx.globalAlpha = (!flip ? 1.0 : 0.0);

    if (pageState != PageState.ENTERED2) {
        if (pageState == PageState.ENTERED1) {
            squareWidth = (enteredCount / 100) * origSquareWidth;
            squareHeight = (enteredCount / 100) * origSquareHeight;
        } else {
            squareWidth = origSquareWidth;
            squareHeight = origSquareHeight;
        }

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
                        ctx.fillRect((currCount - i) * origSquareWidth, j * origSquareHeight, squareWidth, squareHeight);
                        ctx.fillRect((numBlocks - (currCount - i) - 1) * origSquareWidth, j * origSquareHeight, squareWidth, squareHeight);
                        ctx.fillRect((currCount - i) * origSquareWidth, (numBlocks - j - 1) * origSquareHeight, squareWidth, squareHeight);
                        ctx.fillRect((numBlocks - (currCount - i) - 1) * origSquareWidth, (numBlocks - j - 1) * origSquareHeight, squareWidth, squareHeight);
                    }
                }
            }
        }
    }

    ctx.globalAlpha = 1.0;
    
    if (pageState == PageState.ENTERED1 || pageState == PageState.ENTERED2) {
        ctx.globalAlpha = 1.0 * enteredCount / 100;
    }

    if (pageState != PageState.ENTERED2) {
        introButtons.forEach(function (b) { return b.draw(ctx); });
    }

    if (pageState == PageState.ENTERED1) {
        if (enteredCount != 0) {
            enteredCount--;
        } else {
            pageState = PageState.ENTERED2;
        }
    }

    if (pageState == PageState.ENTERED2) {
        enteredCount++;
        if (enteredCount >= 100) {
            pageState = PageState.SELECTION;
            console.log("GOT TO SELECTION")
        }
    }
}

function handleSelection() {
    var currentContent = categoryButtonSets[selectedCategory];
    buttons = categoryTabs.concat(currentContent);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw active tab underline indicator
    var activeTab = { 'visuals': visualsTab, 'simulations': simulationsTab, 'interactive': interactiveTab }[selectedCategory];
    ctx.fillStyle = 'white';
    ctx.fillRect(activeTab.x, activeTab.y + activeTab.height + 4, activeTab.width, 3);

    categoryTabs.forEach(function (b) { return b.draw(ctx); });
    currentContent.forEach(function (b) { return b.draw(ctx); });
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

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    buttons.forEach(function (b) {
        if (mouseX > b.x && mouseX < b.x + b.width && mouseY > b.y && mouseY < b.y + b.height) {
            if (mouseDown == 0) {
                b.color = b.hoverColor;
            }
        } else {
            b.color = b.fillColor;
        }
    });
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    buttons.forEach(function (b) {
        if (mouseX > b.x && mouseX < b.x + b.width && mouseY > b.y && mouseY < b.y + b.height) {
            b.color = b.pressColor;
        }
    });
});

canvas.addEventListener('mouseup', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    buttons.forEach(function (b) {
        if (mouseX > b.x && mouseX < b.x + b.width && mouseY > b.y && mouseY < b.y + b.height) {
            b.color = b.hoverColor;
        }
    });
});

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}