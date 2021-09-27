import "../../../styles/tooltip.css";
import CreatePost from "./CreatePost";
import { Container, Div, PostContainer } from "../../../styles/styles";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { getUsersIFollow, getListPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import useInterval from 'react-useinterval';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSection from "../../../components/LoadingSection";
import ScrollToTop from "react-scroll-up";
import UtilsContext from "../../../contexts/UtilsContext";

export default function Timeline() {
  const [lastPostID, setLastPostID] = useState(null);
  const [firstPostID, setFirstPostID] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [listPosts, setListPosts] = useState(null);
  const { user } = useContext(UserContext);
  const { setListFollowing, listFollowing } = useContext(UtilsContext);

  useEffect(() => {
    getUsersIFollow(user.token)
      .then((res) => {
        const followedUsers = res.data.users;
        if (followedUsers.length > 0) {
          setListPosts([]);
          setListFollowing(followedUsers);
        }
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
          const newPosts = res.data.posts.filter(post => post.user.id !== user.id);
          if (listPosts.length > 10) setListPosts([...listPosts, ...newPosts]);
          else setListPosts([...newPosts, ...listPosts]);
          if (newPosts.length > 0) setFirstPostID(newPosts[0].id);
        });
    } else {
      setFirstPostID(listPosts[0].id);
    }
  }

  useInterval(getRecentPosts, 15000);

  function filterPosts(allPosts) {
    if (allPosts.length === 0) {
      if (!listFollowing) {
        setListPosts([]);
        return;
      }
      setHasMore(false);
      return;
    }
    const postsFromFollowedUsers = allPosts.filter(post => post.user.id !== user.id);

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
            {renderPostsOrNot(listPosts, listFollowing)}
          </InfiniteScroll>
        </PostContainer>
      </Container >
    </Div>
  );
}