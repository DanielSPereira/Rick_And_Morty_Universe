import { useContextSelector } from "use-context-selector";
import { CharactersContext } from "../context/CharactersContext";

export function useSearch() {
    const searchByName = useContextSelector(CharactersContext, ctx => ctx.searchByName);
    
    const loading = useContextSelector(CharactersContext, ctx => ctx.loading);
    const filters = useContextSelector(CharactersContext, ctx => ctx.filters);
    const selectedFilters = useContextSelector(CharactersContext, ctx => ctx.selectedFilters);
    const handleSelectFilter = useContextSelector(CharactersContext, ctx => ctx.handleSelectFilter);

    const handleSearchByName = useContextSelector(CharactersContext, ctx => ctx.handleSearchByName);
    

    
    return {
        selectedFilters,
        searchByName,
        loading,
        filters,
        handleSelectFilter,
        handleSearchByName,
    };
} 