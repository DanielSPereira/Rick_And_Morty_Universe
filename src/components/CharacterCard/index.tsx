import React from "react";
import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { Character } from "@/types/character";

import { addFavorite, removeFavorite, selectCharacters, setCharacter } from "@/features/characters/charactersSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppStore } from "@/hooks/useAppStore";

import { Card, CardContainer, DetailsButton, FirstSeenIn, Info, Title } from "./styles";
import Image from "next/image";

interface ICharacterCardProps {
    character: Character;
    handleOpenModal: () => void;
}

function CharacterCardComponent({ character, handleOpenModal }: ICharacterCardProps) {
    const { favoritesCharacters } = useAppStore(selectCharacters);
    const isFavorite = !!favoritesCharacters.find(char => char?.id === character.id);
    const dispatch = useAppDispatch();

    return (
        <Card data-testid="character-card">
            <Image 
                src={character.image} 
                alt={character.name}
                width="100%"
                height="100%"
                layout="responsive" 
            />

            <CardContainer>
                <span>
                    <Title>
                        <h1 data-testid="character-name" className="character-name">{ character.name }</h1>

                        <button 
                            data-testid="favorite-button" 
                            type="button" 
                            className="star-btn"
                            onClick={() => {
                                if (!isFavorite) {
                                    dispatch(addFavorite(character));
                                } else {
                                    dispatch(removeFavorite(character));
                                }
                            }}
                        >
                            <FaStar size={22} color={isFavorite ? "yellow" : "white"} />
                        </button>
                    </Title>

                    <Info>
                        { 
                            character.status == "Dead" ? (
                                <span 
                                    data-testid="character-circle" 
                                    className="status-circle dead"
                                ></span>
                            ) : (
                                <span 
                                    data-testid="character-circle" 
                                    className="status-circle alive"
                                ></span>
                            )
                        }
                        <p data-testid="character-status-species" className="status-specie">
                            { character.status } - { character.species }
                        </p>
                    </Info>

                    <FirstSeenIn>
                        <span className="sub-title">First seen in:</span>
                        <p data-testid="episode-name" className="answer">{ character.episode[0].name }</p>
                    </FirstSeenIn>
                </span>

                <DetailsButton 
                    data-testid="more-details"
                    type="button" 
                    onClick={() => {
                        dispatch(setCharacter(character));
                        handleOpenModal();
                    }}
                >
                    More Details
                </DetailsButton>
            </CardContainer>
        </Card>
    )
}

export const CharacterCard = memo(CharacterCardComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.character, nextProps.character)
});