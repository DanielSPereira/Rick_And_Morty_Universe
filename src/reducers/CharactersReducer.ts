import { createFavoritesPagePagination } from "../helpers/createFavoritesPagePagination";
import { createFilters } from "../helpers/createFIlters";
import { createFiltersCombination } from "../helpers/createFiltersCombination";
import { filterCharacters } from "../helpers/filterCharacters";

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
    loading: boolean;
    characters: ICharacter[];
    filteredCharacters: ICharacter[];
    selectedCharacter: ICharacter;
    favoriteCharacters: ICharacter[];
    favoritesPagePagination: ICharacter[];
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
        case "SET_LOADING":
            return { ...state, loading: payload }

        case "SET_CHARACTERS": 
            const getFiltersFromCharaters = createFilters(payload.results);
            const explorePagesAmount = payload.info.pages;
            const filteredCharacters = filterCharacters(state.selectedFilters, payload.results);
            const characters = payload.results;
            const filters = getFiltersFromCharaters;
            const loading = false;

            return { ...state, loading, characters, filteredCharacters, filters, explorePagesAmount };

        case "SELECT_CHARACTER":
            return { ...state, selectedCharacter: payload }
        
        case "ADD_FAVORITE_CHARACTER": {
            const alreadyOnFavorites = !!state.favoriteCharacters.find(fc => fc.id == payload.id);
            
            if (!alreadyOnFavorites) {
                const favoriteCharacters = [...state.favoriteCharacters, payload];
                const favoriteListIds = favoriteCharacters.map((favorite) => favorite.id);
                const favoritesPagePagination = createFavoritesPagePagination(favoriteCharacters);
                
                console.log(favoritesPagePagination)
                
                return { 
                    ...state,
                    favoritesPagePagination: favoritesPagePagination[state.favoritesCurrentPage - 1], 
                    favoritesPagesAmount: favoritesPagePagination?.length, 
                    favoriteCharacters, 
                    favoriteListIds
                };
            }
            
            const favoriteCharacters = state.favoriteCharacters.filter((character) => character.id != payload.id);
            const favoriteListIds = favoriteCharacters.map((favorite) => favorite.id);
            const favoritesPagePagination = createFavoritesPagePagination(favoriteCharacters)[state.favoritesCurrentPage - 1];
            const favoritesPagesAmount = favoritesPagePagination.length;
            
            return { ...state, favoritesPagesAmount, favoriteCharacters, favoritesPagePagination, favoriteListIds };
        }

        case "CHANGE_EXPLORE_PAGE":
            return { ...state, loading: true, filteredCharacters: [], exploreCurrentPage: payload, selectedFilters: ["All"]};

        case "CHANGE_FAVORITES_PAGE": {
            const favoritesPagePagination = createFavoritesPagePagination(state.favoriteCharacters)[payload - 1];

            return { ...state, favoritesCurrentPage: payload, favoritesPagePagination };
        }

        case "SHOW_FAVORITES_PAGE": {
            console.log(state.favoritesPagePagination)
            return { ...state, showFavoritesPage: payload, loading: false };
        }
        
        case "SELECT_FILTER":
            const newSelectedFilters = createFiltersCombination(state.selectedFilters, payload);
            
            if (newSelectedFilters == "SAME") return state;
            
            if (newSelectedFilters.includes("All")) return {...state, filteredCharacters: state.characters, selectedFilters: ["All"]};
            
            const newFilteredCharacters = state.characters.filter(character => newSelectedFilters.includes(character.species));

            return { ...state, filteredCharacters: newFilteredCharacters, selectedFilters: newSelectedFilters };

        case "SET_SEARCH_BY_NAME":
            return { ...state, loading: true, searchByName: payload, exploreCurrentPage: 1 };

        default:
            return state;
    }
}

export const charactersInitialState: ICharactersState = {
    loading: true,
    characters: [],
    filteredCharacters: [],
    selectedCharacter: {
        id: '',
        name: '',
        image: '',
        status: '',
        species: '',
        created: '',
        episode: [{
            id: '',
            name: '',
        }],
        location: {
            id: '',
            name: '',
        }
    },
    favoriteCharacters: [],
    favoritesPagePagination: [],
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