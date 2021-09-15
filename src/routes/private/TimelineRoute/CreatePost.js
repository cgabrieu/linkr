import styled from "styled-components";
import { UserContainer, UserPic } from "../../../styles/styles";

const testePic = "https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221";

export default function CreatePost() {
    return (
        <CreatePostContainer>
            <UserContainerCreatePost>
                <UserPic src={testePic} alt="{user.name}" />
            </UserContainerCreatePost>
            <form>
                <p>O que você tem para favoritar hoje?</p>
                <input type="url" placeholder="http://..." />
                <textarea placeholder="Muito irado esse link falando de #javascript" />
                <ContainerButton>
                    <button>Publicar</button>
                </ContainerButton>
            </form>
        </CreatePostContainer>
    );
}

const UserContainerCreatePost = styled(UserContainer)`
    @media(max-width: 610px) {
        display: none;  
    }
`;

const ContainerButton = styled.div`
    width: 100%;
    text-align: right;
`;

const CreatePostContainer = styled.div`
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    margin-bottom: 30px;
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
            @media(max-width: 610px) {
                font-size: 13px;
            }
        }
        input {
            height: 30px;
        }
        textarea {
            padding-top: 5px;
            height: 65px;
            @media(max-width: 610px) {
                height: 45px;
            }
        }
        button {
            font-weight: bold;
            padding: 7px 30px;
            color: #FFFFFF;
            align-self: right;
            @media(max-width: 610px) {
                height: 23px;
                padding: 3px 30px;
            }
        }
    }

    @media(max-width: 610px) {
        border-radius: 0;
        max-height: 165px;
        padding: 0 15px 10px 15px;
    }
`;