import "../../../styles/tooltip.css";
import CreatePost from "./CreatePost";
import { Container, PostContainer } from "../../../styles/styles";
import React, { useState, useContext, useEffect } from "react";
import Post from "../../../components/Post";
import LoadingSection from "../../../components/LoadingSection";
import NotFound from "../../../components/NotFound";
import UserContext from "../../../contexts/UserContext";
import { getListPosts } from "../../../services/api"

export default function Timeline() {

    const [listPosts, setListPosts] = useState(null);

    const { user } = useContext(UserContext);


    useEffect(() => {
        getListPosts(user.token)
            .then(res => {
                setListPosts(res.data.posts);
                console.log(res.data);
            })
            .catch(err => setListPosts(err.status));
    }, []);
    
    const renderPostsOrNot = () => {
        if (listPosts === null) return <LoadingSection />
        else if (listPosts.length > 0) {
            return (
                listPosts.map((e) => <Post key={e.id} user={e.user} likes= {e.likes} content={e} />)
            );
        }
        else if (listPosts.length === 0) {
            return <NotFound typeError={"Nenhum post encontrado."} />;
        }
        return <NotFound typeError={listPosts + " - Houve uma falha ao obter os post, por favor atualize a página."} />;
    }
    
    return (
        <Container>
            <PostContainer>
                <h1>timeline</h1>
                <CreatePost />
                {renderPostsOrNot()}
            </PostContainer>
        </Container>
    );
}