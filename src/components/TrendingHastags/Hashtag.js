import { useHistory } from "react-router";
import styled from "styled-components";

export default function Hashtag({ hashtag }) {
  const hst = useHistory();
  const goToHashtag = () => hst.push(`/hashtag/${hashtag.name}`);
  return <HashtagItem onClick={goToHashtag}>#{hashtag.name}</HashtagItem>;
}

const HashtagItem = styled.li`
  font-size: 19px;
  line-height: 23px;
  font-weight: 700;
  font-family: "Lato";
  color: #fff;
  margin-bottom: 7px;
  cursor: pointer;
`;
