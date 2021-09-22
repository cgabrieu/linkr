import React, { useContext, useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import UserContext from "../../contexts/UserContext";
import { getSearchedUser } from "../../services/api";

export default function SearchBar() {
  const [searchContent, setSearchContent] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { user } = useContext(UserContext);

  function submitSearch(e) {
    e.preventDefault();
    getSearchedUser(user.token)
      .then((res) => setSearchResult([...res.data.users]))
      .catch((err) => console.log(err.response));
  }

  return (
    <Form onSubmit={submitSearch}>
      <input
        type="text"
        value={searchContent}
        onChange={(e) => setSearchContent(e.target.value)}
        placeholder="Search for people and friends"
      />
      <button type="submit">
        <IoSearchOutline fontSize="22px" color="#c6c6c6" />
      </button>
    </Form>
  );
}

const Form = styled.form`
  position: fixed;
  width: 560px;
  height: 45px;
  top: calc((72px - 45px) / 2);
  left: calc((100% - 560px) / 2);

  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;

  input,
  button {
    height: 45px;
  }

  input {
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    color: #515151;
    width: 520px;
    border-radius: 8px 0 0 8px;
    padding: 7.5px 15px;
  }

  input::placeholder {
    color: #c6c6c6;
  }

  button {
    width: 40px;
    border-radius: 0 8px 8px 0;
    background-color: transparent;
  }
`;
