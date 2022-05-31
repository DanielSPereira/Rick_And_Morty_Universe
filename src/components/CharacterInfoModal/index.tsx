import { useCharacters } from "../../hooks/useCharacters";
import { FaStar, FaTimes } from "react-icons/fa";
import Modal from "react-modal";

import "./styles.css"
import { useMemo } from "react";

interface ICharacterInfoModalProps { 
    isModalOpen: boolean;
    handleCloseModal: () => void;
}

export function CharacterInfoModal({ isModalOpen, handleCloseModal }: ICharacterInfoModalProps) {
    const { selectedCharacter, favoriteCharacter, favoriteList } = useCharacters();

    const isFavorite = favoriteList?.includes(selectedCharacter?.id!);

    function getFormattedDate(date: string) {
        let newDate = new Date(date);
        let formattedDate = `${newDate.toLocaleString("en-US", { month: "long" })} ${newDate.getDay()}, ${newDate.getFullYear()}`

        return formattedDate;
    }

    return (
        <Modal 
            isOpen={isModalOpen} 
            onRequestClose={handleCloseModal}
            overlayClassName="overlay-modal"
            className="modal"
            ariaHideApp={false}
            contentLabel="modal"
        >
            <div className="back">
                <button type="button" onClick={() => favoriteCharacter(selectedCharacter?.id!)}>
                    <FaStar size={22} color={!!isFavorite ? "yellow" : "white"} />
                </button>
                <button type="button" onClick={handleCloseModal}>
                    <FaTimes size={25} color="white" />
                </button>
            </div>

            <img src={ selectedCharacter?.image } alt={ selectedCharacter?.name } />

            <div className="w-full py-4 px-8">
                <h1 data-testid="character-modal-name" className="character-name">{ selectedCharacter?.name }</h1>

                <span data-testid="character-modal-status" className="block">
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
                    <p data-testid="modal-last-known-location" className="answer">{ selectedCharacter?.location?.name }</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">First seen in:</span>
                    <p data-testid="first-seen-modal" className="answer">{ selectedCharacter?.episode[0]?.name }</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">Episodes Amount:</span>
                    <p data-testid="modal-episode-amount" className="answer">{ selectedCharacter?.episode?.length }</p>
                </span>

                <span className="block mt-3">
                    <span className="sub-title">Creation Date:</span>
                    <p data-testid="modal-character-created" className="answer">{ getFormattedDate(selectedCharacter?.created!) }</p>
                </span>
            </div>

        </Modal>
    )
}