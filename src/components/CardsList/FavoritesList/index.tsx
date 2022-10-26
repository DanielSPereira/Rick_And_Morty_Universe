import styled from "styled-components";
import { selectCharacters } from "@/features/characters/charactersSlice";
import { changePage, selectPagination } from "@/features/pagination/paginationSlice";
import { useAppStore } from "@/hooks/useAppStore";
import { createFavoritesPagePagination } from "@/utils/createFavoritesPagePagination";
import { Character } from "@/types/character";
import { CharacterCard } from "../../CharacterCard";
import { CardsWrapper } from "./styles";

const NotFindText = styled.h1`
    color: var(--text-body);
    font-size: 1.5rem;
    display: block;
    text-align: center;
    margin: auto;
`;

function FavoritesList({ handleOpenModal }: { handleOpenModal: () => void}) {
    const { favorites } = useAppStore(selectPagination);
    const { favoritesCharacters } = useAppStore(selectCharacters);

    const favoritesPaginated = createFavoritesPagePagination(favoritesCharacters);

    return (
        favoritesCharacters.length ? (
            <CardsWrapper>
                {
                    favoritesPaginated[favorites.currentPage - 1].map((favoriteCharacters: Character, idx: number) => (
                        <CharacterCard
                            key={favoriteCharacters.name + idx}
                            character={favoriteCharacters} 
                            handleOpenModal={handleOpenModal} 
                        />
                    ))
                }   
            </CardsWrapper>
        ) : (
            <NotFindText>Could not Find Characters!</NotFindText>
        )
    )
}

export default FavoritesList;
