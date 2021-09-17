import LoadingSection from "../components/LoadingSection";
import NotFound from "../components/NotFound";
import Post from "../components/Post";

const renderPostsOrNot = (listPosts) => {
  if (listPosts === null) return <LoadingSection />;
  else if (listPosts.length > 0) {
    return listPosts.map((e) => (
      <Post key={e.id} user={e.user} likes={e.likes} content={e} />
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
