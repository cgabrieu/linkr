import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";

export default function SearchHashtag({ isSearching, setIsSearching }) {
  const [hashtag, setHashtag] = useState("");

  function search(e) {
    e.preventDefault();
    if (!isSearching) return setIsSearching(true);
    setIsSearching(false);
  }

  return (
    <Flex onSubmit={search}>
      {isSearching ? (
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="Pesquise aqui"
        />
      ) : null}
      <button type="submit">
        <IoSearchOutline color="black" size="16px" />
      </button>
    </Flex>
  );
}

const Flex = styled.form`
  display: inherit;
  align-items: center;

  input {
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    font-family: "Lato";
    color: #fff;

    width: 100px;
    padding: 5px 10px;
    background-color: transparent;
    border: none;
    outline: none;
  }

  button {
    display: grid;
    place-items: center;
    background-color: white;
    padding: 7px;
    cursor: pointer;
    border: none;
    border-radius: 50%;
  }
`;
