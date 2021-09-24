import "../../../styles/tooltip.css";
import CreatePost from "./CreatePost";
import { Container, Div, PostContainer } from "../../../styles/styles";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { getUsersIFollow, getListPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";
import useInterval from 'react-useinterval';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSection from "../../../components/LoadingSection";
import ScrollToTop from "react-scroll-up";

export default function Timeline() {
  const [lastPostID, setLastPostID] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(10);
  const [listPosts, setListPosts] = useState(null);
  const [isFollowingSomeone, setIsFollowingSomeone] = useState(false);
  const { user } = useContext(UserContext);
  const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    getUsersIFollow(user.token)
      .then(res => {
        const followedUsers = res.data.users
        if (followedUsers.length > 0) setIsFollowingSomeone(true);
      })
      .catch(err => setListPosts(err.status));
    getData();
  }, [renderPosts]);

  useInterval(() => setRenderPosts(!renderPosts), 15000);

  function getData() {
    getListPosts(user.token, lastPostID)
      .then((res) => {
        filterPosts(res.data.posts)
      })
      .catch((err) => setListPosts(err.status));
  }

  function filterPosts(allPosts) {
    if (allPosts.length === 0) {
      if (!isFollowingSomeone) {
        setListPosts([])
        return
      }
      setHasMore(false);
      return
    }
    const postsFromFollowedUsers = allPosts.filter(post => post.user.id !== user.id);
    if (postsFromFollowedUsers.length === 0) {
      if (!isFollowingSomeone) {
        setListPosts([])
        return
      }
      setHasMore(false);
      return;
    }
    if (listPosts === null) {
      setListPosts(postsFromFollowedUsers)
    } else if (postsFromFollowedUsers.length !== 0) {
      setListPosts(listPosts => [...listPosts, ...postsFromFollowedUsers]);
    } else {
      setListPosts(...listPosts);
    }
    const lastID = postsFromFollowedUsers[postsFromFollowedUsers.length - 1].id;
    setLastPostID(lastID)
    setItems(items + 10)
  }

  return (
    <Div>
      <Container>
        <PostContainer>
          <h1>timeline</h1>
          <CreatePost />
          <InfiniteScroll
            dataLength={items}
            scrollThreshold={1}
            next={getData}
            hasMore={hasMore}
            loader={lastPostID === null ? "" : <LoadingSection isScrolling={true} />}
            endMessage={
              <ScrollToTop
                style={{
                  position: 'initial',
                  textAlign: 'center',
                }}
                showUnder={0}>
                You have seen it all :) click here to scroll top
              </ScrollToTop>
            }>
            {renderPostsOrNot(listPosts, isFollowingSomeone)}
          </InfiniteScroll>
        </PostContainer>
      </Container >
    </Div >
  );
}