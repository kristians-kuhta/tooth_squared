import React from 'react';
import './Board.css';

const NUMBER_OF_TILE_COLORS = 11;

class Board extends React.Component {

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
    let tiles = this.props.tiles;
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
    return <div className="tiles">{ this.tileElements() }</div>;
  }
}

export default Board;
