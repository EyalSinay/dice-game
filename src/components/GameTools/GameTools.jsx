import React from 'react';
import GameOptions from './GameOptions';
import Dice from './Dice';

class GameTools extends React.Component {


  getDiceResult = (diceResult) => {
    this.props.callBackFunction(diceResult);
  }

  render() {
    return (
      <div className='game-tools-container'>
        <GameOptions />
        <Dice callBackFunction={this.getDiceResult}/>
      </div>
    )
  }
}

export default GameTools;
