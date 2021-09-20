import { Link } from 'react-router-dom'
import arrow from '../../assets/HeaderArrow.svg';
import { HeaderBar, Tittle, ArrowAndPhoto, Arrow, Photo, ExpandableMenu } from "./HeaderStyle";
import { useContext } from 'react';
import ExpandableMenuContext from '../../contexts/ExpandableMenuContext';
import UserContext from '../../contexts/UserContext';

export default function Header() {
    const { isExpandableMenuOpen, setIsExpandableMenuOpen } = useContext(ExpandableMenuContext);
    const { user } = useContext(UserContext);
    const avatar = user.avatar;

    function cleanUserInfo(e) {
        localStorage.clear();
        toggleOpen(e);
    }

    function toggleOpen(e) {
        isExpandableMenuOpen ? setIsExpandableMenuOpen(false) : setIsExpandableMenuOpen(true);
        e.stopPropagation();
    }

    return (
        <HeaderBar>
            <Tittle to="/timeline" >linkr</Tittle>
            <ArrowAndPhoto>
                <Arrow onClick={(event) => toggleOpen(event)} isExpandableMenuOpen={isExpandableMenuOpen} src={arrow} alt='Arrow to show expandable menu' />
                <Photo onClick={(event) => toggleOpen(event)} src={avatar} alt='User photo' />
            </ArrowAndPhoto>
            <ExpandableMenu onClick={(event) => event.stopPropagation()} isExpandableMenuOpen={isExpandableMenuOpen}>
                <Link onClick={(event) => toggleOpen(event)} to='/my-posts' ><p>My posts</p></Link>
                <Link onClick={(event) => toggleOpen(event)} to='/my-likes' ><p>My likes</p></Link>
                <Link onClick={(event) => cleanUserInfo(event)} to='/' ><p>Logout</p></Link>
            </ExpandableMenu>
        </HeaderBar>
    )
};