import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../../contexts/UserContext";
import { getUserInfo, getUserPosts } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import { Container, PostContainer } from "../../../styles/styles";

export default function UserPosts() {
  const [listPosts, setListPosts] = useState(null);
  const [name, setName] = useState("");

  const { user } = useContext(UserContext);
  const { idUser } = useParams();

  useEffect(() => {
    getUserInfo(user.token, idUser)
      .then((res) => setName(res.data.user.username))
      .catch((err) => setListPosts(err.status));

    getUserPosts(user.token, idUser)
      .then((res) => {
        setListPosts(res.data.posts);
      })
      .catch((err) => setListPosts(err.status));
  }, [user, name, idUser]);

  <Container>
    <PostContainer>
      <h1>{name}'s posts</h1>
      {renderPostsOrNot(listPosts)}
    </PostContainer>
  </Container>;
}
