class Bird {
  constructor( brain ) {

    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    if ( brain ) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork( 5, 8, 2 );
    }
  }

  show() {
    fill( 255 );
    ellipse( this.x, this.y, 32, 32 );
  }

  up() {
    this.velocity += this.lift;
  }

  think( pipes ) {

    let closest = null;
    let closestD = Infinity;
    for ( let i = 0; i < pipes.length; i++ ) {
      let d = ( pipes[ i ].x + pipes[ i ].x ) - this.x;

      if ( d < closestD && d > 0 ) {
        closest = pipes[ i ];
        closestD = d;
      }
    }

    // Creating inputs and assigning some knowledge for the agent to use.
    let inputs = [];
    inputs[ 0 ] = this.y / height;
    inputs[ 1 ] = closest.top / height;
    inputs[ 2 ] = closest.bottom / height;
    inputs[ 3 ] = closest.x / width;
    inputs[ 4 ] = this.velocity;

    // Creating the outputs and telling it to predict based on the known inputs
    let output = this.brain.predict( inputs );

    // If the agent things it should jump
    if ( output[ 0 ] > output[ 1 ] ) {
      // Then go for it
      this.up();
    }
  }

  /// Mutate this agents brain and give it a value for come leway for randomness (so it aint an exact copy)
  mutate() {
    this.brain.mutate( 0.1 );
  }

  /// Called to check if the agent is above or below the canvas area
  offScreen() {
    return ( this.y > height || this.y < 0 );
  }



  update() {
    // Increase the agents score as a reward for surviving
    this.score++;
    // Apply gravity to the agent
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

}