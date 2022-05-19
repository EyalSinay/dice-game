import React from 'react';
import './Dice.css'

class Dice extends React.Component {
    state = {dice1: null, dice2: null};

    onDiceContainerClick = () => {
        const getRandomNum = () => (Math.floor(Math.random()*6) + 1);
        const newNum1 = getRandomNum();
        const newNum2 = getRandomNum();
        this.setState({dice1: newNum1, dice2: newNum2}, this.props.callBackFunction(newNum1 + newNum2));
    }

  render(){
    return(
      <div className='dice-container' onClick={this.onDiceContainerClick}>
        <div className={`dice num-of-dice-${this.state.dice1}`} ></div>
        <div className={`dice num-of-dice-${this.state.dice2}`} ></div>
      </div>
    );
  }
}

export default Dice;
