import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function SearchHashtag() {
  const history = useHistory();
  const [hashtag, setHashtag] = useState("");

  function search(e) {
    e.preventDefault();
    history.push(`/hashtag/${hashtag}`);
  }

  return (
    <form onSubmit={search}>
      <InputContainer type="submit">
        <span>#</span>
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="Pesquise aqui"
        />
      </InputContainer>
    </form>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.75px;
  width: 270px;
  margin: 0 15px 15px;
  padding: 3.75px 15px;
  border-radius: 8px;
  background-color: #252525;
  color: white;

  span {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
  }

  input {
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    font-family: "Lato";
    color: #fff;

    width: 100%;
    padding: 5px 0;
    background-color: transparent;
    border: none;
    outline: none;
  }

  input::placeholder {
    color: #575757;
  }
`;
