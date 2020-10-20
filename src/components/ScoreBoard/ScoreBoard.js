import React from 'react';
import 'components/ScoreBoard/ScoreBoard.css';

class ScoreBoard extends React.Component {
  state = {
    score: 0,
    highScore: 0
  }

  render() {
    return (
      <div className='scoreboard' key='scoreboard'>
	<div className='scoreboard-element' key='score'>
	  <div className='scoreboard-element-label'>SCORE</div>
	  <div className='scoreboard-element-score'>{ this.props.score }</div>
	</div>

	<div className='scoreboard-element' key='highscore'>
	  <div className='scoreboard-element-label'>HIGHSCORE</div>
	  <div className='scoreboard-element-score'>{ this.props.highScore }</div>
	</div>
      </div>
    );
  }
}

export default ScoreBoard;
