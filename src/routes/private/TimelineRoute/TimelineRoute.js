import "../../../styles/tooltip.css";
import CreatePost from "./CreatePost";
import { Container, PostContainer } from "../../../styles/styles";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { getUsersIFollow, getListPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Timeline() {
  const [lastPostID, setLastPostID] = useState(10000)
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(10);
  const [listPosts, setListPosts] = useState(null);
  const [isFollowingSomeone, setIsFollowingSomeone] = useState(true);
  const { user } = useContext(UserContext);
  const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    getUsersIFollow(user.token)
      .then(res => {
        const followedUsers = res.data.users
        if (followedUsers.length === 0) setIsFollowingSomeone(false)
      })
      .catch(err => setListPosts(err.status))
    getData();
    return () => setRenderPosts(false);
  }, [renderPosts]);

  function getData() {
    getListPosts(user.token, lastPostID)
      .then((res) => {
        filterPosts(res.data.posts)
      })
      .catch((err) => setListPosts(err.status));
  }

  function filterPosts(allPosts) {
    if (allPosts.length === 0) {
      setHasMore(false);
      return;
    }
    const postsFromFollowedUsers = allPosts.filter(post => post.user.id !== user.id);
    const lastID = postsFromFollowedUsers[postsFromFollowedUsers.length - 1].id;
    setLastPostID(lastID)
    setItems(items + 10)
    if (listPosts === null) {
      setListPosts(postsFromFollowedUsers);
    } else {
      setListPosts(listPosts => [...listPosts, ...postsFromFollowedUsers]);
    }
  }

  return (
    <InfiniteScroll
      dataLength={items}
      scrollThreshold={1}
      next={getData}
      hasMore={hasMore}
      loader={<h4 style={{ textAlign: 'center' }}>Carregando...</h4>}
      endMessage={
        <h1 style={{ textAlign: 'center' }}>Todos os posts foram exibidos</h1>
      }>
      <Container>
        <PostContainer>
          <h1>timeline</h1>
          <CreatePost />
          {renderPostsOrNot(listPosts, isFollowingSomeone)}

        </PostContainer>
      </Container>
    </InfiniteScroll>
  );
}
