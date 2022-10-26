import { CharacterCard } from "@/components/CharacterCard";
import { charactersWithLoaderHOC } from "@/utils/HOC/charactersWithLoaderHOC";
import { Character } from "@/types/character";
import { CardsWrapper } from "../styles";

const List = ({ characters, handleOpenModal }: { characters: Character[]; handleOpenModal: () => void }) => {
    return (
        <CardsWrapper>
            {characters.map((character, idx) => (
                <CharacterCard
                    key={character.name + idx}
                    character={character} 
                    handleOpenModal={handleOpenModal} 
                />
            ))}
        </CardsWrapper>
    )
}

export type ListType = typeof List;
export default charactersWithLoaderHOC(List)