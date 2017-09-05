// start slingin' some d3 here.
class ColliderGame {
  constructor() {
    this.NUM_ENEMIES = 20;
    this.init();
  }

  init() {
    const player = document.getElementById('player');

    this.drawEnemies();
  }

  drawEnemies() {
    const enemyPositions = [];

    d3.select('#gameBoard').selectAll('.enemy').data(enemyPositions).exit().remove();

    for (let i = 0; i < this.NUM_ENEMIES; i++) {
      enemyPositions[i] = [Math.floor(Math.random()*50), Math.floor(Math.random()*50)];
    }
    d3.select('#gameBoard').selectAll('.enemy').data(enemyPositions).enter()
      .append('circle')
      .attr('class', (d) => 'enemy')
      .attr('r', (d) => 1)
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1]);

    setTimeout(this.drawEnemies.bind(this), 1000);
  }

}

const game = new ColliderGame();
