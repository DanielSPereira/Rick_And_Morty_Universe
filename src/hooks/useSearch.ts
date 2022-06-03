import { CharactersContext } from "../context/CharactersContext";
import { useContextSelector } from "use-context-selector";

export function useSearch() {
    const exploreSearch = useContextSelector(CharactersContext, ctx => ctx.exploreSearch);
    const favoritesSearch = useContextSelector(CharactersContext, ctx => ctx.favoritesSearch);
    
    const loading = useContextSelector(CharactersContext, ctx => ctx.loading);
    const filters = useContextSelector(CharactersContext, ctx => ctx.filters);
    const selectedFilters = useContextSelector(CharactersContext, ctx => ctx.selectedFilters);
    const handleSelectFilter = useContextSelector(CharactersContext, ctx => ctx.handleSelectFilter);

    const handleSearchByName = useContextSelector(CharactersContext, ctx => ctx.handleSearchByName);
    

    
    return {
        loading,
        filters,
        exploreSearch,
        selectedFilters,
        favoritesSearch,
        handleSelectFilter,
        handleSearchByName,
    };
} 