import styled from "styled-components";

const Container = styled.div`
    margin: 125px auto 25px auto;
    max-width: 935px;
    display: flex;
    justify-content: space-between;
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
    object-fit:cover;
    border-radius: 50%;
`;

export {
    Container,
    UserContainer,
    UserPic,
};