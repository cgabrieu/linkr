import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../../contexts/UserContext";
import { getListPosts } from "../../../services/api";
import { Container, PostContainer } from "../../../styles/styles";

export default function UserPosts() {
  const [listPosts, setListPosts] = useState(null);
  const { user } = useContext(UserContext);
  const { idUser } = useParams();

  useEffect(() => {
    getListPosts(user.token)
      .then((res) => {
        setListPosts(res.data.posts);
        console.log(res.data);
      })
      .catch((err) => setListPosts(err.status));
  }, []);

  <Container>
    <PostContainer>
      <h1>timeline</h1>
      {renderPostsOrNot(listPosts)}
    </PostContainer>
  </Container>;
}
