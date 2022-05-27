import { FaTimes } from "react-icons/fa";
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
            <div className="back">
                <button type="button" onClick={handleCloseModal}>
                    <FaTimes size={25} color="white" />
                </button>
            </div>
            <img src="https://images5.alphacoders.com/796/796108.jpg" alt="" />
            <div className="w-full py-4 px-8">
                <h1 className="character-name">Summer Smith</h1>

                <span className="block">
                    <span className="status-circle"></span>
                    <p className="status-specie">Alive - Human</p>
                </span>
                
                <span className="block mt-3">
                    <span className="sub-title">Last known location:</span>
                    <p className="answer">Earth &#40;Replacement Dimension&#41;</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">First seen in:</span>
                    <p className="answer">Mortynight Run</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">Episodes Amount:</span>
                    <p className="answer">5</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">Creation Date:</span>
                    <p className="answer">02/12/2018</p>
                </span>
        </div>

        </Modal>
    )
}