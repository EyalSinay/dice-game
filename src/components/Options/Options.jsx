import React from 'react';
import './Options.style.css'

class Options extends React.Component {
    state= {numOfPlayers: "1", numOfScore: ""};

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.callBackFunction(this.state.numOfPlayers, this.state.numOfScore);
    }

    onRadioChange = (e) => {
        this.setState({numOfPlayers: e.target.value});
    }

    onTextInput = (e) => {
        this.setState({numOfScore: e.target.value})
    }

    render() {
        return (
            <form className='options-container' onSubmit={ this.onFormSubmit }>
                <div className="num-of-layers-container">
                    <span className='option-title'>Number of players:</span>
                    <input type="radio" name="num-of-layers" id="1player" value="1" onChange={this.onRadioChange} checked={"1" === this.state.numOfPlayers} />
                    <label htmlFor="1player">1 player with computer</label>
                    <input type="radio" name="num-of-layers" id="2player" value="2" onChange={this.onRadioChange} checked={"2" === this.state.numOfPlayers} />
                    <label htmlFor="2player">2 players</label>
                    <input type="radio" name="num-of-layers" id="3player" value="3" onChange={this.onRadioChange} checked={"3" === this.state.numOfPlayers} />
                    <label htmlFor="3player">3 players</label>
                    <input type="radio" name="num-of-layers" id="4player" value="4" onChange={this.onRadioChange} checked={"4" === this.state.numOfPlayers} />
                    <label htmlFor="4player">4 players</label>
                </div>
                <div className="num-of-score-container">
                    <label className='option-title' htmlFor="num-of-score">Number of Score To Get:</label>
                    <input type="number" name="num-of-score" id="num-of-score" placeholder="100" onInput={this.onTextInput} value={this.state.numOfScore} />
                </div>
                <button type='submit'>Start Game</button>
            </form>
        );
    }
}

export default Options;
