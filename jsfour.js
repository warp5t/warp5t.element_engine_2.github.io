let purpleX = 150;
let purpleY = 150;
let radPurple = 29;

let pointX, pointY; // coordinate of click

let colorSet = ['lime', 'blue', 'yellow'];
let color = 0;

let distanceFromCenter;

let message = " ";

let toRight = false;
let toLeft = false;
let toUp = false;
let toDown = false;

let basePixelsX;
let basePixelsY;

let limitCooficentX = 2;
let limitCooficentY = 2;

let calcCooficentX;
let calcCooficentY;

let calcPointX;
let calcPointY;


window.addEventListener('keyup', keyUpBool, false);
window.addEventListener('keydown', keyMoveX, false);
window.addEventListener('keydown', keyMoveY, false);


document.querySelector("#R").addEventListener('mousedown', buttonRight);
document.querySelector("#L").addEventListener('mousedown', buttonLeft);
document.querySelector("#U").addEventListener('mousedown', buttonUp);
document.querySelector("#D").addEventListener('mousedown', buttonDown);

document.querySelector("#R").addEventListener('mouseup', abortRight);
document.querySelector("#L").addEventListener('mouseup', abortLeft);
document.querySelector("#U").addEventListener('mouseup', abortUp);
document.querySelector("#D").addEventListener('mouseup', abortDown);



