import React, { useContext, useEffect, useState } from "react";
import { Container, Div, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { getUserPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import UtilsContext from "../../../contexts/UtilsContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-up";
import LoadingSection from "../../../components/LoadingSection";

export default function MyPostsRoute() {
  const [lastPostID, setLastPostID] = useState(null)
  const [hasMore, setHasMore] = useState(true);
  const [listPosts, setListPosts] = useState(null);
  const { user } = useContext(UserContext);
  const { renderPosts } = useContext(UtilsContext);

  useEffect(() => {
    if (listPosts) {
      getUserPosts(user.token, user.id)
        .then((res) => setListPosts(res.data.posts));
    }
    getData();
  }, [renderPosts]);


  function getData() {
    getUserPosts(user.token, user.id, lastPostID)
      .then((res) => {
        const allPosts = res.data.posts;
        if (allPosts.length === 0) {
          if (!lastPostID) {
            setListPosts([]);
            return;
          }
          setHasMore(false);
          return;
        }
        if (listPosts === null) {
          setListPosts(allPosts);
        } else {
          setListPosts([...listPosts, ...allPosts]);
        }
        const lastID = allPosts[allPosts.length - 1].id;
        setLastPostID(lastID);
      })
      .catch((err) => setListPosts(err.status));
  }

  return (
    <Div>
      <Container>
        <PostContainer>
          <h1>my posts</h1>
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
                showUnder={0}
              >
                You have seen it all :) click here to scroll top
              </ScrollToTop>
            }
          >
            {renderPostsOrNot(listPosts)}
          </InfiniteScroll>
        </PostContainer>
      </Container>
    </Div>
  );
}
