// Use window.requestAnimationFrame directly
var canvas = document.getElementById("space");
var canvasContext = canvas.getContext("2d");

var numStars = 1900;
var radius = '0.' + Math.floor(Math.random() * 9) + 1;
var focalLength = canvas.width * 2;
var warp = 0;
var centerX, centerY;

var stars = [], currentStar;
var index;

var dx = 0, dy = 0;  // Initialize variables for direction change

var animate = true;

function initializeStars() {
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  stars = [];
  for(index = 0; index < numStars; index++){
    currentStar = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: parseFloat('0.' + Math.floor(Math.random() * 99) + 1)
    };
    stars.push(currentStar);
  }
}

function moveStars() {
  for(index = 0; index < numStars; index++) {
    currentStar = stars[index];
    currentStar.z -= (currentStar.z / canvas.width);
    currentStar.x += dx;  // change in x-direction
    currentStar.y += dy;  // change in y-direction

    if(currentStar.z <= 0 || currentStar.x < 0 || currentStar.y < 0 || currentStar.x > canvas.width || currentStar.y > canvas.height){
      currentStar.z = canvas.width;
      currentStar.x = Math.random() * canvas.width;
      currentStar.y = Math.random() * canvas.height;
    }
  }
}

function drawStars() {
  var pixelX, pixelY, pixelRadius;

  if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }
  if(warp === 0) {
    canvasContext.fillStyle = "rgba(0, 10, 20, 1)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  }
  canvasContext.fillStyle = "rgba(209, 255, 255, " + radius + ")";
  for(index = 0; index < numStars; index++) {
    currentStar = stars[index];
    
    pixelX = (currentStar.x - centerX) * (focalLength / currentStar.z);
    pixelX += centerX;
    pixelY = (currentStar.y - centerY) * (focalLength / currentStar.z);
    pixelY += centerY;
    pixelRadius = 1 * (focalLength / currentStar.z);
    
    canvasContext.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    canvasContext.fillStyle = "rgba(209, 255, 255, " + currentStar.o + ")";
  }
}

function executeFrame() {
  if(animate)
    window.requestAnimationFrame(executeFrame);
  moveStars();
  drawStars();
}

canvas.addEventListener("click", function(e) {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  
  dx = 0;
  dy = 0;

  if(x < centerX && y < centerY) {
    dx = -1;
    dy = -1;
  } else if(x > centerX && y < centerY) {
    dx = 1;
    dy = -1;
  } else if(x < centerX && y > centerY) {
    dx = -1;
    dy = 1;
  } else {
    dx = 1;
    dy = 1;
  }
});

document.getElementById('warp').addEventListener("click", function(e) {
  window.warp = window.warp === 1 ? 0 : 1;
  window.canvasContext.clearRect(0, 0, window.canvas.width, window.canvas.height);
  executeFrame();
});

if(canvasContext === null) {
  alert("Canvas context is not supported.");
} else {
  executeFrame();
}
