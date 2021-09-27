import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function SearchedUser({ user, setSearchContent }) {
  const hst = useHistory();

  const goToUser = () => {
    setSearchContent("");
    hst.push(`/user/${user.id}`);
  };

  return (
    <Flex onClick={goToUser}>
      <img src={user.avatar} alt={`Foto de perfil de ${user.username}`} />
      <strong>{user.username}</strong>
      {user.isFollowingLoggedUser ? <Following>• following</Following> : null}
    </Flex>
  );
}

const Flex = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px 15px 0;
  cursor: pointer;

  img {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    object-fit: cover;
  }

  strong {
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 19px;
    line-height: 23px;
    font-weight: 400;
    color: #515151;
  }
`;

const Following = styled.span`
  font-size: 19px;
  line-height: 23px;
  font-weight: 400;
  color: #c5c5c5;
`;
