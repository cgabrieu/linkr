import React, { useContext, useEffect, useState } from "react";
import { Container, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { getUserPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import RenderPostsContext from "../../../contexts/RenderPostsContext";

export default function MyPostsRoute() {
  const [listPosts, setListPosts] = useState(null);

  const { user } = useContext(UserContext);
  const { renderPosts, setRenderPosts } = useContext(RenderPostsContext);

  useEffect(() => {
    getUserPosts(user.token, user.id)
      .then((res) => setListPosts(res.data.posts))
      .catch((err) => setListPosts(err.status));
    return () => setRenderPosts(false);
  }, [renderPosts]);

  return (
    <Container>
      <PostContainer>
        <h1>my posts</h1>
        {renderPostsOrNot(listPosts)}
      </PostContainer>
    </Container>
  );
}
