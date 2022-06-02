import { CardSkeletonLoad } from "../../CharacterCard/CardSkeletonLoad";
import { useCharacters } from "../../../hooks/useCharacters";
import { CharacterCard } from "../../CharacterCard";

export function ExploreList({ handleOpenModal }: { handleOpenModal: () => void}) {
    const { loading, characters } = useCharacters();

    return (
        loading ? (
            <div className="cards-wrapper">
                <CardSkeletonLoad />
            </div>
        ) : !loading && characters.length ? (
            <div className="cards-wrapper">
                {
                    characters.map((character, idx) => (
                        <CharacterCard
                            key={character.name + idx}
                            character={character} 
                            handleOpenModal={handleOpenModal} 
                        />
                    ))
                }
            </div>
        ) : !loading && !characters.length ? (
            <h1 className="block mx-auto text-center text-white text-3xl py-36">
                Could not find characters!
            </h1>
        ) : <></>
    )
};