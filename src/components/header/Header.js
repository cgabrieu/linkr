import { useState } from 'react';
import { Link } from 'react-router-dom'
import arrow from '../../assets/HeaderArrow.svg';
import { HeaderBar, Tittle, ArrowAndPhoto, Arrow, Photo, ExpandableMenu } from "./HeaderStyle";

export default function Header() {
    const [clicked, setClicked] = useState(false);

    function switchAppearingBox() {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    }

    return (
        <HeaderBar>
            <Tittle>linkr</Tittle>
            <ArrowAndPhoto>
                <Arrow onClick={switchAppearingBox} clicked={clicked} src={arrow} alt='Arrow to show expandable menu' />
                <Photo onClick={switchAppearingBox} src='https://img.ibxk.com.br/2017/06/22/22100428046161.jpg?w=1200&h=675&mode=crop&scale=both' alt='User photo' />
            </ArrowAndPhoto>
            <ExpandableMenu clicked={clicked}>
                <Link to='/my-posts' onClick={switchAppearingBox}><p>My posts</p></Link>
                <Link to='/my-likes' onClick={switchAppearingBox}><p>My likes</p></Link>
                <Link to='/' onClick={switchAppearingBox}><p>Logout</p></Link>
            </ExpandableMenu>

        </HeaderBar>
    )
}