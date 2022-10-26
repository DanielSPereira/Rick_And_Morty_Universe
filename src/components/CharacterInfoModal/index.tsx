import React from "react";
import { FaStar, FaTimes } from "react-icons/fa";

import { addFavorite, removeFavorite, selectCharacters } from "@/features/characters/charactersSlice";

import { useAppStore } from "@/hooks/useAppStore";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { Back, Block, CustomModal, Info, Name, Status } from "./styles";
import Image from "next/image";

interface ICharacterInfoModalProps { 
    isModalOpen: boolean;
    handleCloseModal: () => void;
}

function CharacterInfoModal({ isModalOpen, handleCloseModal }: ICharacterInfoModalProps) {
    const { favoritesCharacters, selectedCharacter } = useAppStore(selectCharacters);
    const dispatch = useAppDispatch();

    const isFavorite = !!favoritesCharacters.find(char => char.id === selectedCharacter?.id);


    const getFormattedDate = (date: string) => {
        let newDate = new Date(date);
        let formattedDate = `${newDate.toLocaleString("en-US", { month: "long" })} ${newDate.getDay()}, ${newDate.getFullYear()}`

        return formattedDate;
    }

    return (
        <CustomModal 
            isOpen={isModalOpen} 
            onRequestClose={handleCloseModal}
            overlayClassName="overlay-modal"
            className="modal"
            ariaHideApp={false}
            contentLabel="modal"
        >
            <Back>
                <button 
                    type="button" 
                    onClick={() => {
                        if (!isFavorite) {
                            dispatch(addFavorite(selectedCharacter));
                        } else {
                            dispatch(removeFavorite(selectedCharacter));
                        }
                    }}
                >
                    <FaStar size={22} color={!!isFavorite ? "yellow" : "white"} />
                </button>
                <button type="button" onClick={handleCloseModal}>
                    <FaTimes size={25} color="white" />
                </button>
            </Back>

            <Image 
                src={selectedCharacter?.image ?? ""} 
                alt={selectedCharacter?.name}
                width="100%"
                height="100%"
                layout="responsive" 
            />

            <Info>
                <Name>{ selectedCharacter?.name }</Name>

                <Status isDead={selectedCharacter?.status == "Dead"}>
                    <span className="status-circle"></span>
                    <p className="status-specie">{ selectedCharacter?.status } - { selectedCharacter?.species }</p>
                </Status>
                
                <Block>
                    <span>Last known location:</span>
                    <p data-testid="modal-last-known-location">{ selectedCharacter?.location?.name }</p>
                </Block>

                <Block>
                    <span>First seen in:</span>
                    <p data-testid="first-seen-modal">{ selectedCharacter?.episode[0]?.name }</p>
                </Block>

                <Block>
                    <span>Episodes Amount:</span>
                    <p data-testid="modal-episode-amount">{ selectedCharacter?.episode?.length }</p>
                </Block>

                <Block>
                    <span>Creation Date:</span>
                    <p data-testid="modal-character-created">{ getFormattedDate(selectedCharacter?.created!) }</p>
                </Block>
            </Info>

        </CustomModal>
    )
}

export default CharacterInfoModal;
