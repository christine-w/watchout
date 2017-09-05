// start slingin' some d3 here.
class ColliderGame {
  constructor() {
    this.NUM_ENEMIES = 20;
    this.highScore = 0;
    this.currentScore = 0;
    this.collisions = 0;
    this.init();
  }

  init() {
    this.drawPlayer();
    this.drawEnemies();
  }

  drawPlayer() {
    d3.select('#gameBoard').selectAll('#player').data([[25, 25]]).enter()
      .append('circle')
      .attr('id', 'player')
      .attr('r', 1)
      .attr('fill', 'blue')
      .attr('cx', 25)
      .attr('cy', 25)
      .attr("transform", "translate(" + 0 + "," + 0 + ")")
      .call(d3.behavior.drag().on('drag', this.dragPlayer));
  }

  dragPlayer(d) {
      d3.select(this)
      .attr('cx', d.x = d3.event.x)
      .attr('cy', d.y = d3.event.y);
  }

  drawEnemies() {
    const enemyPositions = [];

    for (let i = 0; i < this.NUM_ENEMIES; i++) {
      enemyPositions[i] = [Math.floor(Math.random()*50), Math.floor(Math.random()*50)];
    }
    d3.select('#gameBoard').selectAll('.enemy').data(enemyPositions).enter()
      .append('circle')
      .attr('class', (d) => 'enemy')
      .attr('r', (d) => 1);

    d3.select('#gameBoard').selectAll('.enemy').data(enemyPositions)
      .transition()
      .duration(500)
      .tween('score', this.detectCollision.bind(this))
      .ease('linear')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1]);

    this.updateScore();
    setTimeout(this.drawEnemies.bind(this), 1000);
  }

  detectCollision() {
    const player = d3.select('#player');
    const updateScoreFunction = this.updateScore.bind(this);

    return function() {
      const xDist = Number(player.attr('cx')) - Number(this.getAttribute('cx'));
      const yDist = Number(player.attr('cy')) - Number(this.getAttribute('cy'));
      const collision = Math.sqrt(xDist*xDist + yDist*yDist) < 2;

      if (collision) {
        updateScoreFunction(collision);
      }
    }
  }

  updateScore(collided = false) {
    if (collided) {
      this.collisions++;
      this.currentScore = 0;
      d3.select('.collisions > span').text(this.collisions);
      d3.select('.current > span').text('0');
    } else {
      d3.select('.current > span').text(++this.currentScore);
      if (this.highScore < this.currentScore) {
        this.highScore = this.currentScore;
        d3.select('.highscore > span').text(this.highScore);
      }
    }
  }
}

const game = new ColliderGame();

function dragPlayer(event) {
  console.log('drag detected');
};
