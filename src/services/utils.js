import LoadingSection from "../components/LoadingSection";
import NotFound from "../components/NotFound";
import Post from "../components/Post";

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

export { renderPostsOrNot };
