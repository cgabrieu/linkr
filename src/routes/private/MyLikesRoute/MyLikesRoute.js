import "../../../styles/tooltip.css";
import Post from "../../../components/Post";
import { Container, PostContainer } from "../../../styles/styles";
import LoadingSection from "../../../components/LoadingSection";
import NotFound from "../../../components/NotFound";
import UserContext from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { getPostsUserLiked } from "../../../services/api";

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
        <h1>{user.username}</h1>
        {renderPostsOrNot()}
      </PostContainer>
    </Container>
  );
}
