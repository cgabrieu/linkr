import "../../../styles/tooltip.css";
import { Container, Div, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { getPostsUserLiked } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSection from "../../../components/LoadingSection";
import ScrollToTop from "react-scroll-up";

export default function MyLikesRoute() {
  const [lastPostID, setLastPostID] = useState(10000)
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(10);

  const [posts, setPosts] = useState(null);
  const { user } = useContext(UserContext);
  const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    getData()
    return () => setRenderPosts(false);
  }, [renderPosts]);

  function getData() {
    getPostsUserLiked(user.token, lastPostID)
      .then(res => {
        sortPostsDescendingId(res.data.posts)
      })
      .catch(err => setPosts(err.status));
  }

  function sortPostsDescendingId(allPosts) {
    if (allPosts.length === 0) {
      setHasMore(false)
      return
    }
    const orderedPosts = allPosts.sort((postA, postB) => postA.id < postB.id ? 1 : postA.id > postB.id ? -1 : 0);
    if (posts === null) {
      setPosts(orderedPosts)
    } else {
      setPosts(posts => [...posts, ...orderedPosts]);
    }
    const lastID = orderedPosts[orderedPosts.length - 1].id
    console.log(lastID);
    setLastPostID(lastID)
    setPosts(orderedPosts)
    setItems(items + 10)
  }

  return (
    <Div>
      <Container>
        <PostContainer>
          <h1>my likes</h1>
          <InfiniteScroll
            dataLength={items}
            scrollThreshold={1}
            next={getData}
            hasMore={hasMore}
            loader={posts === null ? "" : <LoadingSection isScrolling={true} />}
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
            {renderPostsOrNot(posts)}
          </InfiniteScroll>
        </PostContainer>
      </Container>
    </Div>
  );
}
