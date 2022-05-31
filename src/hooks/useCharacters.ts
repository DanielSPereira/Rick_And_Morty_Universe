import { useContextSelector } from "use-context-selector";
import { CharactersContext } from "../context/CharactersContext";

export function useCharacters() {
    const characters = useContextSelector(CharactersContext, ctx => ctx.characters);
    const favoriteCharacters = useContextSelector(CharactersContext, ctx => ctx.favoriteCharacters);
    const selectedCharacter = useContextSelector(CharactersContext, ctx => ctx.selectedCharacter);
    const favoriteList = useContextSelector(CharactersContext, ctx => ctx.favoriteListIds);
    const loading = useContextSelector(CharactersContext, ctx => ctx.loading);
    const selectCharacter = useContextSelector(CharactersContext, ctx => ctx.selectCharacter);
    const favoriteCharacter = useContextSelector(CharactersContext, ctx => ctx.favoriteCharacter);


    
    return {
        loading,
        characters,
        favoriteCharacters,
        selectedCharacter,
        favoriteList,
        favoriteCharacter,
        selectCharacter
    };
} 