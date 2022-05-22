import "./Player.style.css";
import React from 'react';

import humanAvatar from '../../assets/user-avatar.jpg'
import computerAvatarStatic from '../../assets/computer-thinking-static.gif'
import computerAvatarAnim from '../../assets/computer-thinking-anim.gif'

class Player extends React.Component {

    getAvatar = () => {
        let avatar;
        if (this.props.playerName === "Computer") {
            if (!this.props.currenTurn) {
                avatar = computerAvatarStatic;
            } else {
                avatar = computerAvatarAnim;
            }
        } else {
            avatar = humanAvatar;
        }
        return avatar;
    }


    render() {
        return (
            <div className='player-container' data-turn={this.props.currenTurn}>
                <img src={this.getAvatar()} alt="not found" className="avatar-user" />
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
