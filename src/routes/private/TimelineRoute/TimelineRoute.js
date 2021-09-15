import "../../../styles/tooltip.css";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import { Container } from "../../../styles/styles";
import React, { useState } from "react";
import Post from "../../../components/Post";

export default function Timeline() {

    return (
        <Container>
            <ContainerTimeline>
                <h1>timeline</h1>
                <CreatePost />
                <Post />
            </ContainerTimeline>
            <TesteTrending />
        </Container>
    );
}

const ContainerTimeline = styled.div`
    width: 610px;
    h1 {
        margin-bottom: 45px;
        font-size: 43px;

        @media(max-width: 935px) {
            margin: 0 auto 19px 17px;
        }
    }
    
    @media(max-width: 935px) {
        margin: 0 auto;
    }
`;

const TesteTrending = styled.div`
    width: 300px;
    height: 405px;
    background-color: #171717;

    @media(max-width: 935px) {
        display: none;  
    }
`;

