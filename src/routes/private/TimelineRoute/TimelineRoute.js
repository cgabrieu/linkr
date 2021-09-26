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

export default function TimelineRoute() {
  const [lastPostID, setLastPostID] = useState(null);
  const [firstPostID, setFirstPostID] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [listPosts, setListPosts] = useState(null);
  const [isFollowingSomeone, setIsFollowingSomeone] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getUsersIFollow(user.token)
      .then((res) => {
        const followedUsers = res.data.users;
        if (followedUsers.length > 0) setIsFollowingSomeone(true);
      })
      .catch((err) => setListPosts(err.status));
    getData();
  }, []);

  function getData() {
    getListPosts(user.token, lastPostID)
      .then((res) => filterPosts(res.data.posts))
      .catch((err) => setListPosts(err.status));
  }

  function getRecentPosts() {
    if (firstPostID) {
      getListPosts(user.token, null, firstPostID)
        .then((res) => {
          const newPosts = res.data.posts;
          if (listPosts.length > 10) setListPosts([...listPosts, ...newPosts]);
          else setListPosts([...newPosts, ...listPosts]);
          if (newPosts.length > 0) setFirstPostID(newPosts[0].id);
        });
    } else {
      listPosts[0] && setFirstPostID(listPosts[0].id);
    }
  }

  useInterval(getRecentPosts, 15000);

  function filterPosts(allPosts) {
    if (allPosts.length === 0) {
      if (!isFollowingSomeone) {
        setListPosts([]);
        return;
      }
      setHasMore(false);
      return;
    }
    const postsFromFollowedUsers = allPosts.filter(post => post.user.id !== user.id);
    if (postsFromFollowedUsers.length === 0) {
      if (!isFollowingSomeone) {
        setListPosts([]);
        return;
      }
      setHasMore(false);
      return;
    }
    if (listPosts === null) {
      setListPosts(postsFromFollowedUsers);
    } else if (postsFromFollowedUsers.length !== 0) {
      setListPosts([...listPosts, ...postsFromFollowedUsers]);
    } else {
      setListPosts(...listPosts);
    }
    const lastID = postsFromFollowedUsers[postsFromFollowedUsers.length - 1].id;
    setLastPostID(lastID);
  }

  return (
    <Div>
      <Container>
        <PostContainer>
          <h1>timeline</h1>
          <CreatePost />
          <InfiniteScroll
            dataLength={listPosts && listPosts.length}
            scrollThreshold={1}
            next={getData}
            hasMore={hasMore}
            loader={lastPostID && <LoadingSection isScrolling={true} />}
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
    </Div>
  );
}