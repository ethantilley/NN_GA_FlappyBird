const initPopulation = 100;
let birds = [];
let birdsBackUp = [];
let pipes = [];
let counter = 0;
let slider;

// called on initialization of script
function setup() {
  createCanvas( 640, 480 );

  // creating a slider to control the speed of the game (to quicken training)
  slider = createSlider( 1, 100, 1 );

  // Spawn the initial batch of agents
  for ( let i = 0; i < initPopulation; i++ ) {
    birds[ i ] = new Bird();
  }
}

// Called every frame
function draw() {

  // Quick for loop to speed up training.
  for ( let n = 0; n < slider.value(); n++ ) {

    // if time has passed, creat a new pipe.
    if ( counter % 75 == 0 ) {
      pipes.push( new Pipe() );

    }
    counter++;

    for ( var i = pipes.length - 1; i >= 0; i-- ) {
      pipes[ i ].update();

      for ( let b = birds.length - 1; b >= 0; b-- ) {
        if ( pipes[ i ].hits( birds[ b ] ) ) {
          birdsBackUp.push( birds.splice( b, 1 )[ 0 ] );

        }
      }


      if ( pipes[ i ].offscreen() ) {
        pipes.splice( i, 1 );
      }
    }

    for ( let i = birds.length - 1; i >= 0; i-- ) {
      if ( birds[ i ].offScreen() ) {
        birdsBackUp.push( birds.splice( i, 1 )[ 0 ] );

      }
    }

    for ( let bird of birds ) {
      bird.think( pipes );
      bird.update();

    }

    if ( birds.length === 0 ) {
      counter = 0;
      pipes = [];
      //pipes.push(new Pipe());
      NextGeneration();
    }
  }


  // All the display
  background( 0 );

  for ( let bird of birds ) {
    bird.show();

  }
  for ( let pipe of pipes ) {
    pipe.show();

  }

}

//
// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
//}
