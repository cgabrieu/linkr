import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContainer } from "../styles/styles";
import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../contexts/UserContext";
import ContainerLinkPreview from "./ContainerLinkPreview";
import { deletePost, getListPosts, putEditUserPost } from "../services/api";
import Edit from '../assets/Edit.svg';
import TrashCan from '../assets/TrashCan.svg';
import Modal from 'react-modal';
import { Hashtags, getHashtagsLowerCase } from "../services/utils";
import RenderPostsContext from '../contexts/RenderPostsContext';
import UserLikeContainer from './UserLikeContainer'

Modal.setAppElement('#root');

export default function Post({ idPost, userPost, likes, content }) {

    const { username } = userPost;
    const { user } = useContext(UserContext);
    const [isMyPost, setIsMyPost] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setRenderPosts } = useContext(RenderPostsContext);
    const editFieldRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [textareaDescription, setTextareaDescription] = useState(content.text);

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
            getListPosts(user.token).then((res) => {
                setRenderPosts(true);
            }).catch(() => alert('Não foi possível excluir o post'));
        }).catch(() => alert('Não foi possível excluir o post'));
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsEditing(false);
        else if (e.key === 'Enter') {
            setIsLoading(true);
            putEditUserPost(idPost, getHashtagsLowerCase(textareaDescription), user.token)
                .then(() => {
                    setIsEditing(false);
                    setIsLoading(false);
                    setRenderPosts(true);
                })
                .catch(() => {
                    setIsLoading(false);
                    alert("Não foi possível salvar as alterações. Tente novamente.");
                });
        }
    };

    useEffect(() => {
        whosPostIsThis();
    }, [])

    useEffect(() => {
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
                <UserLikeContainer userPost={userPost} idPost={idPost} likes={likes} />
            </UserContainer>
            <MainPostContainer>
                <TopContainer>
                    <MyTopContainer>
                        <UserName>{username}</UserName>
                        <MyPostIcons isMyPost={isMyPost}>
                            <img onClick={callModal} src={TrashCan} alt='Delete icon' />
                            <img onClick={() => {
                                setIsEditing(!isEditing);
                                setTextareaDescription(content.text);
                            }}
                                src={Edit} alt='Edit icon' />
                        </MyPostIcons>
                    </MyTopContainer>

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
                        onChange={(e) => setTextareaDescription(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
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

const MyTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TextAreaPostDescription = styled.textarea`
    color: #4C4C4C;
    width: 100%;
    padding: 7px;
    margin: 5px 0;
    font-size: 14px;
    resize: none;
    @media (max-width: 610px) {
        font-size: 13px;
    }
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

const MyPostIcons = styled.div`
    display: ${(props) => props.isMyPost ? 'flex' : 'none'};
    align-items: center;

    img {
        font-size: 14px;
        margin-left: 10px;
    }
`

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