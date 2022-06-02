import { createFavoritesPagePagination } from "../helpers/createFavoritesPagePagination";
import { createFiltersCombination } from "../helpers/createFiltersCombination";
import { filterCharacters } from "../helpers/FilterCharacters";

export interface IEpisode {
    id: string;
    name: string;
}

export interface ILocation {
    id: string;
    name: string;
}

export interface ICharacter {
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
    created: string;
    episode: IEpisode[];
    location : ILocation;
}

export interface ICharactersState {
    characters: ICharacter[];
    selectedCharacter: ICharacter;
    favoriteCharacters: ICharacter[];
    favoritesPagePagination: ICharacter[][];
    exploreCurrentPage: number;
    explorePagesAmount: number;
    favoritesCurrentPage: number;
    favoritesPagesAmount: number;
    showFavoritesPage: boolean;
    searchByName: string;
    selectedFilters: string[];
    favoriteListIds: string[];
    filters: string[];
}

export function charactersReducer(state: ICharactersState, action: { type: string, payload: any }): ICharactersState {
    const { type, payload } = action;

    switch (type) {
        case "SET_CHARACTERS": 
            const getFiltersFromCharaters = payload.results.map((character: ICharacter) => character.species);
            const explorePagesAmount = payload.info.pages;

            const filteredCharacters = filterCharacters(state.selectedFilters, payload);

            return { ...state, characters: filteredCharacters, filters: getFiltersFromCharaters, explorePagesAmount };

        case "SELECT_CHARACTER":
            return { ...state, selectedCharacter: payload }
        
        case "ADD_FAVORITE_CHARACTER":
            const favoriteListIds = state.favoriteCharacters.map((favorite) => favorite.id);
            favoriteListIds.push(payload.id);

            if (state.favoriteCharacters.length < 20) {
                return { ...state, favoriteCharacters: [...state.favoriteCharacters, payload], favoriteListIds };
            }

            const favoritesPagePagination = createFavoritesPagePagination(state.favoriteCharacters);

            return { ...state, favoriteCharacters: [...state.favoriteCharacters, payload], favoritesPagePagination, favoriteListIds };

        case "CHANGE_EXPLORE_PAGE":
            return { ...state, exploreCurrentPage: payload };

        case "CHANGE_FAVORITES_PAGE":
            return { ...state, favoritesCurrentPage: payload };

        case "SHOW_FAVORITES_PAGE":
            return { ...state, showFavoritesPage: payload };
        
        case "SELECT_FILTER":
            const newSelectedFilters = createFiltersCombination(state.selectedFilters, payload);
            if (newSelectedFilters == "SAME") state;

            return { ...state, selectedFilters: [...state.selectedFilters, payload] };

        case "SET_SEARCH_BY_NAME":
            return { ...state, selectedFilters: payload };

        default:
            return state;
    }
}

export const charactersInitialState: ICharactersState = {
    characters: [],
    selectedCharacter: {} as ICharacter,
    favoriteCharacters: [],
    favoritesPagePagination: [[]],
    exploreCurrentPage: 1,
    explorePagesAmount: 1,
    favoritesCurrentPage: 1,
    favoritesPagesAmount: 1,
    showFavoritesPage: false,
    searchByName: "",
    selectedFilters: ["All"],
    favoriteListIds: [],
    filters: [],
}