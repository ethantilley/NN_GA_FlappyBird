

function NextGeneration()
{
  CalcuateFitness();

  for (let i = 0; i < initPopulation; i++) {
    birds[i] = GatherParentAgent();
  }
  birdsBackUp = [];
}

function GatherParentAgent()
{
  let parent = random(birdsBackUp);
  let child = new Bird(parent.brain);
  child.mutate();
  return child;
}

function CalcuateFitness()
{
  let sum = 0;
  for(let bird of birds)
  {
    sum += bird.score;
  }

  for(let bird of birds)
  {
    bird.fitness = bird.score / sum;
  }
}
