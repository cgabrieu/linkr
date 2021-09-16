import { Link } from 'react-router-dom'
import arrow from '../../assets/HeaderArrow.svg';
import { HeaderBar, Tittle, ArrowAndPhoto, Arrow, Photo, ExpandableMenu } from "./HeaderStyle";
import { useContext } from 'react';
import ExpandableMenuContext from '../../contexts/ExpandableMenuContext';

export default function Header() {
    const { isExpandableMenuOpen, setIsExpandableMenuOpen } = useContext(ExpandableMenuContext);

    function toggleOpen(e) {
        isExpandableMenuOpen ? setIsExpandableMenuOpen(false) : setIsExpandableMenuOpen(true);
        e.stopPropagation();
    }

    return (
        <HeaderBar>
            <Tittle>linkr</Tittle>
            <ArrowAndPhoto>
                <Arrow onClick={(event) => toggleOpen(event)} isExpandableMenuOpen={isExpandableMenuOpen} src={arrow} alt='Arrow to show expandable menu' />
                <Photo onClick={(event) => toggleOpen(event)} src='https://img.ibxk.com.br/2017/06/22/22100428046161.jpg?w=1200&h=675&mode=crop&scale=both' alt='User photo' />
            </ArrowAndPhoto>
            <ExpandableMenu onClick={(event) => event.stopPropagation()} isExpandableMenuOpen={isExpandableMenuOpen}>
                <Link onClick={(event) => toggleOpen(event)} to='/my-posts' ><p>My posts</p></Link>
                <Link onClick={(event) => toggleOpen(event)} to='/my-likes' ><p>My likes</p></Link>
                <Link onClick={(event) => toggleOpen(event)} to='/' ><p>Logout</p></Link>
            </ExpandableMenu>
        </HeaderBar>
    )
}