import { Link } from 'react-router-dom'
import arrow from '../../assets/HeaderArrow.svg';
import { HeaderBar, Tittle, ArrowAndPhoto, Arrow, Photo, ExpandableMenu } from "./HeaderStyle";

export default function Header(props) {
    const { clicked, setClicked } = props;

    function toggleClicked(e) {
        clicked ? setClicked(false) : setClicked(true);
        e.stopPropagation();
    }

    return (
        <HeaderBar>
            <Tittle>linkr</Tittle>
            <ArrowAndPhoto>
                <Arrow onClick={(event) => toggleClicked(event)} clicked={clicked} src={arrow} alt='Arrow to show expandable menu' />
                <Photo onClick={(event) => toggleClicked(event)} src='https://img.ibxk.com.br/2017/06/22/22100428046161.jpg?w=1200&h=675&mode=crop&scale=both' alt='User photo' />
            </ArrowAndPhoto>
            <ExpandableMenu onClick={(event) => event.stopPropagation()} clicked={clicked}>
                <Link onClick={(event) => toggleClicked(event)} to='/my-posts' ><p>My posts</p></Link>
                <Link onClick={(event) => toggleClicked(event)} to='/my-likes' ><p>My likes</p></Link>
                <Link onClick={(event) => toggleClicked(event)} to='/' ><p>Logout</p></Link>
            </ExpandableMenu>
        </HeaderBar>
    )
}