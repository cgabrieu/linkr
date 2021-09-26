import React, { useContext, useEffect, useState } from "react";
import { Container, Div, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { getUserPosts, getUsersIFollow } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-up";
import LoadingSection from "../../../components/LoadingSection";

export default function MyPostsRoute() {
  const [lastPostID, setLastPostID] = useState(null)
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(10);
  const [listPosts, setListPosts] = useState(null);
  const { user } = useContext(UserContext);
  const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    console.log("Entrou");
    getData();
    return () => setRenderPosts(false);
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
          setListPosts(listPosts => [...listPosts, ...allPosts]);
        }
        const lastID = allPosts[allPosts.length - 1].id;
        setLastPostID(lastID);
        setItems(items + allPosts.length);
      })
      .catch((err) => setListPosts(err.status));
  }

  return (
    <Div>
      <Container>
        <PostContainer>
          <h1>my posts</h1>
          <InfiniteScroll
            dataLength={items}
            scrollThreshold={1}
            next={getData}
            hasMore={hasMore}
            loader={listPosts === null ? "" : <LoadingSection isScrolling={true} />}
            endMessage={
              <ScrollToTop
                style={{
                  position: 'initial',
                  textAlign: 'center',
                }}
                showUnder={0}>
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
