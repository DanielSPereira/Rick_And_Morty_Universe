import { useEffect, useCallback, useReducer } from "react";
import { createContext, useContext } from "use-context-selector";
import { useQuery } from "@apollo/client";

import { charactersInitialState, charactersReducer, ICharacter, ICharactersState } from "../reducers/CharactersReducer";
import { GET_CHARACTERS } from "../graphql/GET_CHARACTERS";

interface ICharactersContext extends ICharactersState { 
    handleChangeExplorePage: (event: React.ChangeEvent<unknown>, page: number) => void;
    handleChangeFavoritesPage: (event: React.ChangeEvent<unknown>, page: number) => void;
    handleAddFavoriteCharacter: (character: ICharacter) => void;
    handleChangeShowFavoritesPage: (isToShow: boolean) => void;
    handleSelectCharacter: (character: ICharacter) => void;
    handleSearchByName: (nameToSearch: string) => void;
    handleSelectFilter: (filter: string) => void;
}

export const CharactersContext = createContext<ICharactersContext>({} as ICharactersContext);

export const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
    const [ value, dispatch ] = useReducer(charactersReducer, charactersInitialState);
    const isFavoritesPage = value.showFavoritesPage;

    const { data } = useQuery(
        GET_CHARACTERS,
        {
            skip: isFavoritesPage,
            variables: { 
                CharacterName: value.exploreSearch, 
                Page: value.exploreCurrentPage 
            },
        }
    );

    const handleSearchByName = useCallback(
        (nameToSearch: string) => dispatch({ type: "SET_SEARCH_BY_NAME", payload: nameToSearch }), []    
    );

    const handleChangeExplorePage = useCallback(
        (e: React.ChangeEvent<unknown>, page: number) => 
            dispatch({ type: "CHANGE_EXPLORE_PAGE", payload: page }), []
    );
    
    const handleChangeFavoritesPage = useCallback(
        (e: React.ChangeEvent<unknown>, page: number) =>
            dispatch({ type: "CHANGE_FAVORITES_PAGE", payload: page }), []
    );

    const handleChangeShowFavoritesPage = useCallback(
        (showFavoritesPage: boolean) => 
            dispatch({ type: "SHOW_FAVORITES_PAGE", payload: showFavoritesPage }), []
    );
    
    const handleSelectFilter = useCallback(
        (filter: string) => 
            dispatch({ type: "SELECT_FILTER", payload: filter }), []
    );
    
    const handleSelectCharacter = useCallback(
        (character: ICharacter) => 
            dispatch({ type: "SELECT_CHARACTER", payload: character }), []
    );

    const handleAddFavoriteCharacter = useCallback(
        (character: ICharacter) => 
            dispatch({ type: "ADD_FAVORITE_CHARACTER", payload: character }), []
    );

    useEffect(() => data && dispatch({ type: "SET_CHARACTERS", payload: data.characters }), [data]);
    
    return (
        <CharactersContext.Provider 
            value={{ 
                ...value,
                handleChangeShowFavoritesPage,
                handleAddFavoriteCharacter,
                handleChangeFavoritesPage,
                handleChangeExplorePage,
                handleSelectCharacter,
                handleSearchByName,
                handleSelectFilter,
            }}
        >
            { children }
        </CharactersContext.Provider>
    )
} 


// Only for tests
export const useCharactersTest = () => useContext(CharactersContext);