// --------------------------------- drawing circle -----------------------------------------
let draw = function() {

    let canv = document.getElementById('canvas');
    let ctx = canv.getContext('2d');
    canv.addEventListener('mouseup', onDown, false);

    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.beginPath();
    ctx.arc(purpleX, purpleY, radPurple, 0 * Math.PI, 2 * Math.PI, false);
    ctx.fillStyle = colorSet[color];
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(purpleX, purpleY);
    ctx.lineTo(purpleX, canv.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(purpleX, purpleY);
    ctx.lineTo(canv.width, purpleY);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(0, purpleY);
    ctx.lineTo(purpleX, purpleY);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(purpleX, 0);
    ctx.lineTo(purpleX, purpleY);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.moveTo(pointX, pointY);
    ctx.lineTo(purpleX, purpleY);
    ctx.stroke();

    ctx.font = "15px Tahoma";
    ctx.fillStyle = "blue";
    ctx.fillText(`distanceFC:  ${distanceFromCenter}`, 30, 50);
    ctx.fillText(`pointX:  ${pointX}, pointY: ${pointY}`, 30, 70);
    ctx.fillText(`purpleX:  ${purpleX}`, 30, 90);
    ctx.fillText(`purpleY ${purpleY}`, 30, 110);
    ctx.fillText(`calcCooficentX:  ${calcCooficentX}`, 30, 130);
    ctx.fillText(`calcCooficentY: ${calcCooficentY}`, 30, 150);
    ctx.fillStyle = "red";
    ctx.fillText( message, 50, 370);

    movementUpgrade();
}
// ----------------------------- click mouse detection -------------------------------------
function onDown(e) {
    pointX = e.pageX; // coordinate of click
    pointY = e.pageY; // coordinate of click

    distanceFromCenter = Math.sqrt(Math.pow(purpleX - pointX, 2) + Math.pow(purpleY - pointY, 2));

    if (distanceFromCenter <= radPurple) {
        color++;
        message = "you got!!!";
        if (color > 2) {
            color = 0;
        }
    } else if (distanceFromCenter >= radPurple) {
        message = "click into the circle!!!";
    }
    purpleX = Math.round(purpleX);
    purpleY = Math.round(purpleY);

    directionMovement();
}




function directionMovement() {

    basePixelsX = pointX;
    basePixelsY = pointY;

    calcPointX = pointX;
    calcPointY = pointY;

    if (pointX > purpleX && pointY > purpleY) { // ++
        while (basePixelsY !== purpleY) {
            basePixelsX++;
            basePixelsY--;
        }
        basePixelsX = basePixelsX - purpleX;
        calcPointX = pointX - purpleX;
        calcCooficentX = (calcPointX * limitCooficentX) / basePixelsX;
        calcCooficentY = limitCooficentY - calcCooficentX;
        console.log('++ , calcCooficentX: ', calcCooficentX, 'calcCooficentY: ', calcCooficentY);

    } else if (pointX > purpleX && pointY < purpleY) { // +-
        while (basePixelsY !== purpleY) {
            basePixelsX++;
            basePixelsY++;
        }
        basePixelsX = basePixelsX - purpleX;
        calcPointX = pointX - purpleX;
        calcCooficentX = (calcPointX * limitCooficentX) / basePixelsX;
        calcCooficentY = limitCooficentY - calcCooficentX;
        console.log('+- , calcCooficentX: ', calcCooficentX, 'calcCooficentY: ', calcCooficentY);

    } else if (pointX < purpleX && pointY > purpleY) { // -+
        while (basePixelsX !== purpleX) {
            basePixelsX++;
            basePixelsY++;
        }

        basePixelsY = purpleY - basePixelsY;
        calcPointY = purpleY - pointY;
        calcCooficentY = (calcPointY * limitCooficentY) / basePixelsY;
        calcCooficentX = limitCooficentX - calcCooficentY;
        console.log('-+ , calcCooficentX: ', calcCooficentX, 'calcCooficentY: ', calcCooficentY);

    } else if (pointX < purpleX && pointY < purpleY) { // --

        while (basePixelsX !== purpleX) {
            basePixelsX++;
            basePixelsY--;
        }

        basePixelsY = purpleY - basePixelsY;
        calcPointY = purpleY - pointY;
        calcCooficentY = (calcPointY * limitCooficentY) / basePixelsY;
        calcCooficentX = limitCooficentX - calcCooficentY;
        console.log('-- , calcCooficentX: ', calcCooficentX, 'calcCooficentY: ', calcCooficentY);
    }
}

function movementUpgrade() {

    distanceFromCenter = Math.sqrt(Math.pow(purpleX - pointX, 2) + Math.pow(purpleY - pointY, 2));
    if (distanceFromCenter <= 2) {
        distanceFromCenter = 0;
    }
    if (pointX > purpleX && pointY > purpleY && distanceFromCenter !== 0) { // ++
        purpleX = purpleX + calcCooficentX;
        purpleY = purpleY + calcCooficentY;
        console.log(' ++');
    } else if (pointX > purpleX && pointY < purpleY && distanceFromCenter !== 0) { // +-
        purpleX = purpleX + calcCooficentX;
        purpleY = purpleY - calcCooficentY;
        console.log(' +-');
    } else if (pointX < purpleX && pointY > purpleY && distanceFromCenter !== 0) { // -+
        purpleX = purpleX - calcCooficentX;
        purpleY = purpleY + calcCooficentY;
        console.log(' -+');
    } else if (pointX < purpleX && pointY < purpleY && distanceFromCenter !== 0) { // --
        purpleX = purpleX - calcCooficentX;
        purpleY = purpleY - calcCooficentY;
        console.log(' --');
    } else if (pointX > purpleX && pointY === purpleY && distanceFromCenter !== 0) {
        purpleX = purpleX + calcCooficentX;
        console.log('check 4');
    } else if (pointX < purpleX && pointY === purpleY && distanceFromCenter !== 0) {
        purpleX = purpleX - limitCooficentX; 
        console.log('check 3');
    } else if (pointY > purpleY && pointX === purpleX && distanceFromCenter !== 0) {
        purpleY = purpleY + limitCooficentY;
        console.log('check 2');
    } else if (pointY < purpleY && pointX === purpleX && distanceFromCenter !== 0) {
        purpleY = purpleY - limitCooficentY;
        console.log('check 1');
    }

}




//---------------------------- terms of movements ----------------------------------
function moveUp() {
    purpleY = purpleY - 2;
}

function moveDown() {
    purpleY = purpleY + 2;
}

function moveRight() {
    purpleX = purpleX + 2;
}

function moveLeft() {
    purpleX = purpleX - 2;
}

//---------------------------- movement for keyboard buttons ----------------------------------

function keyMoveX(e) {
    purpleX = Math.round(purpleX);
    pointX = undefined;

    if (e.keyCode === 39) {
        toRight = true;
    } else if (e.keyCode === 37) {
        toLeft = true;
        console.log('toLeft: ', toLeft);
    }
}

function keyMoveY(e) {
    purpleY = Math.round(purpleY);
    pointY = undefined;

    if (e.keyCode === 38) {
        toUp = true;
        console.log('toUp: ', toUp);
    } else if (e.keyCode === 40) {
        toDown = true;
    }
}

function keyUpBool(e) {
    if (e.keyCode === 39) {
        toRight = false;
    } else if (e.keyCode === 37) {
        toLeft = false;
    } else if (e.keyCode === 38) {
        toUp = false;
    } else if (e.keyCode === 40) {
        toDown = false;
    }
}

//---------------------------- movement for brauser buttons ----------------------------------
function buttonRight() {
toRight = true;
}

function buttonLeft() {
toLeft = true;
}

function buttonUp() {
toUp = true;
}

function buttonDown() {
toDown = true;
}


function abortRight() {
toRight = false;
}

function abortLeft() {
toLeft = false;
}

function abortUp() {
toUp = false;
console.log(toUp, ' toUp');
}

function abortDown() {
toDown = false; 
console.log(toDown," toDown");
}

//----------------------------- terms of movements ---------------------------------------- 
function moveWithoutDelay() {
    if (toRight === true && toUp === false && toDown === false) {
        moveRight();
    } else if (toLeft === true && toUp === false && toDown === false) {
        moveLeft();
    } else if (toUp === true && toLeft === false && toRight === false) {
        moveUp();
    } else if (toDown === true && toLeft === false && toRight === false) {
        moveDown();
    } else if (toRight === true && toUp === true) {
        moveRight();
        moveUp();
    } else if (toRight === true && toDown === true) {
        moveRight();
        moveDown();
    } else if (toLeft === true && toUp === true) {
        moveLeft();
        moveUp();
    } else if (toLeft === true && toDown === true) {
        moveLeft();
        moveDown();
    }
}

function engine() {
    draw();
    moveWithoutDelay();
}

setInterval(engine, 60);