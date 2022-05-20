import React from 'react';

class GameOptions extends React.Component {



  render(){
    return(
      <div className='game-options-container'>
        <button className='game-options-btn' onClick={this.props.onNewGameClick}>New Game</button>
        <button className='game-options-btn' onClick={this.props.onResetGameClick}>Reset Game</button>
      </div>
    )
  }
}

export default GameOptions;
