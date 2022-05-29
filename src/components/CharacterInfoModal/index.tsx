import { FaStar, FaTimes } from "react-icons/fa";
import Modal from "react-modal";

import "./styles.css"
import { useCharacters } from "../../hooks/useCharacters";

interface ICharacterInfoModalProps { 
    isModalOpen: boolean;
    handleCloseModal: () => void;
}

export function CharacterInfoModal({ isModalOpen, handleCloseModal }: ICharacterInfoModalProps) {
    const { selectedCharacter } = useCharacters();

    function getFormattedDate(date: string) {
        console.log(selectedCharacter)
        let newDate = new Date(date);
        let formattedDate = `${newDate.toLocaleString("en-US", { month: "long" })} ${newDate.getDay()}, ${newDate.getFullYear()}`

        return formattedDate;
    }

    return (
        <Modal 
            isOpen={isModalOpen} 
            onRequestClose={handleCloseModal}
            className="modal"
            overlayClassName="overlay-modal"
        >
            <div className="back">
                <button type="button">
                    <FaStar size={22} color="white" />
                </button>
                <button type="button" onClick={handleCloseModal}>
                    <FaTimes size={25} color="white" />
                </button>
            </div>
            <img src={ selectedCharacter?.image } alt={ selectedCharacter?.name } />

            <div className="w-full py-4 px-8">
                <h1 className="character-name">{ selectedCharacter?.name }</h1>

                <span className="block">
                    { 
                        selectedCharacter?.status == "Dead" ? (
                            <span className="status-circle dead"></span>
                        ) : (
                            <span className="status-circle alive"></span>
                        )
                    }
                    <p className="status-specie">{ selectedCharacter?.status } - { selectedCharacter?.species }</p>
                </span>
                
                <span className="block mt-3">
                    <span className="sub-title">Last known location:</span>
                    <p className="answer">{ selectedCharacter?.location?.name }</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">First seen in:</span>
                    <p className="answer">{ selectedCharacter?.episode[0]?.name }</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">Episodes Amount:</span>
                    <p className="answer">{ selectedCharacter?.episode?.length }</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">Creation Date:</span>
                    <p className="answer">{ getFormattedDate(selectedCharacter?.created!) }</p>
                </span>
        </div>

        </Modal>
    )
}