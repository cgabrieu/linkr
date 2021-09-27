import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRetweet } from 'react-icons/fa';
import { AiOutlineComment } from 'react-icons/ai';
import UserContext from "../contexts/UserContext";
import ReactTooltip from "react-tooltip";
import { UserContainer, UserPic } from "../styles/styles";
import { postLike, postDislike, getUserInfo, repost } from "../services/api";
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function UserLikeContainer({ userPost, idPost, likes, repostCount, repostedBy, setIsReposted, showComments, setShowComments, quantityComments }) {
  let history = useHistory();
  const { username, avatar } = userPost;
  const { user } = useContext(UserContext);
  let isLikedAux = false;
  const [isLiked, setIsLiked] = useState(isLikedAux);
  const listAux = [];
  const [listWhoLiked, setListWhoLiked] = useState(listAux);
  let messageAux = 'Ninguém curtiu ainda :(';
  const [likedMessage, setLikedMessage] = useState(messageAux);
  const [isModalRepostOpen, setIsModalRepostOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qtyRepost, setQtyRepost] = useState(repostCount);

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

  function repostPost() {
    setIsLoading(true);
    repost(user.token, idPost)
      .then(() => {
        setIsLoading(false);
        toggleModelRepost();
        setIsReposted(true);
        setQtyRepost(qtyRepost + 1)
      })
      .catch(() => { alert("Não foi possível repostar esse link") })
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

  function toggleModelRepost() {
    setIsModalRepostOpen(!isModalRepostOpen);
  }

  return (
    <UserContainer>
      <UserPic onClick={() => history.push(`/user/${userPost.id}`)} src={avatar} alt={username} />
      {isLiked
        ? <LikeButtonClicked onClick={dislikePost} />
        : <LikeButton onClick={likePost} />}
      <Info data-tip data-for={idPost.toString()}>
        {listWhoLiked.length + ((listWhoLiked.length === 1) ? " like" : " likes")}
      </Info>
      <CommentButton onClick={() => setShowComments(!showComments)} />
      <Info>
        {quantityComments + ((quantityComments === 1) ? " comment" : " comments")}
      </Info>
      <RepostButton onClick={repostedBy && repostedBy.username === user.username ? () => alert("Você já repostou esse link!") : toggleModelRepost} />
      <Info>
        {qtyRepost === 1 ? `${qtyRepost} re-post` : `${qtyRepost} re-posts`}
      </Info>
      <Modal
        isOpen={isModalRepostOpen}
        onRequestClose={toggleModelRepost}
        style={modalStyles}
      >
        <ModalContent>
          <ModalQuestion>Tem certeza que quer repostar esse link?</ModalQuestion>
          <ContainerButtonsModal>
            <ButtonCancel disabled={isLoading} onClick={toggleModelRepost}><p>Não, voltar</p></ButtonCancel>
            <ButtonDelete disabled={isLoading} onClick={repostPost}><p>Sim, repostar</p></ButtonDelete>
          </ContainerButtonsModal>
        </ModalContent>
      </Modal>
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
  font-size: 22px;
  margin-top: 19px;
  cursor: pointer;
`;

const LikeButtonClicked = styled(AiFillHeart)`
  font-size: 22px;
  margin-top: 19px;
  color:#AC0000;
  cursor: pointer;
`;

const RepostButton = styled(FaRetweet)`
  font-size: 20px;
  margin-top: 19px;
  cursor: pointer;
`;

const CommentButton = styled(AiOutlineComment)`
  font-size: 22px;
  margin-top: 19px;
  cursor: pointer;
`;

const Info = styled.span`
  text-align: center;
  font-size: 11px;
  margin: 4px;
  width: 55px;
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333333',
    borderRadius: '50px',
  },
  overlay: { zIndex: 5 }
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 600px;
  height: 260px;
	font-size: 34px;
	padding: 40px 50px;
	
  @media(max-width: 610px) {
		font-size: 22px;
    padding: 10px 20px;
		width: 300px;
    height: 160px;
    }
`;

const ModalQuestion = styled.p`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: rgb(255, 255, 255);
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: rgb(255, 255, 255);
	text-align: center;
	
`;

const ContainerButtonsModal = styled.div`
	margin-top: 40px;
	@media(max-width: 610px) {
		margin-top: 10px;	
    }
`;

const Button = styled.button`
	margin: 0 13px;
	padding: 8px 23px;
	font-size: 18px;
	font-weight: bold;
	@media(max-width: 610px) {
		font-size: 14px;
        padding: 6px 15px;
    }
`;

const ButtonCancel = styled(Button)`
	color: #1877F2;
	background-color: #FFFFFF;
`;

const ButtonDelete = styled(Button)`
	color: #FFFFFF;
`;