import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserContainer, UserPic } from "../styles/styles";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {ReactComponent as EditIcon} from "../assets/pencil.svg";
import {ReactComponent as DeleteIcon} from "../assets/trash.svg";
import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../contexts/UserContext";
import ContainerLinkPreview from "./ContainerLinkPreview";
import { postLike, postDislike, getUserInfo, putEditUserPost } from "../services/api";
import ReactTooltip from "react-tooltip";
import { Hashtags } from "../services/utils";

export default function Post({ idPost, userPost, likes, content }) {

  const history = useHistory();
  
  const [isEditing, setIsEditing] = useState(false);
  const [textareaDescription, setTextareaDescription] = useState(content.text);
  const [isLoading, setIsLoading] = useState(false);

  const { username, avatar } = userPost;
  const { user } = useContext(UserContext);
  let isLikedAux = false;
  const [isLiked, setIsLiked] = useState(isLikedAux);
  const listAux = [];
  const [listWhoLiked, setListWhoLiked] = useState(listAux);
  let messageAux = 'Ninguém curtiu ainda :(';
  const [likedMessage, setLikedMessage] = useState(messageAux);

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

  const editFieldRef = useRef();

  useEffect(() => whoLiked(), []);

  useEffect(() =>  {
    if (isEditing) {
      editFieldRef.current.focus();
      const currFieldRef = editFieldRef.current;
      currFieldRef.selectionStart = currFieldRef.value.length;
      currFieldRef.selectionEnd = currFieldRef.value.length;
    }
  }, [isEditing]);

  return (
    <PostContainer>
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
      <MainPostContainer>
        <TopContainer>
          <UserName>{userPost.username}</UserName>
          {(userPost.id === user.id) &&
          <IconsContainer>
            <EditIcon onClick={() => { 
              setIsEditing(!isEditing);
              setTextareaDescription(content.text);
            }} />
            <DeleteIcon />
          </IconsContainer>}
        </TopContainer>
        {!isEditing ?
          <PostDescription>
            <Hashtags>
              {content.text}
            </Hashtags>
          </PostDescription>
          : <TextAreaPostDescription 
              value={textareaDescription}
              disabled={isLoading}
              onChange={(e) => {
                setTextareaDescription(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsEditing(false);
                else if (e.key === 'Enter') {
                  setIsLoading(true);
                  putEditUserPost(idPost, textareaDescription, user.token)
                    .then(res => {
                      console.log(res.data);
                      setIsEditing(false);
                      setIsLoading(false);
                    })
                    .catch(() => {
                      setIsLoading(true);
                      alert("Ocorreu um erro ao editar seu post.")
                    });
                }
              }}
              ref={editFieldRef}
            />}
        <Link to={{ pathname: content.link }} target="_blank">
          <ContainerLinkPreview content={content} />
        </Link>
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
  margin-bottom: 16px;
  @media(max-width: 610px) {
    border-radius: 0;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconsContainer = styled.div`
  svg {
    margin-left: 13px;
  }
  cursor: pointer;
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

const TextAreaPostDescription = styled.textarea`
  color: #4C4C4C;
  width: 100%;
  padding: 7px;
  margin: 5px 0;
  font-size: 16px;
  resize: none;
  @media (max-width: 610px) {
    font-size: 13px;
  }
`;

const UserName = styled.p`
  font-size: 19px;
`;

const LikesInfo = styled.span`
  font-size: 11px;
  margin: 4px;
`;
