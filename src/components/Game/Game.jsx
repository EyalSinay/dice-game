import './Game.style.css';
import React from 'react';
import Player from '../Player/Player';
import GameTools from '../GameTools/GameTools';

class Game extends React.Component {
    state = { playersObjArr: [], loserMessage: false, winnerMessage: false };

    componentDidMount() {
        this.createNewGame();
    }

    componentDidUpdate() {
        const scoresArr = this.state.playersObjArr.map(player => player.totalScore + player.currentScore);
        const currentPlayerIndex = this.state.playersObjArr.findIndex(player => player.currenTurn);
        if (scoresArr.some(score => score > this.props.numOfScore)) this.lose(currentPlayerIndex);
        if (scoresArr.some(score => score === this.props.numOfScore)) this.winner(currentPlayerIndex);

        let numOfLosers = 0;
        this.state.playersObjArr.forEach(element => {
            if (element.loser) numOfLosers++;
        });
        if (numOfLosers === this.state.playersObjArr.length - 1) {
            const currentWinnerIndex = this.state.playersObjArr.findIndex(element => !element.loser);
            this.winner(currentWinnerIndex);
        }
    }

    componentWillUnmount() {
        this.setState({ playersObjArr: [], loserMessage: false, winnerMessage: false });
    }

    createNewGame = () => {
        const arr = [];
        let numPlayers = Number(this.props.numOfPlayers);
        for (let i = 1; i <= numPlayers; i++) {
            arr.push({ currentScore: 0, totalScore: 0, currenTurn: (i === 1), playerName: `Player${i}`, loser: false, winner: false, imgUrl: "../../assets/user-avatar.jpg" });
        }
        if (numPlayers === 1) {
            arr.push({ currentScore: 0, totalScore: 0, currenTurn: false, playerName: "Computer", loser: false, winner: false, imgUrl: "../../assets/user-avatar.jpg" });
        }
        this.setState({ playersObjArr: [...arr] });
    }

    resetGame = () => {
        this.setState({ playersObjArr: [], loserMessage: false, winnerMessage: false });
        this.createNewGame();
    }

    // getPlayerNameByIndex = (index) => {
    //     return this.state.playersObjArr[index].playerName;
    // }

    passTurn = () => {
        const maxPlayersIndex = this.state.playersObjArr.length - 1;
        const currentPlayerIndex = this.state.playersObjArr.findIndex(player => player.currenTurn);
        let nextPlayerIndex = currentPlayerIndex + 1 <= maxPlayersIndex ? currentPlayerIndex + 1 : 0;
        while (this.state.playersObjArr[nextPlayerIndex].loser) {
            if (nextPlayerIndex + 1 <= maxPlayersIndex) {
                nextPlayerIndex++;
            } else {
                nextPlayerIndex = 0;
            }
        }
        this.setState(() => {
            const newArr = Object.values(this.state.playersObjArr);
            newArr.forEach((player, index) => {
                if (currentPlayerIndex === index) player.currenTurn = false;
                if (nextPlayerIndex === index) player.currenTurn = true;
            });
            return { playersObjArr: newArr };
        });
    }

    getDiceResult = (diceResult) => {
        const currentPlayerIndex = this.state.playersObjArr.findIndex(player => player.currenTurn);
        if (diceResult === 12) {
            this.setState(() => {
                const newArr = Object.values(this.state.playersObjArr);
                newArr.forEach((element, index) => {
                    if (index === currentPlayerIndex) {
                        element.currentScore = 0;
                        element.totalScore = 0;
                    };
                });
                return { playersObjArr: newArr };
            });
            this.passTurn();
        } else {
            this.setState(prev => {
                const newArr = Object.values(this.state.playersObjArr);
                newArr.forEach((element, index) => {
                    if (index === currentPlayerIndex) {
                        element.currentScore = prev.playersObjArr[currentPlayerIndex].currentScore + diceResult;
                    };
                });
                return { playersObjArr: newArr };
            });
        }
    }

    lose = (currentPlayerIndex) => {
        this.setState(() => {
            const newArr = Object.values(this.state.playersObjArr);
            newArr.forEach((element, index) => {
                if (index === currentPlayerIndex) {
                    element.loser = true;
                    element.currentScore = 0;
                    element.totalScore = 0;
                };
            });
            return { playersObjArr: newArr, loserMessage: true };
        });
        this.passTurn();
    }

    winner = (currentWinnerIndex) => {
        this.setState(() => {
            const newArr = Object.values(this.state.playersObjArr);
            newArr.forEach((element, index) => {
                element.currentScore = 0;
                element.totalScore = 0;
                element.loser = false;
                if (index === currentWinnerIndex) {
                    element.winner = true;
                };
            });
            return { playersObjArr: newArr, loserMessage: false, winnerMessage: true };
        });
    }

    getLosers = () => {
        const arrayOfLurers = [];
        this.state.playersObjArr.forEach(element => {
            if (element.loser) {
                arrayOfLurers.push(element.playerName);
            }
        });
        return arrayOfLurers;
    }

    geNumberOfPlayerNow = () => {
        let num = 0;
        this.state.playersObjArr.forEach(player => {
            if (!player.loser) num++;
        });
        return num;
    }

    onHoldClick = () => {
        const currentPlayerIndex = this.state.playersObjArr.findIndex(player => player.currenTurn);
        if (this.state.playersObjArr[currentPlayerIndex].currentScore > 0) {
            this.setState(prev => {
                const newArr = Object.values(this.state.playersObjArr);
                newArr.forEach((element, index) => {
                    if (index === currentPlayerIndex) {
                        element.totalScore = prev.playersObjArr[currentPlayerIndex].totalScore + prev.playersObjArr[currentPlayerIndex].currentScore;
                        element.currentScore = 0;
                    };
                });
                return { playersObjArr: newArr };
            });
            this.passTurn();
        } else {

        }
    }

    turnOffLoserMessage = () => {
        this.setState({ loserMessage: false });
    }
    turnOffWinnerMessage = () => {
        this.resetGame();
    }

    render() {
        // console.log(this.state.playersObjArr);
        return (
            <>
                <div className="game-container" >
                    < GameTools getDiceResult={this.getDiceResult} onHoldClick={this.onHoldClick} onResetGameClick={this.resetGame} onNewGameClick={this.props.onNewGameClick} />
                    <div className={`players-container-${this.geNumberOfPlayerNow()} players-container`}>
                        {
                            this.state.playersObjArr.filter(player => !player.loser).map((player, index) => {
                                return (<Player
                                    key={player.playerName}
                                    currentScore={player.currentScore}
                                    totalScore={player.totalScore}
                                    playerName={player.playerName}
                                    currenTurn={player.currenTurn ? "current-turn" : ""}
                                    imgUrl= {player.imgUrl}
                                />)
                            })
                        }
                    </div>
                </div >
                {this.state.loserMessage && <div onClick={this.turnOffLoserMessage} className='lose-message message'>
                    <h3 className='title-message'>{this.getLosers().length > 1 ? "This players are a losers and them out of the game:" : "This player is a loser and him out of the game:"}</h3>
                    <p>{this.getLosers()}</p>
                </div>}
                {this.state.winnerMessage && <div onClick={this.turnOffWinnerMessage} className='winner-message message'>
                    <h3 className='title-message'>And the winner is:</h3>
                    <p>{this.state.playersObjArr.find(player => player.winner).playerName}</p>
                </div>}
            </>
        );
    }
}

export default Game;
