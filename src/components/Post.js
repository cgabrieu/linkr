import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserContainer, UserPic } from "../styles/styles";
import { AiOutlineHeart, AiFillHeart, AiFillWindows } from "react-icons/ai";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import ReactHashtag from 'react-hashtag';
import ContainerLinkPreview from "./ContainerLinkPreview";
import { postLike, postDislike, getUserInfo, deletePost } from "../services/api";
import ReactTooltip from "react-tooltip";
import Edit from '../assets/Edit.svg';
import TrashCan from '../assets/TrashCan.svg';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Post({ idPost, userPost, likes, content }) {

    const history = useHistory();
    const { username, avatar } = userPost;
    const { user } = useContext(UserContext);
    let isLikedAux = false;
    const [isLiked, setIsLiked] = useState(isLikedAux);
    const listAux = [];
    const [listWhoLiked, setListWhoLiked] = useState(listAux);
    let messageAux = 'Ninguém curtiu ainda :(';
    const [likedMessage, setLikedMessage] = useState(messageAux);
    const [isMyPost, setIsMyPost] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    function whosPostIsThis() {
        if (user.id === userPost.id) {
            setIsMyPost(true);
        }
    }

    function callModal() {
        toggleModal();
    }

    function toggleModal() {
        setIsModalOpen(!isModalOpen)
    }

    function deleteThisPost() {
        setIsLoading(true);
        deletePost(user.token, idPost).then(() => {
            setIsLoading(false);
            toggleModal();
            window.location.reload();
        }).catch(alert('Não foi possível excluir o post'));
    }

    useEffect(() => {
        whoLiked()
        whosPostIsThis()
    }, [])

    return (
        <PostContainer>
            <UserContainer>
                <UserPic onClick={() => history.push(`/ user / ${username} `)} src={avatar} alt="{username}" />
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
                <TopPost>
                    <div>
                        <UserName>{username}</UserName>
                        <PostDescription>
                            <Hashtags>{content.text}</Hashtags>
                        </PostDescription>
                    </div>
                    <MyPostIcons isMyPost={isMyPost}>
                        <img onClick={callModal} src={TrashCan} alt='Delete icon' />
                        <img src={Edit} alt='Edit icon' />
                    </MyPostIcons>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={toggleModal}
                        style={modalStyles}
                    >
                        <ModalContent>
                            <ModalQuestion>Tem certeza que quer excluir esta publicação?</ModalQuestion>
                            <ContainerButtonsModal>
                                <ButtonCancel disabled={isLoading} onClick={toggleModal}><p>Não, voltar</p></ButtonCancel>
                                <ButtonDelete disabled={isLoading} onClick={deleteThisPost}><p>Sim, apagar</p></ButtonDelete>
                            </ContainerButtonsModal>
                        </ModalContent>
                    </Modal>
                </TopPost>
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

const MyPostIcons = styled.div`
    display: ${(props) => props.isMyPost ? 'flex' : 'none'};
    align-items: center;

    img {
        font-size: 14px;
        margin-left: 10px;
    }
`

const TopPost = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Hashtags = ({ children }) => (
    <ReactHashtag
        renderHashtag={(hashtagValue) => (
            <StyledHashtag>
                <Link to={"/hashtag/" + hashtagValue.replace("#", "")}>
                    {hashtagValue}
                </Link>
            </StyledHashtag>
        )}
    >
        {children}
    </ReactHashtag>
);

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
    }
}

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 15vh;
    width: 75vw;
`

const ModalQuestion = styled.p`
    font-size: 34px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    color: rgb(255, 255, 255);
    text-align: center;
`

const ContainerButtonsModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    height: 20%;
`

const ButtonCancel = styled.button`
    height: 100%;
    width: 45%;
    background-color: white;
    border: none;
    border-radius: 5px;

    p {
        color: rgb(24, 119, 242);
        font-size: 18px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
    }
`

const ButtonDelete = styled.button`
    height: 100%;
    width: 45%;
    background-color: rgb(24, 119, 242);
    border: none;
    border-radius: 5px;

    p{
        color: white;
        font-size: 18px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
    }
`