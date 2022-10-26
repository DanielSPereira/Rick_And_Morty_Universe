import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applyFilters } from "@/utils/applyFilters";
import { characterService } from "@/services/characterService";
import { Character } from "@/types/character";
import { reducers } from "./reducer";

export type InitialState = {
    error: string;
    isLoading: boolean;
    searchFilter: string;
    selectedCharacter: Character | null;
    favoritesSpecies: Array<string>,
    selectedFavoritesSpecies: Array<string>,
    species: Array<string>;
    selectedSpecies: Array<string>;
    favoritesCharacters: Array<Character>;
    filteredFavoritesCharacters: Array<Character>;
    characters: Character[];
    filteredCharacters: Character[];
}

export type SelectState = {
    characters: InitialState;
}

const initialState: InitialState = {
    error: "",
    isLoading: true,
    searchFilter: "",
    selectedCharacter: null,
    favoritesSpecies: ["All"],
    selectedFavoritesSpecies: ["All"],
    species: ["All"],
    selectedSpecies: ["All"],
    favoritesCharacters: [],
    filteredFavoritesCharacters: [],
    characters: [],
    filteredCharacters: [],
}

export const getCharacters = createAsyncThunk("characters/getCharacters", characterService.getCharacters)

export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers,
    extraReducers: builder => {
        builder.addCase(getCharacters.pending, (state) => { 
            state.isLoading = true 
        })
        
        builder.addCase(getCharacters.rejected, (state, action) => { 
            state.isLoading = false;  
            state.error = action.error.message ?? "";
        })

        builder.addCase(getCharacters.fulfilled, (state, action) => {
            let characters = action.payload.characters.results;
            let species = action.payload.characters.results.reduce(
                (acc: Array<string>, curr) => !acc.includes(curr.species) ? [...acc, curr.species] : acc, ["All"]
            );

            let selectedSpecieStillInList = !!species.find(specie => state.selectedSpecies.includes(specie));
    
            if (!selectedSpecieStillInList) {
                state.selectedSpecies = ["All"]
            }
            
            state.species = species;
            state.characters = characters;
            state.filteredCharacters = applyFilters({
                filters: state.selectedSpecies,
                dataSource: characters,
            });
            
            state.isLoading = false;
        })
    },
})

export const selectCharacters = (state: SelectState) => ({
    isLoading: state.characters.isLoading,
    characters: state.characters.filteredCharacters,
    favoritesCharacters: state.characters.filteredFavoritesCharacters,
    selectedCharacter: state.characters.selectedCharacter,
});

export const selectFilters = (state: SelectState) => ({ 
    favoritesSpecies: state.characters.favoritesSpecies,
    selectedFavoritesSpecies: state.characters.selectedFavoritesSpecies,
    species: state.characters.species, 
    searchFilter: state.characters.searchFilter,
    selectedSpecies:  state.characters.selectedSpecies 
});

export const { 
    selectSpecie,
    selectFavoriteSpecie,
    addFavorite, 
    removeFavorite, 
    searchFilter, 
    changePage, 
    setSpecies,
    setCharacter, 
} = charactersSlice.actions;
export default charactersSlice.reducer
