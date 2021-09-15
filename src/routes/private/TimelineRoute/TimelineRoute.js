import styled from "styled-components";

import { Container } from "../../../styles/styles";

export default function Timeline() {
    return (
        <Container>
            <ContainerTimeline>
                <h1>timeline</h1>
                <CreatePost>
                    <UserPic src="https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221" alt="{user.name}" />
                    <form>
                        <p>O que você tem para favoritar hoje?</p>
                        <input type="url" placeholder="http://..." />
                        <textarea placeholder="Muito irado esse link falando de #javascript" />
                        <ContainerButton>
                            <button>Publicar</button>
                        </ContainerButton>
                    </form>
                </CreatePost>
            </ContainerTimeline>
            <TesteTrending />
        </Container>
    );
}

const ContainerTimeline = styled.div`
    width: 610px;
    h1 {
        margin-bottom: 45px;

        @media(max-width: 935px) {
            margin-left: 17px;  
        }
    }
    
    @media(max-width: 935px) {
        margin: 0 auto;
    }
`;

const CreatePost = styled.div`
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    form {
        width: 100%;
        color: #707070;
        font-weight: 300;
        font-family: 'Lato', sans-serif;
        p {
            font-size: 20px;
            color: #707070;
            line-height: 24px;
            margin-top: 5px;
            margin-bottom: 10px;
        }
        input, textarea {
            font-family: 'Lato', sans-serif;
            width: 100%;
            font-weight: inherit;
            font-size: 15px;
            background-color: #EFEFEF;
            margin-bottom: 5px;
            padding-left: 13px;
            resize: none;
            color: #949494;
        }
        input {
            height: 30px;
        }
        textarea {
            padding-top: 5px;
            height: 65px;
        }
        button {
            font-weight: bold;
            padding: 7px 30px;
            color: #FFFFFF;
            align-self: right;
        }
    }

    @media(max-width: 610px) {
        border-radius: 0;
    }
`;

const ContainerButton = styled.div`
    width: 100%;
    text-align: right;
`

const UserPic = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 18px;
    border-radius: 50%;
    object-fit:cover;

    @media(max-width: 610px) {
        display: none;  
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

