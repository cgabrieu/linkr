import styled from "styled-components";

export default function ContainerLinkPreview({ content }) {
    return (
        <ContainerLink>
            <ContentContainer>
                <h3>{content.linkTitle}</h3>
                <h4>{content.linkDescription}</h4>
                <p>{content.link}</p>
            </ContentContainer>
            <img src={content.linkImage} />
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
    h3 {
        font-size: 16px;
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
            max-width: 95px;
            max-height: 115px;
        }
    }
    @media(max-width: 610px) {
        max-width: 288px;
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