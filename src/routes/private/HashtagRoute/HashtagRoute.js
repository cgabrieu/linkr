import "../../../styles/tooltip.css";
import { Container, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { getHashtagPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import styled from "styled-components";


export default function HashtagRoute() {

  const [posts, setPosts] = useState(null);
  const { hashtag } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setPosts(null);
    getHashtagPosts(user.token, hashtag)
      .then(res => {
        setPosts(res.data.posts);
      })
      .catch(err => setPosts(err.status))
  }, [hashtag]);


  return (
    <Container>
      <PostContainer>
        <Title>{`# ${hashtag}`}</Title>
        {renderPostsOrNot(posts)}
      </PostContainer>
    </Container>
  );
}

const Title = styled.h1`
  text-overflow: ellipsis;
  word-wrap: break-word;
`