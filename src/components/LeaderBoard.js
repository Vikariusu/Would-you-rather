import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import RankCard from './RankCard';

const StyledLeaderBoard = styled.div`
    width: 60vw;
    margin: 40px auto;
    background: white;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    color: #393E41;

    h2 {
        border-bottom: 1px solid #E7E5DF;
    }
`

class LeaderBoard extends Component {
    displayUserRankings = () => {
        const users = this.props.users;
        const userIds = Object.keys(users);

        // sort userIds by their score
        const userIdsByScore = userIds.sort((userIdA, userIdB) => {
            const scoreA = users[userIdA].questions.length + Object.keys(users[userIdA].answers).length;
            const scoreB = users[userIdB].questions.length + Object.keys(users[userIdB].answers).length;

            return scoreB - scoreA;
        });

        let rank = 0;
        // return user cards based on their rank
        return userIdsByScore.map(userId => {
            rank = rank + 1;

            return (
                <RankCard
                    key={userId}
                    user={users[userId]}
                    rank={rank}
                />
            )
        })
    }

    render() {
        if (!this.props.authedUser) {
            return <Redirect to="/login" />;
        }

        return (
            <StyledLeaderBoard>
                <h2>Leaderboard</h2>
                {this.displayUserRankings()}
            </StyledLeaderBoard>
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