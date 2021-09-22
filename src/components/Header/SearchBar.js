import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import UserContext from "../../contexts/UserContext";
import { getSearchedUser } from "../../services/api";
import SearchedUser from "./SearchedUser";

export default function SearchBar() {
  const [searchContent, setSearchContent] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    let isActive = true;
    getSearchedUser(user.token, searchContent)
      .then((res) => (isActive ? setSearchResult([...res.data.users]) : null))
      .catch((err) => console.log(err.response));
    return () => (isActive = false);
  }, [user, searchContent]);

  function submitSearch(e) {
    e.preventDefault();
  }

  return (
    <SearchContainer>
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
      <List display={(searchContent ? "block" : "none")}>
        {searchResult.map((user, key) => (
          <SearchedUser key={key} user={user} setSearchContent={setSearchContent} />
        ))}
      </List>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: fixed;
  width: 560px;
  max-height: 350px;
  top: calc((72px - 45px) / 2);
  left: calc((100% - 560px) / 2);
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;

  input {
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    color: #515151;
    width: 520px;
    height: 30px;
    border-radius: 8px 0 0 8px;
    box-sizing: border-box;
    padding: 7.5px 15px;
  }

  input::placeholder {
    color: #c6c6c6;
  }

  button {
    width: 40px;
    height: 45px;
    border-radius: 0 8px 8px 0;
    background-color: transparent;
  }
`;

const List = styled.ul`
  display: ${props => props.display};
  width: 100%;
  max-height: 230px;
  background-color: #e7e7e7;
  overflow-y: scroll;
  margin-top: -5px;
  padding-bottom: 15px;
`;
