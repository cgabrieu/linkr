import styled from "styled-components";
import { UserPic } from "../styles/styles";
import { Link } from "react-router-dom";

export default function Comment({ text, userPost, user, isFollowing }) {

    return (
        <CommentContainer>
            <Link to={"/user/" + user.id}>
                <UserPic src={user.avatar} alt={user.username} />
            </Link>
            <div>
                <h3>
                    <Link to={"/user/" + user.id}>
                        {user.username}
                    </Link>
                    <span>
                        {((userPost.id === user.id) && " • post’s author")
                        || (isFollowing && " • following")}
                    </span>
                </h3>
                <p>{text}</p>
            </div>
        </CommentContainer>
    );
}

const CommentContainer = styled.li`
	padding: 15px 5px 13px 5px;
	border-bottom: 1px solid #353535;
	display: flex;
	div {
        overflow: hidden;
        text-overflow: ellipsis;
		font-size: 14px;
        width: 60%;
		h3 {
			font-weight: bold;
			margin-bottom: 5px;
			span {
				color: #565656;
				font-weight: 400;
			}
		}
		p {
			color: #ACACAC;
		}
	}
`;


