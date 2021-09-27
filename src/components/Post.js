import styled from "styled-components";
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
import UserLikeContainer from './UserLikeContainer';
import ReactPlayer from 'react-player/youtube'

Modal.setAppElement('#root');

export default function Post({ idPost, userPost, likes, content }) {

	const { username } = userPost;
	const { user } = useContext(UserContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);
	const [isEditing, setIsEditing] = useState(false);
	const [textareaDescription, setTextareaDescription] = useState(content.text);
	const editFieldRef = useRef();

	function toggleModal() {
		setIsModalOpen(!isModalOpen);
	}

	function deleteThisPost() {
		setIsLoading(true);
		deletePost(user.token, idPost).then(() => {
			setIsLoading(false);
			toggleModal();
			getListPosts(user.token)
				.then(() => setRenderPosts(!renderPosts))
				.catch(() => alert('Não foi possível excluir o post'));
		})
		.catch(() => alert('Não foi possível excluir o post'));
	}

	function editThisPost(e) {
		if (e.key === 'Escape') setIsEditing(false);
		else if (e.key === 'Enter') {
			setIsLoading(true);
			putEditUserPost(idPost, getHashtagsLowerCase(textareaDescription), user.token)
				.then(() => {
					setIsEditing(false);
					setIsLoading(false);
					setRenderPosts(!renderPosts);
				})
				.catch(() => {
					setIsLoading(false);
					alert("Não foi possível salvar as alterações. Tente novamente.");
				});
		}
	};

	function isYoutube(urlVideo) {
		const rule = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
		return rule.test(urlVideo);
	}

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
					<UserName>{username}</UserName>
					{(userPost.id === user.id) &&
						<MyPostIcons>
							<img onClick={toggleModal} src={TrashCan} alt='Delete post' />
							<img
								onClick={() => {
									setIsEditing(!isEditing);
									setTextareaDescription(content.text);
								}}
								src={Edit} alt='Edit post'
							/>
						</MyPostIcons>}
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
					</PostDescription> :
					<TextAreaPostDescription
						value={textareaDescription}
						disabled={isLoading}
						onChange={(e) => setTextareaDescription(e.target.value)}
						onKeyDown={editThisPost}
						ref={editFieldRef}
					/>
				}
				{isYoutube(content.link) ?
					<>
						<ReactPlayer
							url={content.link}
							width={'100%'}
							controls={true}
						/>
						<LinkYoutube href={content.link} target='_blank'>{content.link}</LinkYoutube>
					</>
					:
					<ContainerLinkPreview content={content} />
				}
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
	overflow-wrap: break-word;

    @media(max-width: 610px) {
        border-radius: 0;
    }
`;

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
	width: 100%;
    max-width: 505px;
    @media(max-width: 610px) {
		width: 100%;
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
	width: 80%;
    font-size: 19px;
	overflow: hidden;
  	text-overflow: ellipsis;
`;

const MyPostIcons = styled.div`
	display: flex;
	align-items: center;
    img {
        margin-left: 10px;
		cursor: pointer;
    }
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
	}
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

const LinkYoutube = styled.a`
	font-size: 17px;
	color: rgb(183, 183, 183);
	display: flex;
	padding-top: 20px;
`