import styled from "styled-components";
import Modal from 'react-modal';
import { ReactComponent as CloseIcon } from "../assets/Close.svg";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

Modal.setAppElement('#root');

export default function ContainerModal({ username, geolocation, isLoading, isDeleteModalOpen, setIsDeleteModalOpen, deleteThisPost, isLocationModalOpen, setIsLocationModalOpen }) {
  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        style={modalStyles}
      >
        <ModalDeleteContent>
          <ModalQuestion>Tem certeza que quer excluir esta publicação?</ModalQuestion>
          <ContainerButtonsModal>
            <ButtonCancel disabled={isLoading} onClick={() => setIsDeleteModalOpen(false)}><p>Não, voltar</p></ButtonCancel>
            <ButtonDelete disabled={isLoading} onClick={deleteThisPost}><p>Sim, apagar</p></ButtonDelete>
          </ContainerButtonsModal>
        </ModalDeleteContent>
      </Modal>
      <Modal
        isOpen={isLocationModalOpen}
        style={modalStyles}
      >
        {geolocation !== undefined &&
          <ModalLocationContent>
            <TopContainerModal>
              <h3>{username}'s location</h3>
              <CloseIcon onClick={() => setIsLocationModalOpen(false)} />
            </TopContainerModal>
            <MapContainer
              center={[geolocation.latitude, geolocation.longitude]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </ModalLocationContent>
        }
      </Modal>
    </>
  );
}

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333333',
    borderRadius: '20px',
  }
};

const ModalDeleteContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 600px;
  height: 260px;
	font-size: 14px;
	padding: 40px 50px;
	@media(max-width: 610px) {
		font-size: 12px;
		width: 400px;
    height: 260px;
  }
`;

const ModalLocationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: 300px;
	font-size: 38px;
	padding: 0 20px;
  @media(max-width: 610px) {
		font-size: 14px;
		width: 300px;;
    height: 360px;
    padding: 0 0;
  }
`;

const TopContainerModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  svg {
    cursor: pointer;
  }
  h3 {
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
  }
`;

const ModalQuestion = styled.p`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: rgb(255, 255, 255);
	text-align: center;
`;

const ContainerButtonsModal = styled.div`
	margin-top: 40px;
	@media(max-width: 610px) {
		margin-top: 10px;	
    }
`;

const Button = styled.button`
	margin: 0 13px;
	padding: 8px 23px;
	font-size: 18px;
	font-weight: bold;
	@media(max-width: 610px) {
		font-size: 14px;
        padding: 6px 15px;
    }
`;

const ButtonCancel = styled(Button)`
	color: #1877F2;
	background-color: #FFFFFF;
`;

const ButtonDelete = styled(Button)`
	color: #FFFFFF;
`;