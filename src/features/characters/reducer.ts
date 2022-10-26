import { applyFilters } from "@/utils/applyFilters";
import { createFiltersCombination } from "@/utils/createFilterCombination";
import { InitialState } from "./charactersSlice";

export type ReducerFunction = (state: InitialState, action: { payload: any; type: string }) => void;
export type Reducers = {
    [key: string]: ReducerFunction;
} 

export const reducers: Reducers = {
    
    searchFilter(state, action) {
        state.searchFilter = action.payload;

        if (action.payload) {
            const filteredList = applyFilters({
                filters: state.selectedSpecies,
                searchFilter: action.payload,
                dataSource: state.favoritesCharacters,
            });

            state.filteredFavoritesCharacters = filteredList;

            state.favoritesSpecies = filteredList.reduce(
                (acc: Array<string>, curr) => !acc.includes(curr.species) ? [...acc, curr.species] : acc, ["All"]
            );
        } else {
            state.favoritesSpecies = state.favoritesCharacters.reduce(
                (acc: Array<string>, curr) => !acc.includes(curr.species) ? [...acc, curr.species] : acc, ["All"]
            );

            state.filteredFavoritesCharacters = state.favoritesCharacters;
        }
    },

    removeFavorite(state, action) {
        let updatedList = state.favoritesCharacters.filter(char => char.id != action.payload.id);
                    
        state.favoritesCharacters = updatedList;
        state.filteredFavoritesCharacters = applyFilters({
            searchFilter: state.searchFilter,
            filters: state.selectedSpecies,
            dataSource: updatedList,
        });

        state.favoritesSpecies = updatedList.reduce(
            (acc: Array<string>, curr) => !acc.includes(curr.species) ? [...acc, curr.species] : acc, ["All"]
        );

        let selectedSpecieStillInList = !!state.favoritesSpecies.find(specie => state.selectedFavoritesSpecies.includes(specie));
    
        if (!selectedSpecieStillInList) {
            state.selectedFavoritesSpecies = ["All"]
        }
    },

    addFavorite(state, action) {
        let updatedList = state.favoritesCharacters.concat(action.payload);

        state.favoritesCharacters = updatedList;
        state.filteredFavoritesCharacters  = applyFilters({
            searchFilter: state.searchFilter,
            filters: state.selectedSpecies,
            dataSource: updatedList,
        });

        state.favoritesSpecies = updatedList.reduce(
            (acc: Array<string>, curr) => !acc.includes(curr.species) ? [...acc, curr.species] : acc, ["All"]
        );
    },

    selectSpecie(state, action) {
        const filtersCombination = createFiltersCombination(state.selectedSpecies, action.payload)

        if (filtersCombination === "SAME") return;

        state.selectedSpecies = filtersCombination;

        state.filteredCharacters = applyFilters({
            filters: filtersCombination,
            dataSource: state.characters,
        });
    },

    selectFavoriteSpecie(state, action) {
        const filtersCombination = createFiltersCombination(state.selectedFavoritesSpecies, action.payload)

        if (filtersCombination === "SAME") return;

        state.selectedFavoritesSpecies = filtersCombination;

        state.filteredFavoritesCharacters = applyFilters({
            filters: filtersCombination,
            searchFilter: state.searchFilter,
            dataSource: state.favoritesCharacters,
        });
    },

    setSpecies(state, action) {
        state.species = action.payload;
        state.selectedSpecies = ["All"];
    },

    setCharacter(state, action) {
        state.selectedCharacter = action.payload;
    },
};