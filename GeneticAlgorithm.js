

function NextGeneration()
{
  console.log('New Generation');
  CalcuateFitness();

  for (let i = 0; i < initPopulation; i++) {
    birds[i] = GatherParentAgent();
  }
  birdsBackUp = [];
}

function GatherParentAgent()
{
  var index = 0;
  var r = random(1);

  while(r > 0)
  {
    r = r - birdsBackUp[index].fitness;
    index++;
  }
  index--;

  let parent = birdsBackUp[index];
  let child = new Bird(parent.brain);
  child.mutate();
  return child;
}

function CalcuateFitness()
{
  let sum = 0;
  for(let bird of birdsBackUp)
  {
    sum += bird.score;
  }

  for(let bird of birdsBackUp)
  {
    bird.fitness = bird.score / sum;
  }
}
