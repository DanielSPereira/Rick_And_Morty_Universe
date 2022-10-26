// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  :root {
    --green: #33CC95;
    --green-dark: rgb(5 150 105);
    --red: #E52E4D;

    --medium-blue: #112945;
    --light-blue: #133962;
    --dark-blue: #0f172a;

    --text-title: #FFFFFF;
    --text-body: #B2B8F0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--dark-blue);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  .overlay-modal {
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    padding: 2rem 0;
    background-color: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 1080px) {
    html {      
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    } 
  }
`;
 
export default GlobalStyle;