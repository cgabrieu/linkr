import "../../../styles/tooltip.css";
import { Container, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { getPostsUserLiked } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";

export default function MyLikesRoute() {

  const [posts, setPosts] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getPostsUserLiked(user.token)
      .then(res => {
        setPosts(res.data.posts);
      })
      .catch(err => setPosts(err.status));
  }, []);

  return (
    <Container>
      <PostContainer>
        <h1>{user.username}</h1>
        {renderPostsOrNot(posts)}
      </PostContainer>
    </Container>
  );
}
