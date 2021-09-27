import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    margin: 125px auto 25px auto;
    max-width: 935px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const UserContainer = styled.div`
    margin-right: 18px;
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const UserPic = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
`;

const PostContainer = styled.div`
    width: 610px;
    
    h1 {        
        margin-bottom: 45px;
        font-size: 43px;
        font-weight: bold;

        @media(max-width: 935px) {
            margin: 0 auto 19px 17px;
        }
    }
    
    @media(max-width: 935px) {
        width: 100%;
        margin: 45px auto 0;
    }
`;

const HashtagLink = styled(Link)`
  font-weight: bold;
  color: #FFFFFF;
`;

const Div = styled.div`
  & ::-webkit-scrollbar {
    width: 0px;
}
`

export {
    Container,
    UserContainer,
    UserPic,
    PostContainer,
    HashtagLink,
    Div
};