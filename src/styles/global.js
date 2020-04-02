import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background: #f5f6fa;
        font: 1rem "PT Sans", sans-serif;
    }

    h2 {
        font: 1.3rem ;
        font-weight: bolder;
        margin: 0;
        padding: 16px;
    }


    a {
        text-decoration: none;
        color: #393E41;
        padding: 0 12px;
    }
`;

export default GlobalStyle;