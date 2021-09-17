import React, { useContext, useEffect, useState } from "react";
import { Container, PostContainer } from "../../../styles/styles";
import UserContext from "../../../contexts/UserContext";
import { getUserPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";

export default function UserPosts() {
  const [listPosts, setListPosts] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getUserPosts(user.token, user.id)
      .then((res) => setListPosts(res.data.posts))
      .catch((err) => setListPosts(err.status));
  }, []);

  return (
    <Container>
      <PostContainer>
        <h1>my posts</h1>
        {renderPostsOrNot(listPosts)}
      </PostContainer>
    </Container>
  );
}
