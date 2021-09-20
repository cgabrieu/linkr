import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import UserContext from "../contexts/UserContext";
import ReactTooltip from "react-tooltip";
import { UserContainer, UserPic } from "../styles/styles";
import { postLike, postDislike, getUserInfo } from "../services/api";
import { useHistory } from "react-router-dom";

export default function UserLikeContainer({ userPost, idPost, likes }) {

  let history = useHistory();
  const { username, avatar } = userPost;
  const { user } = useContext(UserContext);
  let isLikedAux = false;
  const [isLiked, setIsLiked] = useState(isLikedAux);
  const listAux = [];
  const [listWhoLiked, setListWhoLiked] = useState(listAux);
  let messageAux = 'Ninguém curtiu ainda :(';
  const [likedMessage, setLikedMessage] = useState(messageAux);

  useEffect(() => whoLiked(), []);

  function likePost() {
    isLikedAux = true;
    setIsLiked(isLikedAux);
    postLike(user.token, idPost);
    listWhoLiked.push(user.username);
    createLikedMessage();
  }

  function dislikePost() {
    isLikedAux = false;
    setIsLiked(isLikedAux);
    postDislike(user.token, idPost);
    const i = listWhoLiked.indexOf(user.username);
    listWhoLiked.splice(i, 1);
    createLikedMessage();
  }

  function whoLiked() {
    likes.map((like) => findUsernamesWhoLiked(like));
  }

  function findUsernamesWhoLiked(like) {
    const promisse = getUserInfo(user.token, like.userId);
    promisse.then(handleSucces).catch();
  }

  function handleSucces(resp) {
    listAux.push(resp.data.user.username);
    setListWhoLiked(listAux);
    isLikedAux = listAux.includes(user.username);
    setIsLiked(isLikedAux);
    createLikedMessage();
  }

  function createLikedMessage() {
    if (isLikedAux === true) {
      if (listWhoLiked.length === 1) {
        messageAux = (`Você curtiu`);
        setLikedMessage(messageAux);
      } else {
        if (listWhoLiked.length === 2) {
          if (listWhoLiked[0] === user.username) {
            messageAux = (`Você e ${listWhoLiked[1]} curtiram`);
            setLikedMessage(messageAux);
          } else {
            messageAux = (`Você e ${listWhoLiked[0]} curtiram`);
            setLikedMessage(messageAux);
          }
        } else {
          if (listWhoLiked[0] === user.username) {
            messageAux = (`Você, ${listWhoLiked[1]} e mais ${listWhoLiked.length - 2} curtiram`);
            setLikedMessage(messageAux);
          } else {
            messageAux = (`Você, ${listWhoLiked[0]} e mais ${listWhoLiked.length - 2} curtiram`);
            setLikedMessage(messageAux);
          }
        }
      }
    }

    if (isLikedAux === false) {
      if (listWhoLiked.length === 0) {
        messageAux = ('Ninguém curtiu ainda.');
        setLikedMessage(messageAux);
      }

      if (listWhoLiked.length === 1) {
        messageAux = (`${listWhoLiked[0]} curtiu`);
        setLikedMessage(messageAux);
      }

      if (listWhoLiked.length === 2) {
        messageAux = (`${listWhoLiked[0]} e ${listWhoLiked[1]} curtiram`);
        setLikedMessage(messageAux);
      }

      if (listWhoLiked.length > 2) {
        messageAux = (`${listWhoLiked[0]}, ${listWhoLiked[1]} e mais ${listWhoLiked.length - 2} curtiram`);
        setLikedMessage(messageAux);
      }
    }
  }

  return (
    <UserContainer>
      <UserPic onClick={() => history.push(`/user/${userPost.id}`)} src={avatar} alt={username} />
      {isLiked
        ? <LikeButtonClicked onClick={dislikePost} />
        : <LikeButton onClick={likePost} />}
      <LikesInfo data-tip data-for={idPost.toString()}>
        {listWhoLiked.length + ((listWhoLiked.length === 1) ? " like" : " likes")}
      </LikesInfo>
      <ReactTooltip
        place='bottom'
        type='light'
        id={idPost.toString()}>
        <span>{likedMessage}</span>
      </ReactTooltip>
    </UserContainer>
  );
};

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

const LikesInfo = styled.span`
  font-size: 11px;
  margin: 4px;
`;