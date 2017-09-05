// start slingin' some d3 here.
class ColliderGame {
  constructor() {
    this.NUM_ENEMIES = 20;
    this.enemyPositions = [];
    this.init();
    //document.getElementsByClassName('highscore')[0].classList.add('test');
  }

  init() {
    this.drawEnemies();
  }

  drawEnemies() {
    for (let i = 0; i < this.NUM_ENEMIES; i++) {
      this.enemyPositions[i] = [Math.floor(Math.random()*50), Math.floor(Math.random()*50)];
    }
    d3.select('svg').selectAll('circle').data(this.enemyPositions).enter()
      .append('circle')
      .attr('r', (d) => 1)
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1]);
  }
}

const game = new ColliderGame();
