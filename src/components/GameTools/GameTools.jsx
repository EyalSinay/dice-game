import React from 'react';
import GameOptions from './GameOptions';
import Dice from './Dice';

class GameTools extends React.Component {


  getDiceResult = (diceResult) => {
    this.props.getDiceResult(diceResult);
  }

  render() {
    return (
      <div className='game-tools-container'>
        <GameOptions onResetGameClick={this.props.onResetGameClick} onNewGameClick={this.props.onNewGameClick} />
        <Dice getDiceResult={this.props.getDiceResult}/>
        <button className='hold-btn' onClick={this.props.onHoldClick}>HOLD</button>
      </div>
    )
  }
}

export default GameTools;
