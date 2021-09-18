import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserContainer, UserPic } from "../styles/styles";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useState } from "react";
import ContainerLinkPreview from "./ContainerLinkPreview";

export default function Post({ user, likes, content }) {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <PostContainer>
      <UserContainer>
        <UserPic
          onClick={() => history.push(`/user/${user.id}`)}
          src={user.avatar}
          alt="{user.name}"
        />
        {isLiked ? (
          <LikeButtonClicked onClick={() => setIsLiked(false)} />
        ) : (
          <LikeButton onClick={() => setIsLiked(true)} />
        )}
        <LikesInfo
          data-tooltip={"Ninguém comentou nada ainda no objeto, fazer depois :)"}
          data-flow="bottom"
        >
          {likes.length + (likes.length === 1 ? " like" : " likes")}
        </LikesInfo>
      </UserContainer>
      <MainPostContainer>
        <UserName>{user.username}</UserName>
        <PostDescription>
          {content.text}
        </PostDescription>
        <Link to={{ pathname: content.link }} target="_blank">
          <ContainerLinkPreview content={content} />
        </Link>
      </MainPostContainer>
    </PostContainer>
  );
}


const PostContainer = styled.div`
  width: 100h;
  background-color: #171717;
  border-radius: 16px;
  padding: 18px 20px 20px 18px;
  display: flex;
  margin-bottom: 16px;
  @media (max-width: 610px) {
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
  color: #ac0000;
  cursor: pointer;
`;

const MainPostContainer = styled.div`
  max-width: 505px;
  position: relative;
  @media (max-width: 610px) {
    max-width: 510px;
  }
`;

const PostDescription = styled.div`
  color: #b7b7b7;
  font-size: 17px;
  margin: 7px 0 10px 0;
  word-wrap: break-word;
  max-width: 100%;
  @media (max-width: 610px) {
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
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`;