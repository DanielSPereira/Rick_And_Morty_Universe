import { CharacterCard } from "@/components/CharacterCard";
import { withLoader } from "@/utils/HOC/withLoader";
import { Character } from "@/types/character";
import { CardsWrapper } from "../styles";
import { CardSkeletonLoad } from "@/components/CharacterCard/Skeleton";

//----------------------------------------------------------------

interface IListProps extends Partial<JSX.Element> {
    data: Character[]; 
    handleOpenModal: () => void;
}

//----------------------------------------------------------------

const List = ({ data, handleOpenModal }: IListProps) => {
    return (
        <CardsWrapper>
            {data.map((character, idx) => (
                <CharacterCard
                    key={character.name + idx}
                    character={character} 
                    handleOpenModal={handleOpenModal} 
                />
            ))}
        </CardsWrapper>
    )
}

export default withLoader<Character, IListProps>(List, CardSkeletonLoad)