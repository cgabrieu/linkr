import "../../../styles/tooltip.css";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import { Container, PostContainer } from "../../../styles/styles";
import React, { useState } from "react";
import Post from "../../../components/Post";
import LoadingTeste from "../../../components/LoadingTeste";

export default function Timeline() {

    const [isLoading, setIsLoading] = useState(true);

/*     useEffect(() => {
        


    }, []); */
    

    return (
        <Container>
            <PostContainer>
                <h1>timeline</h1>
                <CreatePost />
                {isLoading 
                ? <LoadingTeste />
                : <Post />}
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

