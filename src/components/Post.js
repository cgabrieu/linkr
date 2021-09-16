import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContainer, UserPic } from "../styles/styles";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useState, useContext } from "react";
import ReactHashtag from "react-hashtag";

export default function Post({ username, avatar, content }) {

    const history = useHistory();
    const [isLiked, setIsLiked] = useState(false);

    return (
        <PostContainer>
            <UserContainer>
                <UserPic onClick={() => history.push(`/user/${username}`)} src={avatar} alt="{user.name}" />
                {isLiked
                    ? <LikeButtonClicked onClick={() => setIsLiked(false)} />
                    : <LikeButton onClick={() => setIsLiked(true)} />}
                <LikesInfo
                    data-tooltip="João, Maria e outras 11 pessoas"
                    data-flow="bottom">
                    13 likes
                </LikesInfo>
            </UserContainer>
            <MainPostContainer>
                <UserName>{username}</UserName>
                <PostDescription>
                    Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
                    <HashtagsDescription> #react #material</HashtagsDescription>
                </PostDescription>
                <ContainerSnippetLink />
            </MainPostContainer>
        </PostContainer>
    );
};

const PostContainer = styled.div`
    width: 100%;
    background-color: #171717;
    border-radius: 16px;
    padding: 18px 20px 20px 18px;
    display: flex;

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
    cursor: pointer;
    color:#AC0000;
`;

const MainPostContainer = styled.div`
    width: 100%;
`;

const UserName = styled.p`
    font-size: 19px;

`;

const ContainerSnippetLink = styled.div`
    height: 155px;
`;

const PostDescription = styled.div`
   color: #B7B7B7;
   font-size: 17px;
   margin: 7px 0;
`;

const HashtagsDescription = styled.span`
    font-weight: bold;
    color: #FFFFFF;
`;

const LikesInfo = styled.span`
    font-size: 11px;
    margin: 4px;
`;