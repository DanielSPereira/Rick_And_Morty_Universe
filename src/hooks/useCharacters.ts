import { useContextSelector } from "use-context-selector";
import { CharactersContext } from "../context/CharactersContext";

export function useCharacters() {
    const loading = useContextSelector(CharactersContext, ctx => ctx.loading);
    const characters = useContextSelector(CharactersContext, ctx => ctx.filteredCharacters);
    const favoriteList = useContextSelector(CharactersContext, ctx => ctx.favoriteListIds);
    const selectedCharacter = useContextSelector(CharactersContext, ctx => ctx.selectedCharacter);
    const favoritesPagePagination = useContextSelector(CharactersContext, ctx => ctx.favoritesPagePagination);
    
    const handleSelectCharacter = useContextSelector(CharactersContext, ctx => ctx.handleSelectCharacter);
    const handleAddFavoriteCharacter = useContextSelector(CharactersContext, ctx => ctx.handleAddFavoriteCharacter);
    
    return {
        loading,
        characters,
        favoriteList,
        selectedCharacter,
        favoritesPagePagination,
        handleSelectCharacter,
        handleAddFavoriteCharacter,
    };
} 