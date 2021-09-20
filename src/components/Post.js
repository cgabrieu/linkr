import React, { useState, useContext, useEffect, useRef } from "react";
import { ReactComponent as DeleteIcon } from "../assets/trash.svg";
import { ReactComponent as EditIcon } from "../assets/pencil.svg";
import { putEditUserPost } from "../services/api";
import { Hashtags, getHashtagsLowerCase } from "../services/utils";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import ContainerLinkPreview from "./ContainerLinkPreview";
import UserLikeContainer from "./UserLikeContainer";
import RenderPostsContext from "../contexts/RenderPostsContext";

export default function Post({ idPost, userPost, likes, content }) {
  const [isEditing, setIsEditing] = useState(false);
  const [textareaDescription, setTextareaDescription] = useState(content.text);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);
  const { setRenderPosts } = useContext(RenderPostsContext);

  const editFieldRef = useRef();

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
      const currFieldRef = editFieldRef.current;
      currFieldRef.selectionStart = currFieldRef.value.length;
      currFieldRef.selectionEnd = currFieldRef.value.length;
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsEditing(false);
    else if (e.key === 'Enter') {
      setIsLoading(true);
      putEditUserPost(idPost, getHashtagsLowerCase(textareaDescription), user.token)
        .then(() => {
          console.log("Entrou")
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

  return (
    <PostContainer>
      <UserLikeContainer userPost={userPost} idPost={idPost} likes={likes} />
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
            onChange={(e) => setTextareaDescription(e.target.value)}
            onKeyDown={handleKeyDown}
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
  font-size: 14px;
  resize: none;
  @media (max-width: 610px) {
    font-size: 13px;
  }
`;

const UserName = styled.p`
  font-size: 19px;
`;