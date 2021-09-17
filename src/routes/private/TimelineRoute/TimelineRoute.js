import "../../../styles/tooltip.css";
import CreatePost from "./CreatePost";
import { Container, PostContainer } from "../../../styles/styles";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { getListPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";

export default function Timeline() {
  const [listPosts, setListPosts] = useState(null);
  const [renderTimeline, setRenderTimeline] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getListPosts(user.token)
      .then((res) => {
        setListPosts(res.data.posts);
      })
      .catch((err) => setListPosts(err.status));
    return () => setRenderTimeline(false);
  }, []);

  return (
    <Container>
      <PostContainer>
        <h1>timeline</h1>
        <CreatePost setRenderTimeline={setRenderTimeline} />
        {renderPostsOrNot(listPosts)}
      </PostContainer>
    </Container>
  );
}
