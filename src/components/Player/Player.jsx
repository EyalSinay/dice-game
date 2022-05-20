import "./Player.style.css";
import React from 'react';

class Player extends React.Component {
    render() {
        return (
            <div className='player-container' data-turn={this.props.currenTurn}>
                <h2 className="player-title">{this.props.playerName + ":"}</h2>
                <h3>Total Score:</h3>
                <h4>{this.props.totalScore}</h4>
                <h3>Current:</h3>
                <h4>{this.props.currentScore}</h4>
            </div>
        )
    }
}

export default Player;
