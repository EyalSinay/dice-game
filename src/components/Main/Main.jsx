import "./Main.style.css";
import React from 'react';
import Game from '../Game/Game'
import Options from '../Options/Options';

class Main extends React.Component {
    state = {numOfPlayers: null, numOfScore: null, gameDisplay: false};

    onOptionsSubmit = (__numOfPlayers, __numOfScore) => {
        this.setState(pre => ({
            numOfPlayers: __numOfPlayers,
            numOfScore: __numOfScore ? __numOfScore : 100,
            gameDisplay: !pre.gameDisplay
        }));
    }

    onNewGameClick = () => {
        this.setState(prev => ({gameDisplay: !prev.gameDisplay}));
    }

    render() {
        // console.log(this.state);
        return (
            <div className='main-container'>
                {this.state.gameDisplay && <Game numOfPlayers={this.state.numOfPlayers} numOfScore={this.state.numOfScore} onNewGameClick={this.onNewGameClick}/>}
                {!this.state.gameDisplay && <Options callBackFunction={this.onOptionsSubmit}/>}
            </div>
        );
    }
}

export default Main;
