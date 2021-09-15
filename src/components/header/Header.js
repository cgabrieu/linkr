import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import arrow from '../../assets/HeaderArrow.svg';
import { HeaderBar, Tittle, ArrowAndPhoto, Arrow, Photo, ExpandableMenu } from "./HeaderStyle";

export default function Header() {
    const [clicked, setClicked] = useState(false);
    const node = useRef();

    function toggleAppearingBox() {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    }

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setClicked(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        <HeaderBar>
            <Tittle>linkr</Tittle>
            <ArrowAndPhoto>
                <Arrow onClick={toggleAppearingBox} clicked={clicked} src={arrow} alt='Arrow to show expandable menu' />
                <Photo onClick={toggleAppearingBox} src='https://img.ibxk.com.br/2017/06/22/22100428046161.jpg?w=1200&h=675&mode=crop&scale=both' alt='User photo' />
            </ArrowAndPhoto>
            <ExpandableMenu clicked={clicked} ref={node}>
                <Link to='/my-posts' onClick={toggleAppearingBox}><p>My posts</p></Link>
                <Link to='/my-likes' onClick={toggleAppearingBox}><p>My likes</p></Link>
                <Link to='/' onClick={toggleAppearingBox}><p>Logout</p></Link>
            </ExpandableMenu>

        </HeaderBar>
    )
}