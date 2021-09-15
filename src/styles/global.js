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
    h1, h2 {
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
    }

    h1 {
        font-size: 43px;
    }
    h2 {
        font-size: 27px;
    }
    input, textarea, button {
        border: none;
        outline: none;
        border-radius: 5px;
        &:invalid{
            border-color: red;
        }
    }
    button {
        background-color: #1877F2;
        cursor: pointer;
    }
`;