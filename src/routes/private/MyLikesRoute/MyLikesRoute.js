import "../../../styles/tooltip.css";
import { Container, Div, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { getPostsUserLiked, getUsersIFollow } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSection from "../../../components/LoadingSection";
import ScrollToTop from "react-scroll-up";

export default function MyLikesRoute() {
  const [lastPostID, setLastPostID] = useState(null)
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState(null);
  const { user } = useContext(UserContext);
  const { renderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    if (posts) {
      getPostsUserLiked(user.token)
        .then((res) => setPosts(res.data.posts));
    }
    getData();
  }, [renderPosts]);

  function getData() {
    getPostsUserLiked(user.token, lastPostID)
      .then(res => {
        const allPosts = res.data.posts;
        if (allPosts.length === 0) {
          if (!lastPostID) {
            setPosts([]);
            return;
          }
          setHasMore(false);
          return;
        }
        if (posts === null) {
          setPosts(allPosts);
        } else {
          setPosts([...posts, ...allPosts]);
        }
        const lastID = allPosts[allPosts.length - 1].id;
        setLastPostID(lastID);
      })
      .catch((err) => setPosts(err.status));
  }

  return (
    <Div>
      <Container>
        <PostContainer>
          <h1>my likes</h1>
          <InfiniteScroll
            dataLength={posts && posts.length}
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
            }
          >
            {renderPostsOrNot(posts)}
          </InfiniteScroll>
        </PostContainer>
      </Container>
    </Div>
  );
}
