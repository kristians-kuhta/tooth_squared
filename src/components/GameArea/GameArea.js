import React from 'react';
import './GameArea.css';

const NUMBER_OF_TILE_COLORS = 11;

class GameArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tiles: props.tiles };
  }

  // For now we define colors only up to 2^11=2048 tile,
  // therefore this function returns values in range [0, 11]
  tileColorIdx(value) {
    if (!value) {
      // TODO: consider if this should ever be the case
      return 0;
    }

    const twoToPowerOf = Math.log(value)/Math.log(2);

    if (twoToPowerOf === NUMBER_OF_TILE_COLORS) {
      return twoToPowerOf;
    } else {
      return twoToPowerOf % NUMBER_OF_TILE_COLORS;
    }
  }

  tileElements() {
    let tiles = this.state.tiles;
    let tileElements = [];

    for (let i = 0; i < tiles.length; i++) {
      for(let j = 0; j < tiles[i].length; j++) {
	let tileValue = tiles[i][j];

	tileElements.push(
	  <div className={"tile tile--color-" + this.tileColorIdx(tileValue)} key={i + '_' + j}>
	    { tileValue }
	  </div>
	);
      }
    }

    return tileElements;
  }

  render() {
    // TODO: add the score and personal record components here
    return <div className="tiles">{ this.tileElements() }</div>;
  }
}

export default GameArea;
