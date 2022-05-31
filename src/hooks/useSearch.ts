import { useContextSelector } from "use-context-selector";
import { CharactersContext } from "../context/CharactersContext";

export function useSearch() {
    const selectedFilters = useContextSelector(CharactersContext, ctx => ctx.selectedFilters);
    const loading = useContextSelector(CharactersContext, ctx => ctx.loading);
    const filters = useContextSelector(CharactersContext, ctx => ctx.filters);
    const selectFilter = useContextSelector(CharactersContext, ctx => ctx.selectFilter);
    const searchForCharacter = useContextSelector(CharactersContext, ctx => ctx.searchForCharacter);
    

    
    return {
        loading,
        filters,
        selectedFilters,
        selectFilter,
        searchForCharacter
    };
} 