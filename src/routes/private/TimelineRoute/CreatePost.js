import styled from "styled-components";
import { UserContainer, UserPic } from "../../../styles/styles";
import React, { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { postPublish } from "../../../services/api";


export default function CreatePost() {
    const { user } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [inputFields, setInputFields] = useState({
        link: "",
        description: "",
    });

    const handleChange = (e) => {
        setInputFields(
            { ...inputFields, [e.target.name]: e.target.value }
        );
    }

    const sendPublish = (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        setIsLoading(true);
        postPublish(inputFields.link, inputFields.description, user.token)
            .then((res) => { 
                console.log(res);
                setIsLoading(false);
            })
            .catch(() => {
                setErrorMessage("Houve um erro ao publicar seu link.");
                setIsLoading(false);
            });
    }

    const validateInputs = () => {
        const linkField = inputFields.link;
        if (linkField.length === 0) { 
            setErrorMessage("O campo de link não pode ficar em branco.");
            return;
        }
        return true;
    }

    return (
        <CreatePostContainer>
            <UserContainerCreatePost>
                <UserPic src={user.avatar} alt={user.username} />
            </UserContainerCreatePost>
            <form onSubmit={sendPublish} onInvalid={() => setErrorMessage("Digite um link válido.")}>
                <p>O que você tem para favoritar hoje?</p>
                <input
                    type="url"
                    name="link"
                    value={inputFields.link}
                    onChange={handleChange}
                    placeholder="http://..."
                    disabled={isLoading}
                />
                <textarea
                    placeholder="Muito irado esse link falando de #javascript"
                    name="description"
                    value={inputFields.description}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <ContainerButton>
                    <p>{errorMessage}</p>
                    <button
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? "Publicando..." : "Publicar" }
                    </button>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    p {
        font-size: 17px !important;
        margin: 0px 17px !important;
        color: #d46363;
        @media(max-width: 610px) {
            font-size: 11px !important;
        }
    }
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
        font-weight: 300;
        font-family: 'Lato', sans-serif;
        color: #707070;
        p {
            font-size: 20px;
            line-height: 24px;
            margin-top: 5px;
            margin-bottom: 10px;
        }
        input, textarea {
            font-family: 'Lato', sans-serif;
            width: 100%;
            font-weight: inherit;
            font-size: 15px;
            color: #707070;
            background-color: #EFEFEF;
            margin-bottom: 5px;
            padding-left: 13px;
            resize: none;
            &:disabled {
                opacity: 0.7;
            }
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