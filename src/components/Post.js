import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContainer, UserPic } from "../styles/styles";
import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../contexts/UserContext";
import ContainerLinkPreview from "./ContainerLinkPreview";
import { deletePost, getListPosts, putEditUserPost } from "../services/api";
import Edit from "../assets/Edit.svg";
import TrashCan from "../assets/TrashCan.svg";
import { Hashtags, getHashtagsLowerCase, isYoutubeLink } from "../services/utils";
import UtilsContext from "../contexts/UtilsContext";
import UserLikeContainer from "./UserLikeContainer"
import { ReactComponent as PinPointIcon } from "../assets/PinPoint.svg"
import ContainerModal from "./ContainerModal"
import ReactPlayer from "react-player/youtube"
import { getListComments, postComment } from "../services/api";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Comment from "./Comment";

export default function Post({ content }) {

	const { id, user: userPost, likes, geolocation, link, text } = content;

	const { username } = userPost;
	const { renderPosts, setRenderPosts, listFollowing } = useContext(UtilsContext);
	const { user } = useContext(UserContext);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [textareaDescription, setTextareaDescription] = useState(text);
	const [isEditing, setIsEditing] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [listComments, setListComments] = useState([]);
	const [inputComment, setInputComment] = useState("");
	const [renderComments, setRenderComments] = useState(false);
	const editFieldRef = useRef();

	function deleteThisPost() {
		setIsLoading(true);
		deletePost(user.token, id)
			.then(() => {
				setIsLoading(false);
				setIsDeleteModalOpen(false);
				setRenderPosts(!renderPosts);
			})
			.catch(() => alert('Não foi possível excluir o post'));
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

	function postNewComment() {
		inputComment.length > 0 &&
			postComment(user.token, id, inputComment)
				.then(() => {
					setRenderComments(!renderComments);
					setInputComment("");
				});
	}

	useEffect(() => {
		getListComments(user.token, id)
			.then((res) => setListComments(res.data.comments));
	}, [renderComments]);

	useEffect(() => {
		if (isEditing) {
			editFieldRef.current.focus();
			const currFieldRef = editFieldRef.current;
			currFieldRef.selectionStart = currFieldRef.value.length;
			currFieldRef.selectionEnd = currFieldRef.value.length;
		}
	}, [isEditing]);

	return (
		<>
			<PostContainer>
				<UserContainer>
					<UserLikeContainer userPost={userPost} idPost={id} likes={likes} />
					<button onClick={() => setShowComments(!showComments)}>
						{listComments.length} Comments
					</button>
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
					{isYoutubeLink(link) ?
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
			</PostContainer>
			{showComments &&
				<CommentsContainer>
					{listComments.map((comment) =>
						<Comment
							key={comment.id}
							userPost={userPost}
							text={comment.text}
							user={comment.user}
							isFollowing={(listFollowing.findIndex((userComment) =>
								(userComment.id === comment.user.id)) > -1)}
						/>
					)}
					<InputCommentContainer>
						<UserPic src={user.avatar} alt={user.username} />
						<input
							type="text"
							value={inputComment}
							onChange={(e) => setInputComment(e.target.value)}
							placeholder="write a comment..."
						/>
						<PostCommentIcon
							onClick={postNewComment}
							onKeyDown={(e) => (e.key === 'Enter') && postNewComment()}
						/>
					</InputCommentContainer>
				</CommentsContainer>
			}
			<ContainerModal
				username={userPost.username}
				geolocation={geolocation}
				isLoading={isLoading}
				isDeleteModalOpen={isDeleteModalOpen}
				setIsDeleteModalOpen={setIsDeleteModalOpen}
				deleteThisPost={deleteThisPost}
				isLocationModalOpen={isLocationModalOpen}
				setIsLocationModalOpen={setIsLocationModalOpen}
			/>
		</>
	);
};

const PostCommentIcon = styled(IoPaperPlaneOutline)`
	position: absolute;
	font-size: 18px;
	right: 20px;
	top: 27px;
	cursor: pointer;
`;

const InputCommentContainer = styled.div`
	display: flex;
	padding: 15px 5px;
	position: relative;
	input {
		width: 100%;
		color: #817b7b;
		padding: 10px 35px 10px 15px;
		background-color: #252525;
		border-radius: 8px;
		&::placeholder {
			font-style: italic;
			color: #575757;
		}
	}
`;

const CommentsContainer = styled.ul`
	width: 100%;
	position: relative;
	top: -40px;
	padding: 25px 20px 0 20px;
	background-color: #1E1E1E;
	border-radius: 16px;
	img {
		width: 39px;
		height: 39px;
		margin-right: 18px;
	}
	@media(max-width: 610px) {
        border-radius: 0;
    }
`;

const PostContainer = styled.div`
	position: relative;
    width: 100%;
    background-color: #171717;
    border-radius: 16px;
    padding: 18px 20px;
    display: flex;
	z-index: 1;
	overflow-wrap: break-word;
	margin-bottom: 16px;
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

const UserName = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	p {
		max-width: 50%;
		font-size: 19px;
		white-space: nowrap;
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
