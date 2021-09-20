import "../../../styles/tooltip.css";
import CreatePost from "./CreatePost";
import { Container, PostContainer } from "../../../styles/styles";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { getListPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";
import useInterval from 'react-useinterval';

export default function Timeline() {
  const [listPosts, setListPosts] = useState(null);
  const { user } = useContext(UserContext);
  const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    console.log("entrou");
    getListPosts(user.token)
      .then((res) => {
        setListPosts(res.data.posts);
      })
      .catch((err) => setListPosts(err.status));
  }, [renderPosts]);

  useInterval(() => setRenderPosts(!renderPosts), 15000);

  return (
    <Container>
      <PostContainer>
        <h1>timeline</h1>
        <CreatePost />
        {renderPostsOrNot(listPosts)}
      </PostContainer>
    </Container>
  );
}
