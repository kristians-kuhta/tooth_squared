import React from 'react';
import './Game.css';
import GameArea from '../GameArea/GameArea';

class Game extends React.Component {
  constructor(props) {
    super(props);
    // Tiles to test the design
    this.state = { tiles: [
      [2048, 1024, 512, 256],
      [128, 64, 32, 16],
      [8, 4, 2, null],
      [null, null, null, null]
    ] };
  }

  render() {
    // TODO: add the score and personal record components here
    return (
      <div className='game' key='1' >
	<GameArea tiles={this.state.tiles} />
      </div>
    );
  }
}

export default Game;
