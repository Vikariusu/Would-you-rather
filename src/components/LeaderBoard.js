import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
    displayUserRankings = () => {
        const users = this.props.users;
        const userIds = Object.keys(users);

        // sort userIds by their score
        const userIdsByScore = userIds.sort((userIdA, userIdB) => {
            const scoreA = users[userIdA].questions.length + users[userIdA].answers.length;
            const scoreB = users[userIdB].questions.length + users[userIdB].answers.length;

            return scoreA > scoreB;
        });

        // return user cards based on their score
        return userIdsByScore.map(userId => {
            const user = users[userId];

            return (
                <div className="user-rank-card" key={userId}>
                    <div>
                        <img src={user.avatarURL} style={{ width: '30px' }} alt="" />
                        {user.name}
                    </div>
                    <div>
                        <p>Questions asked: {user.questions.length}</p>
                        <p>Questions answered: {Object.keys(user.answers).length}</p>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (!this.props.authedUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div>
                <h2>Leaderboard</h2>
                {this.displayUserRankings()}
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(LeaderBoard);