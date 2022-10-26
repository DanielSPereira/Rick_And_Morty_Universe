import React from "react";
import { selectCharacters, selectFavoriteSpecie, selectFilters, selectSpecie } from "@/features/characters/charactersSlice";
import { selectPagination } from "@/features/pagination/paginationSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppStore } from "@/hooks/useAppStore";
import FiltersList from "./FiltersList";

import { Categories } from "./styles";

export function Filters() {
    const { species, selectedSpecies, favoritesSpecies, selectedFavoritesSpecies } = useAppStore(selectFilters);
    const { isLoading } = useAppStore(selectCharacters);
    const { page } = useAppStore(selectPagination);
    const dispatch = useAppDispatch();

    return (
        <Categories>
            <h1>Filters:</h1>
            
            <FiltersList
                selectSpecie={(filter: string) => dispatch(page === "all" ? selectSpecie(filter) : selectFavoriteSpecie(filter))}
                species={page === "all" ? species : favoritesSpecies} 
                selectedSpecies={page === "all" ? selectedSpecies : selectedFavoritesSpecies} 
                isLoading={isLoading} 
            />
        </Categories>
    )
}