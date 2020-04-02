import React from 'react'
import styled from 'styled-components';

const StyledRankCard = styled.div`
    display: flex;
    border-bottom: 1px solid #E7E5DF;
    padding: 26px 0 10px 0;

    .rank {
        align-self: center;
        padding: 0 32px;
        font-size: 28px;
        font-weight: bolder;
    }

    .username {
        display: flex;
        align-items: center;

        img {
            margin-right: 8px;
        }
    }
`

function RankCard({ user, rank }) {
    return (
        <StyledRankCard >
            <div className="rank">{rank}</div>
            <div>
                <div className="username">
                    <img src={user.avatarURL} style={{ width: '30px' }} alt="" />
                    {user.name}
                </div>
                <div>
                    <p>Questions asked: {user.questions.length}</p>
                    <p>Questions answered: {Object.keys(user.answers).length}</p>
                </div>
            </div>
        </StyledRankCard>
    )
}

export default RankCard;