import Modal from "react-modal";
import "./styles.css"

interface ICharacterInfoModalProps { 
    isModalOpen: boolean;
    handleCloseModal: () => void;
}

export function CharacterInfoModal({ isModalOpen, handleCloseModal }: ICharacterInfoModalProps) {
    return (
        <Modal 
            isOpen={isModalOpen} 
            onRequestClose={handleCloseModal}
            className="modal"
            overlayClassName="overlay-modal"
        >

        </Modal>
    )
}