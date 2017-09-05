// start slingin' some d3 here.
class ColliderGame {
  constructor() {
    this.NUM_ENEMIES = 20;
    this.init();
  }

  init() {
    this.drawEnemies();
    this.drawPlayer();
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
      console.log('DRAG!');
        d3.select(this)
        .attr('cx', d.x = d3.event.x)
        .attr('cy', d.y = d3.event.y);
  }
}

const game = new ColliderGame();

function dragPlayer(event) {
  console.log('drag detected');
};
