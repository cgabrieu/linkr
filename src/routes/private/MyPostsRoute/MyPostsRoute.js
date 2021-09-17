import React, { useContext, useEffect, useState } from "react";
import { Container, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { getUserPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";

export default function MyPostsRoute() {
  const [listPosts, setListPosts] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    let active = true;
    getUserPosts(user.token, user.id).then((res) =>
      active ? setListPosts(res.data.posts) : null
    );
    return () => (active = false);
  }, [user]);

  return (
    <Container>
      <PostContainer>
        <h1>my posts</h1>
        {renderPostsOrNot(listPosts)}
      </PostContainer>
    </Container>
  );
}
