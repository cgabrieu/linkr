import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../../contexts/UserContext";
import { getUserInfo, getUserPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import { Container, PostContainer } from "../../../styles/styles";

export default function UserPosts() {
  const [listPosts, setListPosts] = useState(null);
  const [username, setUsername] = useState("");

  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getUserInfo(user.token, id)
      .then((res) => setUsername(res.data.user.username))
      .catch((err) => setListPosts(err.status));
    getUserPosts(user.token, id)
      .then((res) => {
        setListPosts(res.data.posts);
      })
      .catch((err) => setListPosts(err.status));
  }, []);

  return (
    <Container>
      <PostContainer>
        <h1>{username}'s posts</h1>
        {renderPostsOrNot(listPosts)}
      </PostContainer>
    </Container>
  );
}
