import LoadingSection from "../components/LoadingSection";
import NotFound from "../components/NotFound";
import Post from "../components/Post";
import { HashtagLink } from "../styles/styles"

const renderPostsOrNot = (listPosts, isFollowingSomeone = true) => {
  if (!listPosts) return <LoadingSection />;
  else if (listPosts.length > 0) {
    return listPosts.map((postInfo) => (
      <Post key={postInfo.id} idPost={postInfo.id} userPost={postInfo.user} likes={postInfo.likes} content={postInfo} />
    ));
  } else if (listPosts.length === 0) {
    if (!isFollowingSomeone) {
      return <NotFound typeError={"Você não segue ninguém ainda, procure por perfis na busca"} />;
    }
    else return <NotFound typeError={"Nenhuma publicação encontrada"} />;
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

const getHashtagsLowerCase = (description) => {
  const listHashtags = description.match(/#[A-Za-z0-9\u00C0-\u017F]*/g);
  listHashtags &&
    listHashtags.forEach((e, index) => {
      description = description.replace(e, listHashtags[index].toLowerCase());
    });
  return description;
}


export { renderPostsOrNot, Hashtags, getHashtagsLowerCase };
