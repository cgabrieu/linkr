import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import { getUserInfo, getUserPosts, toggleFollowAPI, getUsersIFollow } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import { Container, PostContainer } from "../../../styles/styles";

export default function UserPostsRoute() {
  const [listPosts, setListPosts] = useState(null);
  let userAux = '';
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [userId, setUserId] = useState('');

  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getUserInfo(user.token, id)
      .then((res) => {
        userAux = res.data.user.username;
        setUsername(userAux)
        setAvatar(res.data.user.avatar)
        setUserId(res.data.user.id)
        getUsersIFollow(user.token).then((res) => {
          amIFollowing(res.data.users);
        })
      })
      .catch((err) => setListPosts(err.status));
    getUserPosts(user.token, id)
      .then((res) => {
        setListPosts(res.data.posts);
      })
      .catch((err) => setListPosts(err.status));
  }, []);

  function toggleIsFollowing() {
    setIsFollowing(!isFollowing);
    if (isFollowing === false) {
      toggleFollowAPI(user.token, userId, 'follow');
    } else {
      toggleFollowAPI(user.token, userId, 'unfollow');
    }
  }

  function amIFollowing(listFollowing) {
    listFollowing.map((userFromList) => {
      if (userFromList.username === userAux) {
        setIsFollowing(true);
        return;
      }
    })
  }

  return (
    <Container>
      <TopUserPage>
        <NameAndPhoto>
          <img src={avatar} />
          <h1>{username}</h1>
        </NameAndPhoto>
        <FollowButton onClick={toggleIsFollowing} isFollowing={isFollowing}>{isFollowing ? 'Unfollow' : 'Follow'}</FollowButton>
      </TopUserPage>
      <PostContainer>
        {renderPostsOrNot(listPosts)}
      </PostContainer>
    </Container>
  );
}

const NameAndPhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 25px;
  }
  
  h1 {
        font-size: 43px;
        font-weight: bold;
    }
`

const TopUserPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  width: 100%;
`

const FollowButton = styled.button`
  height: 31px;
  width: 110px;
  background-color: ${(props) => props.isFollowing ? 'white' : '1877f2'};
  color: ${(props) => props.isFollowing ? '#1877f2' : 'white'};;
  font-family: 'lato', sans-serif;
  font-weight: 700;
  font-size: 14px;
`