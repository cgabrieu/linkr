import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const HeaderBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #151515;
    height: 72px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2%;
    z-index: 4;
`;

export const Tittle = styled(Link)`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    font-weight: 700;
    color: #FFFFFF;
`

export const ArrowAndPhoto = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
`

export const Arrow = styled.img`
    transform: ${(props) => props.isExpandableMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    height: 14px;
    width: 20px;
    margin-right: 15px;
    cursor: pointer;    
`

export const Photo = styled.img`
    height: 53px;
    width: 53px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
`

export const ExpandableMenu = styled.div`
    position: absolute;
    display: ${(props) => props.isExpandableMenuOpen ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    bottom: -110px;
    right: 0;
    height: 110px;
    width: 130px;
    border-radius: 0 0 0 20px;
    background-color: #151515;

    p{
        color: #fafafa;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 17px;
    }
`