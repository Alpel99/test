let myBox
let myPiece
let points

function setup() {
	createCanvas(canvasWidth, canvasHeight)
	platform = new Platform()
	generateNewPiece()
	setInterval( () => applyGravity(), timer)
	points = startingPoints
}

function draw() {
	background(backgroundColor)
	platform.show()
	myPiece.show()
	drawText(points)
}
 
let applyGravity = () => {
	if(!myPiece.canCollide(box => box.y + boxDimension === height) && !platform.piecesColliding(myPiece)) {
		myPiece.y += boxDimension
		}
	else {			
		myPiece.canCollide(box => box.y === begginingPoint) ? setup() : platform.placePiece(myPiece); setTimeout(applyGravity, 100); platform.cleanFilledRows(); generateNewPiece() //Colliding on top of the screen
	}
}	

let generateNewPiece = () => {
    let index = Math.floor((Math.random() * pieces.length))
    let indexColor = Math.floor((Math.random() * colors.length))
    myPiece = new Piece(pieces[index], width / 2, -boxDimension * marginPieceBeginning, colors[indexColor])
	if (timer < 200) {
		timer -= 0,1
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		myPiece.rotationMovement()
	}
	if (keyCode === LEFT_ARROW && !myPiece.canCollide(box => box.x === begginingPoint) && !platform.piecesColliding(myPiece, (rect1, rect2) => rectCollision(rect1, rect2), (box) => box.x -= boxDimension)){
		myPiece.x -= boxDimension
	}
	if (keyCode === RIGHT_ARROW && !myPiece.canCollide(box => box.x + boxDimension === width) && !platform.piecesColliding(myPiece, (rect1, rect2) => rectCollision(rect1, rect2), (box) => box.x += boxDimension)){
		myPiece.x += boxDimension
	}
	if (keyCode === DOWN_ARROW) {
		applyGravity()
	}
}


let drawText = (txt) => {
    textSize(16)
    textAlign(RIGHT)
    fill(255, 255, 255)
    text(txt, canvasWidth, boxDimension)
}
