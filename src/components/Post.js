import styled from "styled-components";
import { UserContainer } from "../styles/styles";
import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../contexts/UserContext";
import ContainerLinkPreview from "./ContainerLinkPreview";
import { deletePost, getListPosts, putEditUserPost } from "../services/api";
import Edit from "../assets/Edit.svg";
import TrashCan from "../assets/TrashCan.svg";
import { Hashtags, getHashtagsLowerCase } from "../services/utils";
import RenderPostsContext from "../contexts/RenderPostsContext";
import UserLikeContainer from "./UserLikeContainer"
import { ReactComponent as PinPointIcon } from "../assets/PinPoint.svg"
import ContainerModal from "./ContainerModal"
import ReactPlayer from "react-player/youtube"
import { Link } from "react-router-dom";
import { FaRetweet } from 'react-icons/fa';

export default function Post({ content }) {

	const { id, user: userPost, likes, geolocation, link, text, repostCount, repostedBy } = content;

	const { username } = userPost;
	const { user } = useContext(UserContext);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isReposted, setIsReposted] = useState(repostedBy ? true : false);
	const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);
	const [isEditing, setIsEditing] = useState(false);
	const [textareaDescription, setTextareaDescription] = useState(text);
	const editFieldRef = useRef();

	function deleteThisPost() {
		setIsLoading(true);
		deletePost(user.token, id).then(() => {
			setIsLoading(false);
			setIsDeleteModalOpen(false);
			getListPosts(user.token)
				.then(() => setRenderPosts(!renderPosts))
				.catch(() => alert('Não foi possível excluir o post'));
		}).catch(() => alert('Não foi possível excluir o post'));
	}

	function editThisPost(e) {
		if (e.key === 'Escape') setIsEditing(false);
		else if (e.key === 'Enter') {
			setIsLoading(true);
			putEditUserPost(id, getHashtagsLowerCase(textareaDescription), user.token)
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
		<PostContainer id="post" isReposted={isReposted} onClick={() => console.log(document.querySelector("#post").clientHeight)}>
			<RepostContainer isReposted={isReposted} isYoutube={isYoutube(link)}>
				<div>
					<RepostIcon />
					<p>Re-posted by <strong>{repostedBy && repostedBy.username !== user.username ? repostedBy.username : "you"}</strong></p>
				</div>
			</RepostContainer>
			<UserContainer>
				<UserLikeContainer userPost={userPost} idPost={id} likes={likes} repostCount={repostCount} repostedBy={repostedBy} setIsReposted={setIsReposted} />
			</UserContainer>
			<MainPostContainer>
				<TopContainer>
					<UserName>
						<p>{username}</p>
						{geolocation &&
							<PinPointIcon
								onClick={() => setIsLocationModalOpen(true)}
							/>}
					</UserName>
					{(userPost.id === user.id) &&
						<MyPostIcons>
							<img onClick={() => setIsDeleteModalOpen(true)} src={TrashCan} alt='Delete post' />
							<img
								onClick={() => {
									setIsEditing(!isEditing);
									setTextareaDescription(text);
								}}
								src={Edit} alt='Edit post'
							/>
						</MyPostIcons>}
				</TopContainer>
				{!isEditing ?
					<PostDescription>
						<Hashtags>
							{text}
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
				{isYoutube(link) ?
					<>
						<ReactPlayer
							url={link}
							width={'100%'}
							controls={true}
						/>
						<LinkYoutube href={link} target='_blank'>{link}</LinkYoutube>
					</>
					:
					<Link to={{ pathname: link }} target="_blank">
						<ContainerLinkPreview content={content} />
					</Link>
				}
			</MainPostContainer>
			<ContainerModal
				username={username}
				isLoading={isLoading}
				isDeleteModalOpen={isDeleteModalOpen}
				setIsDeleteModalOpen={setIsDeleteModalOpen}
				isLocationModalOpen={isLocationModalOpen}
				setIsLocationModalOpen={setIsLocationModalOpen}
				deleteThisPost={deleteThisPost}
				geolocation={geolocation}
			/>
		</PostContainer>
	);
};

const PostContainer = styled.div`
    width: 100%;
    background-color: #171717;
    border-radius: 16px;
    padding: 18px 20px 20px 18px;
    display: flex;
		gap: 22px;
    margin-bottom: ${({ isReposted }) => isReposted ? "50px" : "30px"};
		margin-top: ${({ isReposted }) => isReposted ? "50px" : "30px"};
		position: relative;
    @media(max-width: 610px) {
        border-radius: 0;
    }
`;

const RepostIcon = styled(FaRetweet)`
	width: 20px;
  height: 18px;
  cursor: pointer;
`

const RepostContainer = styled.div`
	position: absolute;
	background-color: #1E1E1E;
	height: 100px;
	width: 100%;
	bottom: ${({ isYoutube }) => isYoutube ? "420px" : "187px"};
	left: 0;
	border-radius: 16px;
	z-index: -1;
	display: ${({ isReposted }) => isReposted ? "initial" : "none"};

	div {
		margin-top: 7px;
		margin-left: 12px;
		display: flex;
		align-items: center;
		gap: 5px;

		p {
			font-size: 13px;
			
			strong {
				font-weight: 700;
				cursor: pointer;
			}
		}
	}

	@media(max-width: 610px) {
		border-radius: 0;
	}
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

const UserName = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	p {
		max-width: 50%;
		font-size: 19px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	svg {
		margin-left: 10px;
		cursor: pointer;
	}
`;

const MyPostIcons = styled.div`
	display: flex;
	align-items: center;
    img {
        margin-left: 10px;
		cursor: pointer;
    }
`;

const LinkYoutube = styled.a`
	font-size: 17px;
	color: rgb(183, 183, 183);
	display: flex;
	padding-top: 20px;
`;
