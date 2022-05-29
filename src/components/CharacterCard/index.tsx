import { FaStar } from "react-icons/fa";
import { useCharacters } from "../../hooks/useCharacters";
import { ICharacter } from "../../context/CharactersContext";
import "./styles.css"
import { useMemo } from "react";

interface ICharacterCardProps {
    character: ICharacter;
    handleOpenModal: () => void;
}

export function CharacterCard({ character, handleOpenModal }: ICharacterCardProps) {
    const { selectCharacter, favoriteCharacter, favoriteCharacters } = useCharacters();

    const isFavorite = useMemo(() => {
        return !!favoriteCharacters?.find((fc) => fc.id == character.id);
    }, [favoriteCharacters])

    return (
        <div className="card box-shadow">
            <img src={ character.image } alt={ character.name } />

            <span className="block flex flex-col justify-between  px-4 my-4">
                <span>
                    <span className="flex items-center justify-between">
                        <h1 className="character-name">{ character.name }</h1>

                        <button onClick={() => favoriteCharacter(character.id)} type="button" className="star-btn">
                            <FaStar size={22} color={isFavorite ? "yellow" : "white"} />
                        </button>
                    </span>

                    <span className="block">
                        { 
                            character.status == "Dead" ? (
                                <span className="status-circle dead"></span>
                            ) : (
                                <span className="status-circle alive"></span>
                            )
                        }
                        <p className="status-specie">{ character.status } - { character.species }</p>
                    </span>

                    <span className="block mt-3">
                        <span className="sub-title">First seen in:</span>
                        <p className="answer">{ character.episode[0].name }</p>
                    </span>
                </span>

                <button 
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