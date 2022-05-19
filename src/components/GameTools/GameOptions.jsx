import React from 'react';

class GameOptions extends React.Component {



  render(){
    return(
      <div className='game-options-container'>
        <button onClick={this.props.onNewGameClick}>New Game</button>
        <button onClick={this.props.onResetGameClick}>Reset Game</button>
      </div>
    )
  }
}

export default GameOptions;
