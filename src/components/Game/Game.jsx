import React from 'react';
import Player from '../Player/Player';
import GameTools from '../GameTools/GameTools';

class Game extends React.Component {
    state = { playersObjArr: []};

    componentDidMount(){
        const arr = [];
        const numPlayers = Number(this.props.numOfPlayers);
        // if(numPlayers === 1){
        //     numPlayers = numPlayers + 1;
        // }
        for (let i = 1; i <= numPlayers; i++){
            arr.push({currentScore: 0, totalScore: 0, currenTurn: (i === 1)});
        }
        this.setState({playersObjArr: [...arr]});
    }

    getDiceResult = (diceResult) => {
        const currentPlayerIndex = this.state.playersObjArr.findIndex(player => player.currenTurn);
        this.setState(prev => (this.state.playersObjArr[currentPlayerIndex].currentScore = prev.playersObjArr[currentPlayerIndex].currentScore + diceResult));
    }

    render() {
        console.log(this.state);
        return (
            <div className={`game-container num-of-players-${this.props.numOfPlayers}`}>
                {this.state.playersObjArr.map((player, index) => {
                 return (<Player
                 key={index}
                 currentScore={player.currentScore}
                 totalScore={player.totalScore}
                 playerName={`Player${index+1}`}
                 />)})}
                <GameTools callBackFunction={this.getDiceResult} />
            </div>
        );
    }
}

export default Game;
