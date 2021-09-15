import styled from "styled-components";
import Hashtag from "./Hashtag";

export default function TrendingHashtags() {
  const hashtags = [
    {
      id: 2,
      name: "respondeai",
      numberOfMentions: 1,
    },
    {
      id: 1,
      name: "rickroll",
      numberOfMentions: 1,
    },
  ];

  return (
    <FixedContainer>
      <TitleSection>
        <h2>trending</h2>
      </TitleSection>
      <Hashtags>
        {hashtags.map((hashtag, key) => (
          <Hashtag key={key} hashtag={hashtag} />
        ))}
      </Hashtags>
    </FixedContainer>
  );
}

const FixedContainer = styled.div`
  position: fixed;
  top: 125px;
  left: calc((100% + 300px) / 2);

  width: 300px;
  height: 405px;
  border-radius: 16px;
  background-color: #171717;

  @media (max-width: 935px) {
    display: none;
  }
`;

const TitleSection = styled.div`
  padding: 15px;
  border-bottom: solid 1px #484848;

  h2 {
    font-size: 27px;
    line-height: 31px;
    font-weight: 700;
    font-family: "Oswald";
    color: #fff;
  }
`;

const Hashtags = styled.ul`
  padding: 15px;
  overflow-y: scroll;
`;
