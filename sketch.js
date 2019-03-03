const initPopulation = 100;
var birds = [];
var pipes = [];

function setup() {
  createCanvas(640, 480);

  for (let i = 0; i < initPopulation; i++) {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    for (let b = birds.length - 1; b >= 0; b--) {
      if (pipes[i].hits(birds[b])) {
        birds.splice(b,1);
      }
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

for (let bird of birds) {
  bird.think(pipes);
  bird.update();
  bird.show();

}

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

  //
// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
//}
