// create the canvas

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 700

const gameboard = new Image()
gameboard.src = './images/road.png'

gameboard.onload = function(){
  ctx.drawImage(gameboard, 0, 0, canvas.width, canvas.height)
}

// add car to the board 
let car = new Image()
car.src = './images/car.png'
car.onload = function (){
  blueCar.draw()
}

// create class for car
class Player{
  constructor(img, x, y, w, h){
    this.img = img
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}

// add car to player class
let blueCar = new Player(car, canvas.width/2-25, canvas.height-105, 50, 100)

// key functions 
window.onkeydown = function(e){
  if(e.key === 'ArrowLeft'){
    blueCar.x -= 10
  }
  if (e.key === 'ArrowRight') {
    blueCar.x += 10
}
}

class Obstacle{
  constructor(x, y, w, h, color){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
  }
  draw = () => {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  move = () => {
    this.y += 3
    this.draw()
  }
}

const obstacles = []

setInterval(() => {
  let obs = new Obstacle(
    Math.random() * canvas.width,
    0,
    Math.random() * 100,
    10,
    "orange"
  );
  obstacles.push(obs)
}, 800)

let animateId = null

function animate(){
  requestAnimationFrame(animate)

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gameboard, 0, 0, canvas.width, canvas.height);

  blueCar.draw();

  for (let obs of obstacles) {
    obs.move();
    detectCollision(obs, blueCar);
  }
}

function detectCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    // collision detected!
    // console.log("collision");
    cancelAnimationFrame(animatedId);
  } 
}

animate()

// window.onload = () => {
//   document.getElementById('start-button').onclick = () => {
//     startGame();
//   };

//   function startGame() {
//   }
// };
