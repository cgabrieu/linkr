import Loader from "react-loader-spinner";
import styled from "styled-components";

function Loading() {
  return (
    <LoaderContainer>
      <Loader type="ThreeDots" color="#FFFFFF" height={70} width={70} />
    </LoaderContainer >
  );
}

const LoaderContainer = styled.div`
  left:5%;
  top:50%;
  position: relative;
  margin-left:-40px;
  margin-top:-40px;
`
export default Loading;
