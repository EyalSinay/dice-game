import React from 'react';
import Game from '../Game/Game'
import Options from '../Options/Options';

class Main extends React.Component {
    state = {numOfPlayers: "1", numOfScore: "100", gameDisplay: true} // !{numOfPlayers: null, numOfScore: null, gameDisplay: false}

    onOptionsSubmit = (__numOfPlayers, __numOfScore) => {
        this.setState(pre => ({
            numOfPlayers: __numOfPlayers,
            numOfScore: __numOfScore ? __numOfScore : 100,
            gameDisplay: !pre.gameDisplay
        }));
    }

    render() {
        return (
            <div className='main-container'>
                {this.state.gameDisplay && <Game numOfPlayers={this.state.numOfPlayers} numOfScore={this.state.numOfScore}/>}
                {!this.state.gameDisplay && <Options callBackFunction={this.onOptionsSubmit}/>}
            </div>
        );
    }
}

export default Main;
