import Loader from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingSection({ isScrolling }) {
  return (
    <LoaderContainer>
      <Loader
        type="Oval"
        color="#6D6D6D"
        height={70}
        width={70}
      />
      <p>{isScrolling ? "Loading more posts..." : "Loading..."}</p>
    </LoaderContainer >
  );
}

const LoaderContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 23px;
    p {
        margin-top: 20px;
        color: #6D6D6D;
    }
`;
