import LoadingSection from "../components/LoadingSection";
import NotFound from "../components/NotFound";
import Post from "../components/Post";
import { HashtagLink } from "../styles/styles"

const renderPostsOrNot = (listPosts) => {
  if (listPosts === null) return <LoadingSection />;
  else if (listPosts.length > 0) {
    return listPosts.map((postInfo) => (
      <Post key={postInfo.id} idPost={postInfo.id} userPost={postInfo.user} likes={postInfo.likes} content={postInfo} />
    ));
  } else if (listPosts.length === 0) {
    return <NotFound typeError={"Nenhum post encontrado."} />;
  }
  return (
    <NotFound
      typeError={
        listPosts +
        " - Houve uma falha ao obter os post, por favor atualize a página."
      }
    />
  );
};

const Hashtags = ({ children }) => {
  if (children.indexOf("#") === -1) return children;
  const listWordsAndHashtags = children.match(/(?:^|[ #])([^ #]+)/g);

  return (
    listWordsAndHashtags.map((word, index) => (
      word.startsWith('#')
        ? <HashtagLink key={index} to={"/hashtag/" + word.replace("#", "")}>
          {word + " "}
        </HashtagLink>
        : (word + " ")
    ))
  );
};



export { renderPostsOrNot, Hashtags };
