import React from 'react';
import './Game.css';
import GameArea from '../GameArea/GameArea';
import {
  shiftMatrixRight,
  shiftMatrixLeft,
  shiftMatrixDown,
  shiftMatrixUp
} from '../../matrix_shift.js';

// There 20% / 80% chance to get 4 / 2
const NEW_TILE_SAMPLE = [4, 2, 2, 2];

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      score: 0,
      tiles: [
	[null, null, null, null],
	[null, null, null, null],
	[null, null, null, null],
	[null, null, null, null]
      ]
    };
    this.generateInitialTiles = this.generateInitialTiles.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // TODO: should this be set as initial state?
    this.generateInitialTiles();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
	this.setState((state) => {
	  let [newTiles, newScore] = shiftMatrixUp(this.state.tiles, this.state.score);
	  return { score: newScore, tiles: newTiles };
	});
	break;
      case 'ArrowDown':
	this.setState((state) => {
	  let [newTiles, newScore] = shiftMatrixDown(this.state.tiles, this.state.score);
	  return { score: newScore, tiles: newTiles };
	});
	break;
      case 'ArrowLeft':
	this.setState((state) => {
	  let [newTiles, newScore] = shiftMatrixLeft(this.state.tiles, this.state.score);
	  return { score: newScore, tiles: newTiles };
	});
	break;
      case 'ArrowRight':
	this.setState((state) => {
	  let [newTiles, newScore] = shiftMatrixRight(this.state.tiles, this.state.score);
	  return { score: newScore, tiles: newTiles };
	});
	break;
    }
  }

  generateInitialTiles() {
    let tiles = this.state.tiles;
    let freeTiles = [];

    // Two dimensional array of free [rowIdx, colIdx] within tiles
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[0].length; j++) {
	freeTiles.push([i, j]);
      }
    }

    // Pop a random tile from free tiles
    for (let i = 0; i < 2; i++) {
       let chosenTile = freeTiles.splice(this.randomPositiveInteger(freeTiles.length), 1)[0];

       tiles[chosenTile[0]][chosenTile[1]] = this.randomTileValue();
    }

    this.setState({tiles: tiles});
  }

  // TODO: consider using underscore prefix for all private methods
  randomPositiveInteger(upperExcludedBound) {
    return Math.floor(Math.random() * upperExcludedBound);
  }

  randomTileValue() {
    let tileValueIdx = this.randomPositiveInteger(NEW_TILE_SAMPLE.length);

    return NEW_TILE_SAMPLE[tileValueIdx];
  }

  render() {
    // TODO: add the score and personal record components here
    return (
      <div className='game' key='1'>
	<GameArea tiles={this.state.tiles} />
      </div>
    );
  }
}

export default Game;
