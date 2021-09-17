import styled from "styled-components";
import { ReactComponent as SadIcon } from "../assets/error-sad.svg";

export default function NotFound({ typeError }) {
  return (
    <ContainerError>
      <SadIconWhite />
      {typeError}
    </ContainerError>
  );
}

const ContainerError = styled.div`
    height: 200px;
    display: flex;
    color: #FFFFFF;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-size: 23px;
	margin-top: 50px;

    @media(max-width: 610px) {
        height: 100px;
        font-size: 18px;
    }
`;

const SadIconWhite = styled(SadIcon)`
    fill: #FFFFFF;

    @media(max-width: 610px) {
        height: 50px;
    }
`;

