import "../../../styles/tooltip.css";
import CreatePost from "./CreatePost";
import { Container, PostContainer } from "../../../styles/styles";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { getUsersIFollow, getListPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";
import useInterval from 'react-useinterval';

export default function Timeline() {
  const [listPosts, setListPosts] = useState(null);
  const [isFollowingSomeone, setIsFollowingSomeone] = useState(true);
  const { user } = useContext(UserContext);
  const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    getUsersIFollow(user.token)
      .then(res => {
        const followedUsers = res.data.users
        if (followedUsers.length === 0) setIsFollowingSomeone(false);
      })
      .catch(err => setListPosts(err.status));

    getListPosts(user.token)
      .then((res) => {
        filterPosts(res.data.posts);
      })
      .catch((err) => setListPosts(err.status));
  }, [renderPosts]);

  useInterval(() => setRenderPosts(!renderPosts), 15000);

  function filterPosts(allPosts) {
    const postsFromFollowedUsers = allPosts.filter(post => post.user.id !== user.id);
    setListPosts(postsFromFollowedUsers);
  }

  return (
    <Container>
      <PostContainer>
        <h1>timeline</h1>
        <CreatePost />
        {renderPostsOrNot(listPosts, isFollowingSomeone)}
      </PostContainer>
    </Container>
  );
}
