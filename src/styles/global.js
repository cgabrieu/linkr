import "./reset.css"
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        font-family: 'Lato', sans-serif;
        //font-family: 'Passion One', cursive;
        //font-family: 'Lato', sans-serif;
        //font-family: 'Oswald', sans-serif;
        background-color: #333333;
        color: #FFFFFF;
    }
    h1 {
        font-family: 'Oswald', sans-serif;
    }
    input, textarea, button {
        border: none;
        outline: none;
        border-radius: 5px;
        font-family: 'Lato', sans-serif;
        &:disabled {
            opacity: 0.7;
        }
    }
    button {
        background-color: #1877F2;
        cursor: pointer;
    }
`;