import { ICharacter } from "../../context/CharactersContext";
import { useCharacters } from "../../hooks/useCharacters";
import { FaStar } from "react-icons/fa";
import { memo, useMemo } from "react";

import "./styles.css"
interface ICharacterCardProps {
    character: ICharacter;
    handleOpenModal: () => void;
}

function CharacterCardComponent({ character, handleOpenModal }: ICharacterCardProps) {
    const { selectCharacter, favoriteCharacter, favoriteCharactersIdsList } = useCharacters();

    const isFavorite = favoriteCharactersIdsList?.includes(character.id);

    return (
        <div className="card box-shadow">
            <img src={ character.image } alt={ character.name } />

            <span className="block flex flex-col justify-between  px-4 my-4">
                <span>
                    <span className="flex items-center justify-between">
                        <h1 data-testid="character-name" className="character-name">{ character.name }</h1>

                        <button data-testid="favorite-button" onClick={() => favoriteCharacter(character.id)} type="button" className="star-btn">
                            <FaStar size={22} color={isFavorite ? "yellow" : "white"} />
                        </button>
                    </span>

                    <span data-testid="character-status" className="block">
                        { 
                            character.status == "Dead" ? (
                                <span className="status-circle dead"></span>
                            ) : (
                                <span className="status-circle alive"></span>
                            )
                        }
                        <p data-testid="character-status-species" className="status-specie">
                            { character.status } - { character.species }
                        </p>
                    </span>

                    <span className="block mt-3">
                        <span className="sub-title">First seen in:</span>
                        <p data-testid="episode-name" className="answer">{ character.episode[0].name }</p>
                    </span>
                </span>

                <button 
                    data-testid="more-details"
                    type="button" 
                    className="view-details" 
                    onClick={() => {
                        selectCharacter(character.id);
                        handleOpenModal();
                    }}
                >
                    More Details
                </button>
            </span>
        </div>
    )
}

export const CharacterCard = memo(CharacterCardComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.character, nextProps.character)
});