import "../../../styles/tooltip.css";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import { Container, PostContainer } from "../../../styles/styles";
import React, { useState } from "react";
import Post from "../../../components/Post";
import LoadingTeste from "../../../components/LoadingTeste";
import NotFound from "../../../components/NotFound";

export default function Timeline() {

    const [responseData, setResponseData] = useState(true);

/*     useEffect(() => {
        


    }, []); */

    const renderPostOrNot = () => {
        if (responseData === null) return <LoadingTeste />
        else if (responseData) return <Post />
        else if (responseData.length === 0) {
            return <NotFound typeError={"Nenhum post encontrado."} />;
        }
        return <NotFound typeError={"Houve uma falha ao obter os post, por favor atualize a página."} />;
    }
    
    return (
        <Container>
            <PostContainer>
                <h1>timeline</h1>
                <CreatePost />
                {renderPostOrNot()}
            </PostContainer>
            <TesteTrending />
        </Container>
    );
}

const TesteTrending = styled.div`
    width: 300px;
    height: 405px;
    background-color: #171717;

    @media(max-width: 935px) {
        display: none;  
    }
`;

