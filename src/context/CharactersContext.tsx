import { useEffect, useCallback, useReducer } from "react";
import { createContext } from "use-context-selector";
import { useLazyQuery } from "@apollo/client";

import { GET_CHARACTERS } from "../graphql/GET_CHARACTERS";
import { charactersInitialState, charactersReducer, ICharacter, ICharactersState } from "../reducers/CharactersReducer";

interface ICharactersContext extends ICharactersState { 
    loading: boolean;
    searchByName: string;
    showFavoritesPage: boolean;
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

    
    const[ getCharacters, { data, loading } ] = useLazyQuery(GET_CHARACTERS);

    const handleSearchByName = useCallback(
        (nameToSearch: string) => {
            dispatch({ type: "SET_SEARCH_BY_NAME", payload: nameToSearch })
            
            getCharacters({ variables: { CharacterName: nameToSearch, Page: 1 } }), []   
        }, []    
    );

    const handleChangeExplorePage = useCallback(
        (e: React.ChangeEvent<unknown>, page: number) => 
            getCharacters({ variables: { CharacterName: value.searchByName, Page: page } }), []
    );
    
    const handleChangeFavoritesPage = useCallback(
        (e: React.ChangeEvent<unknown>, page: number) =>
            dispatch({ type: "", payload: page }), []
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

    useEffect(() => {
        if (!data) {
            getCharacters();
            return;
        }

        dispatch({ type: "SET_CHARACTERS", payload: data.characters })
    }, [data]);
    
    return (
        <CharactersContext.Provider 
            value={{ 
                ...value,
                loading,
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
