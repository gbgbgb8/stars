window.onload = function() {
  var canvas = document.getElementById("space");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvasContext = canvas.getContext("2d");

  var numStars = 1900;
  var focalLength = canvas.width * 2;
  var warp = 0;
  var centerX, centerY;

  var rocketX, rocketY;  // New variables for rocket position

  var stars = [];
  var index;

  var dx = 0, dy = 0;

  var animate = true;

  var spaceshipEmoji = "🚀";

  function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    rocketX = centerX;  // Initialize rocket position
    rocketY = centerY;

    stars = [];
    for(index = 0; index < numStars; index++){
      var currentStar = {
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
      var currentStar = stars[index];
      if(currentStar) {
        currentStar.x += dx;
        currentStar.y += dy;

        if(currentStar.x < 0 || currentStar.y < 0 || currentStar.x > canvas.width || currentStar.y > canvas.height){
          currentStar.x = Math.random() * canvas.width;
          currentStar.y = Math.random() * canvas.height;
        }
      }
    }
  }

  function drawStars() {
    var pixelX, pixelY, pixelRadius;

    if(canvas.width !== window.innerWidth || canvas.height !== window.innerHeight){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    }

    canvasContext.fillStyle = "rgba(0, 10, 20, 1)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    for(index = 0; index < numStars; index++) {
      var currentStar = stars[index];

      pixelX = (currentStar.x - rocketX) * (focalLength / currentStar.z);
      pixelX += rocketX;
      pixelY = (currentStar.y - rocketY) * (focalLength / currentStar.z);
      pixelY += rocketY;
      pixelRadius = 1 * (focalLength / currentStar.z);

      canvasContext.fillStyle = "rgba(209, 255, 255, " + currentStar.o + ")";
      canvasContext.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    }

    canvasContext.font = "32px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText(spaceshipEmoji, rocketX - 16, rocketY - 16);
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

    if(x < rocketX && y < rocketY) {
      dx = -1;
      dy = -1;
    } else if(x > rocketX && y < rocketY) {
      dx = 1;
      dy = -1;
    } else if(x < rocketX && y > rocketY) {
      dx = -1;
      dy = 1;
    } else {
      dx = 1;
      dy = 1;
    }
  });

  document.addEventListener('keydown', function(e) {
    dx = 0;
    dy = 0;
    
    switch (e.key) {
      case 'ArrowUp':
        dy = -1;
        break;
      case 'ArrowDown':
        dy = 1;
        break;
      case 'ArrowLeft':
        dx = -1;
        break;
      case 'ArrowRight':
        dx = 1;
        break;
    }
  });

  document.getElementById('w').addEventListener("click", function(e) {
    warp = warp === 1 ? 0 : 1;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  });

  initializeStars();
  executeFrame();
};
