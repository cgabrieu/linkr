import styled from "styled-components";
import Modal from 'react-modal';
import { useState } from 'react'
import { Link } from "react-router-dom";
import CloseModalX from '../assets/CloseModalX.svg'

Modal.setAppElement('#root');

export default function ContainerLinkPreview({ content }) {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    function toggleModal() {
        setIsPreviewModalOpen(!isPreviewModalOpen);
    }

    return (
        <ContainerLink onClick={toggleModal}>
            <Modal
                isOpen={isPreviewModalOpen}
                onRequestClose={toggleModal}
                style={previewModalStyle}
            >
                <ModalContent>
                    <ModalHeader>
                        <Link to={{ pathname: content.link }} target="_blank">
                            <SiteButton>Open in new tab</SiteButton>
                        </Link>
                        <CloseModal onClick={toggleModal}><img src={CloseModalX} /></CloseModal>
                    </ModalHeader>
                    <iframe src={content.link} height="95%" width="100%" title="Iframe site preview"></iframe>
                </ModalContent>
            </Modal>
            <ContentContainer>
                <h3>{content.linkTitle}</h3>
                <h4>{content.linkDescription}</h4>
                <p>{content.link}</p>
            </ContentContainer>
            <img src={content.linkImage} alt={content.linkTitle} />
        </ContainerLink>
    );
}

const ContainerLink = styled.div`
    height: 155px;
    max-width: 500px;
    border: 1px solid #4D4D4D;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    color: #CECECE;
    font-size: 11px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    h3 {
        font-size: 16px;
        @media(max-width: 610px) {
            font-size: 11px;
        }
    }
    h4 {
        color: #9B9595;
    }
    img {
        max-width: 153px;
        height: 155px;
        object-fit: cover;
        border-radius: 0px 12px 12px 0px;
        @media(max-width: 610px) {
            width: 95px;
            height: 115px;
        }
    }
    @media(max-width: 610px) {
        width: 100%;
        max-height: 115px;
        font-size: 9px;
    }
`;

const ContentContainer = styled.div`
    padding: 24px 27px 23px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media(max-width: 610px) {
        padding: 7px;
    }
`;

const previewModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#333333',
        borderRadius: '50px',
        width: '80vw',
        height: '80vh'
    },
    overlay: { zIndex: 5 }
};

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const ModalHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`

const SiteButton = styled.div`
    background-color: rgb(24, 119, 242);
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: white;
    width: 150px;
    height: 30px;
`

const CloseModal = styled.button`
    font-size: 14px;
    background-color: inherit;
    color: white;
`
