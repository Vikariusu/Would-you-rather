import React, { Component } from 'react';
import styled from 'styled-components';

const StyledNotFound = styled.div`
    text-align: center;
    margin-top: 12vh;
    color: #393E41;

    h1 {
        letter-spacing: 1px;
    }
`

export default class NotFoundPage extends Component {
    render() {
        return (
            <StyledNotFound>
                <h1>404</h1>
                <p>This page doesn't exist!</p>
            </StyledNotFound>
        )
    }
}
