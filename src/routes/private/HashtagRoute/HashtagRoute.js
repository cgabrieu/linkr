import "../../../styles/tooltip.css";
import Post from "../../../components/Post";
import { Container, PostContainer } from "../../../styles/styles";
import LoadingSection from "../../../components/LoadingSection";
import NotFound from "../../../components/NotFound";
import UserContext from "../../../contexts/UserContext";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { getHashtagPosts } from "../../../services/api";
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

  console.log(hashtag, posts);

  const renderPostsOrNot = () => {
    if (posts === null) return <LoadingSection />
    else if (posts.length > 0) {
      return (
        posts.map((e) => <Post key={e.id} user={e.user} likes={e.likes} content={e} />)
      );
    }
    else if (posts.length === 0) {
      return <NotFound typeError={"Nenhum post encontrado."} />;
    }
    return <NotFound typeError={posts + " - Houve uma falha ao obter os post, por favor atualize a página."} />;
  }



  return (
    <Container>
      <PostContainer>
        <Title>{`# ${hashtag}`}</Title>
        {renderPostsOrNot()}
      </PostContainer>
    </Container>
  );
}

const Title = styled.h1`
  text-overflow: ellipsis;
  word-wrap: break-word;
`