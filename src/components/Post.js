import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserContainer, UserPic } from "../styles/styles";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import ReactHashtag from 'react-hashtag';
import ContainerLinkPreview from "./ContainerLinkPreview";
import { postLike, postDislike } from "../services/api";

export default function Post({ user: userPost, likes, content }) {

    const history = useHistory();
    const {user} = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(false);

    function likePost(){
        setIsLiked(true);
        postLike(user.token, userPost.id).then(console.log(likes[0]));
    }
  
    function dislikePost(){
        setIsLiked(false);
        postDislike(user.token, userPost.id).then(console.log(likes[0]));
    }

    function showWhoLiked(){
        if(likes.length === 0){
            return('Ninguém curtiu ainda :(');
        }

        if(isLiked === false && likes.length === 2){
            return(`${likes} curtiu`)
        }
    }

    return (
        <PostContainer>
            <UserContainer>
                <UserPic onClick={() => history.push(`/user/${userPost.username}`)} src={userPost.avatar} alt="{userPost.name}" />
                {isLiked
                    ? <LikeButtonClicked onClick={dislikePost} />
                    : <LikeButton onClick={likePost} />}
                <LikesInfo
                    data-tooltip={showWhoLiked()}
                    data-flow="bottom">
                    {likes.length + ((likes.length === 1) ? " like" : " likes")}
                </LikesInfo>
            </UserContainer>
            <MainPostContainer>
                <UserName>{userPost.username}</UserName>
                <PostDescription>
                    <Hashtags>{content.text}</Hashtags>
                </PostDescription>
                <Link to={{ pathname: content.link }} target="_blank">
                    <ContainerLinkPreview content={content} />
                </Link>
            </MainPostContainer>
        </PostContainer>
    );
};

const PostContainer = styled.div`
    width: 100h; 
    background-color: #171717;
    border-radius: 16px;
    padding: 18px 20px 20px 18px;
    display: flex;
    margin-bottom: 16px;
    @media(max-width: 610px) {
        border-radius: 0;
    }
`;

const LikeButton = styled(AiOutlineHeart)`
    width: 20px;
    height: 18px;
    margin-top: 19px;
    cursor: pointer;
`;

const LikeButtonClicked = styled(AiFillHeart)`
    width: 20px;
    height: 18px;
    margin-top: 19px;
    color:#AC0000;
    cursor: pointer;
`;

const MainPostContainer = styled.div`
    max-width: 505px;
    position: relative;
    @media(max-width: 610px) {
        max-width: 510px;
    }
`;

const PostDescription = styled.div`
    color: #B7B7B7;
    font-size: 17px;
    margin: 7px 0 10px 0;
    word-wrap: break-word;
    max-width: 100%;
    @media(max-width: 610px) {
        font-size: 15px;
        width: 288px;
    }
`;

const UserName = styled.p`
    font-size: 19px;
`;

const LikesInfo = styled.span`
    font-size: 11px;
    margin: 4px;
`;

const StyledHashtag = styled.a`
    color: #FFFFFF;
    font-weight: bold;
    cursor: pointer;
`;
 
const Hashtags = ({ children }) => (
    <ReactHashtag
        renderHashtag={(hashtagValue) => (
            <StyledHashtag>
                <Link to={"/hashtag/"+hashtagValue.replace("#","")}>
                    {hashtagValue}
                </Link>
            </StyledHashtag>
        )}
    >
        {children}
    </ReactHashtag>
);
