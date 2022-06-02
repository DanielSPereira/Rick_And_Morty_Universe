import { ICharacter } from "../../../reducers/CharactersReducer";
import { useCharacters } from "../../../hooks/useCharacters";
import { CharacterCard } from "../../CharacterCard";

export function FavoritesList({ handleOpenModal }: { handleOpenModal: () => void}) {
    const { favoritesPagePagination } = useCharacters();

    return (
        favoritesPagePagination?.length ? (
            <div className="cards-wrapper">
                {
                    favoritesPagePagination?.map((favoriteCharacters: ICharacter, idx: number) => (
                        <CharacterCard
                            key={favoriteCharacters.name + idx}
                            character={favoriteCharacters} 
                            handleOpenModal={handleOpenModal} 
                        />
                    ))
                }
            </div>
        ) : (
            <h1 className="block mx-auto text-center text-white text-3xl py-36">
                Could not find characters!
            </h1>
        )
    )
}