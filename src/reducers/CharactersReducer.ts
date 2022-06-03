import { createFavoritesPagePagination } from "../helpers/createFavoritesPagePagination";
import { createFiltersCombination } from "../helpers/createFiltersCombination";
import { filterCharacters } from "../helpers/filterCharacters";
import { createFilters } from "../helpers/createFIlters";

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
    exploreSearch: string;
    favoritesSearch: string;
    selectedFilters: string[];
    favoriteListIds: string[];
    filters: string[];
}

export function charactersReducer(
    state: ICharactersState, 
    action: { 
        type: string, 
        payload: any 
    }
    ): ICharactersState {
    const { type, payload } = action;

    switch (type) {
        case "SET_LOADING": {
            return { 
                ...state, 
                loading: payload 
            }
        }

        case "SET_CHARACTERS": {
            const loading = false;
            const characters = payload.results;
            const pagesAmount = payload.info.pages;
            const selectedFilters = state.selectedFilters;
            const explorePagesAmount = pagesAmount;
            const getFiltersFromCharaters = createFilters(characters);
            const filteredCharacters = filterCharacters(selectedFilters, characters);
            const filters = getFiltersFromCharaters;
            
            return { 
                ...state, 
                loading, 
                characters, 
                filteredCharacters, 
                filters, 
                explorePagesAmount 
            };
        }

        case "SELECT_CHARACTER": {
            const character = payload;

            return { 
                ...state, 
                selectedCharacter: character 
            }
        }
        
        case "ADD_FAVORITE_CHARACTER": {
            const characterAlreadyOnFavorites = !!state.favoriteCharacters.find(fc => fc.id == payload.id);
            
            if (!characterAlreadyOnFavorites) {
                const favoriteCharacters = [...state.favoriteCharacters, payload];
                const favoriteListIds = favoriteCharacters.map((favorite) => favorite.id);
                const favoritesPagePagination = createFavoritesPagePagination(favoriteCharacters);
                
                return { 
                    ...state,
                    favoritesPagePagination: favoritesPagePagination[0], 
                    favoritesPagesAmount: favoritesPagePagination?.length, 
                    favoriteCharacters, 
                    favoriteListIds
                };
            }
            
            const favoriteCharacters = state.favoriteCharacters.filter((character) => character.id != payload.id);
            const favoriteListIds = favoriteCharacters.map((favorite) => favorite.id);
            const favoritesPagePagination = createFavoritesPagePagination(favoriteCharacters);
            const favoritesPagesAmount = favoritesPagePagination.length;
            
            return { 
                ...state, 
                favoriteListIds,
                favoriteCharacters, 
                favoritesPagesAmount, 
                favoritesPagePagination: favoritesPagePagination[0], 
            };
        }

        case "CHANGE_EXPLORE_PAGE": {
            return { 
                ...state, 
                loading: true, 
                filteredCharacters: [], 
                selectedFilters: ["All"],
                exploreCurrentPage: payload, 
            };
        }

        case "CHANGE_FAVORITES_PAGE": {
            const favoritesPagePagination = createFavoritesPagePagination(state.favoriteCharacters)[0];
            const nextPage = payload;

            return { 
                ...state, 
                favoritesPagePagination, 
                selectedFilters: ["All"],
                favoritesCurrentPage: nextPage, 
            };
        }

        case "SHOW_FAVORITES_PAGE": {
            const favoritesPagePagination = createFavoritesPagePagination(state.favoriteCharacters)[0];
            const filters = createFilters(payload ? state.favoritesPagePagination : state.characters);
            const filteredCharacters = state.characters;
            const showFavoritesPage = payload;

            return { 
                ...state, 
                filters, 
                loading: false, 
                showFavoritesPage, 
                filteredCharacters,
                favoritesPagePagination,
                selectedFilters: ["All"], 
            };
        }
        
        case "SELECT_FILTER": {
            const favoriteCharacters = state.favoriteCharacters;
            const isFavoritesPage = state.showFavoritesPage;
            const selectedFilters = state.selectedFilters;
            const favoritesSearch = state.favoritesSearch;
            const characters = state.characters;
            const newFilter = payload;
            
            const filtersCombination = createFiltersCombination(selectedFilters, newFilter);
            
            if (filtersCombination === "SAME") return state;

            if (!isFavoritesPage) {
                const filteredCharacters = characters.filter(
                    (character) => filtersCombination.includes(character.species) || filtersCombination.includes("All")
                );

                return { 
                    ...state, 
                    filteredCharacters, 
                    selectedFilters: filtersCombination 
                };
            }

            const favoriteCharactersFilteredByName = favoriteCharacters.filter(
                (character) => character.name.toLocaleLowerCase().includes(favoritesSearch.toLocaleLowerCase())
            );
            const favoriteCharactersFilteredBySpecies = favoriteCharactersFilteredByName.filter(
                (character) => filtersCombination.includes(character.species) || filtersCombination.includes("All")
            );
            
            const favoritesPagePagination = createFavoritesPagePagination(favoriteCharactersFilteredBySpecies)[0];

            return { 
                ...state, 
                favoritesPagePagination, 
                selectedFilters: filtersCombination
            };
        }

        case "SET_SEARCH_BY_NAME": {
            const characterName = payload;
            const isFavoritesPage = state.showFavoritesPage;
            const favoritesCharacters = state.favoriteCharacters;
            
            if (!isFavoritesPage) {
                return { 
                    ...state, 
                    loading: true, 
                    exploreCurrentPage: 1, 
                    exploreSearch: characterName, 
                };
            }
            
            const getFavoritesCharactersByName = favoritesCharacters.filter(
                (character) => character.name.toLocaleLowerCase().includes(characterName.toLocaleLowerCase())
            );

            const filteredCharactersPagination = createFavoritesPagePagination(getFavoritesCharactersByName);
            
            const filters = createFilters(filteredCharactersPagination[0]);
            
            return {
                ...state,
                filters,
                favoritesCurrentPage: 1,
                favoritesSearch: characterName, 
                favoritesPagePagination: filteredCharactersPagination[0],
                favoritesPagesAmount: filteredCharactersPagination.length,
            };
        }

        default:
            return state;
    }
}

export const charactersInitialState: ICharactersState = {
    filters: [],
    loading: true,
    characters: [],
    exploreSearch: "",
    favoritesSearch: "",
    favoriteListIds: [],
    filteredCharacters: [],
    favoriteCharacters: [],
    exploreCurrentPage: 1,
    explorePagesAmount: 1,
    favoritesCurrentPage: 1,
    favoritesPagesAmount: 1,
    showFavoritesPage: false,
    selectedFilters: ["All"],
    favoritesPagePagination: [],
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
}