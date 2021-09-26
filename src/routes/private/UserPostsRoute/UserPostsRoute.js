import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import { getUserInfo, getUserPosts, toggleFollowAPI, getUsersIFollow } from "../../../services/api";
import { renderPostsOrNot } from "../../../services/utils";
import { Container, Div, PostContainer } from "../../../styles/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSection from "../../../components/LoadingSection";
import ScrollToTop from "react-scroll-up";

export default function UserPostsRoute() {
  const [lastPostID, setLastPostID] = useState(null)
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(10);
  const [listPosts, setListPosts] = useState(null);
  const [isFollowingSomeone, setIsFollowingSomeone] = useState(false)
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
          const followedUsers = res.data.users;
          if (followedUsers.length > 0) setIsFollowingSomeone(true);
          amIFollowing(followedUsers);
        })
      })
      .catch((err) => setListPosts(err.status));

    getData();
  }, [id]);

  function getData() {
    getUserPosts(user.token, id, lastPostID)
      .then((res) => {
        const allPosts = res.data.posts;
        if (allPosts.length === 0) {
          setHasMore(false)
          return
        }
        if (listPosts === null) {
          setListPosts(allPosts);
        } else {
          setListPosts(listPosts => [...listPosts, ...allPosts]);
        }
        const lastID = allPosts[allPosts.length - 1].id
        setLastPostID(lastID)
        setItems(items + 10)
      })
      .catch((err) => setListPosts(err.status));
  }

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
    <Div>
      <Container>
        <TopUserPage>
          <NameAndPhoto>
            <img src={avatar} />
            <h1>{username}</h1>
          </NameAndPhoto>
          <FollowButton onClick={toggleIsFollowing} isFollowing={isFollowing}>{isFollowing ? 'Unfollow' : 'Follow'}</FollowButton>
        </TopUserPage>
        <PostContainer>
          <InfiniteScroll
            dataLength={items}
            scrollThreshold={1}
            next={getData}
            hasMore={hasMore}
            loader={listPosts === null ? "" : <LoadingSection isScrolling={true} />}
            endMessage={
              <ScrollToTop
                style={{
                  position: 'initial',
                  textAlign: 'center',
                }}
                showUnder={0}>
                You have seen it all :) click here to scroll top
              </ScrollToTop>
            }
          >
            {renderPostsOrNot(listPosts)}
          </InfiniteScroll>
        </PostContainer>
      </Container>
    </Div>
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