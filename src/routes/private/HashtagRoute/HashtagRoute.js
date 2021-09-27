import "../../../styles/tooltip.css";
import { Container, Div, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { getHashtagPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSection from "../../../components/LoadingSection";
import ScrollToTop from "react-scroll-up";


export default function HashtagRoute() {

  const [lastPostID, setLastPostID] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState(null);
  const { hashtag } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (posts) {
      getHashtagPosts(user.token, hashtag)
        .then((res) => setPosts(res.data.posts))
    }
    getData();
  }, [hashtag]);

  function getData() {
    getHashtagPosts(user.token, hashtag, lastPostID)
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
        const lastID = allPosts[allPosts.length - 1].id
        setLastPostID(lastID)
      })
      .catch(err => setPosts(err.status))
  }

  return (
    <Div>
      <Container>
        <PostContainer>
          <Title>{`# ${hashtag}`}</Title>
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
                showUnder={0}
              >
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

const Title = styled.h1`
  text-overflow: ellipsis;
  word-wrap: break-word;
`