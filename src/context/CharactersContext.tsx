import { useEffect, useState, useMemo, useCallback } from "react";
import { createContext } from "use-context-selector";
import { useLazyQuery } from "@apollo/client";

import { GET_CHARACTERS } from "../graphql/GET_CHARACTERS";

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

interface ICharactersContext { 
    setShowFavoritePage: React.Dispatch<React.SetStateAction<boolean>>;
    favoriteCharacter: (id: string) => void;
    selectFilter: (filter: string) => void;
    selectCharacter: (id: string) => void;
    searchForCharacter: (name: string) => void;
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>
    handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
    handleChangeFavoritePage: (event: React.ChangeEvent<unknown>, page: number) => void;
    favoriteCharacters: ICharacter[];
    selectedCharacter: ICharacter | null;
    favoritePagesAmount: number;
    favoritePage: number;
    selectedFilters: string[];
    showFavoritePage: boolean;
    favoriteListIds: string[];
    characters: ICharacter[]; 
    searchFilter: string;
    pagesAmount: number;
    filters: string[];
    loading: boolean;
    page: number;
}

export const CharactersContext = createContext<ICharactersContext>({} as ICharactersContext);

export const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);
    const [favoriteCharacters, setFavoriteCharacters] = useState<ICharacter[]>([]);
    const [favoritePagesAmount, setFavoritePagesAmount] = useState<number>(1);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"]);
    const [showFavoritePage, setShowFavoritePage] = useState<boolean>(false);
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [favoritePage, setFavoritePage] = useState<number>(1);
    const [pagesAmount, setPagesAmount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);

    const [executeSearch, { data, loading }] = useLazyQuery(
        GET_CHARACTERS
    );

    const searchForCharacter = useCallback((name: string) => {
        setSearchFilter(name);

        if (showFavoritePage) return;

        executeSearch({
            variables: { FilterCharacter: name, page: 1 }
        })

        setPage(1)
    }, [searchFilter, showFavoritePage]);

    const getFilters = useMemo((): string[] => {
        if (!data) return ["All"];
        
        const characters = data.characters.results;

        let filters: string[] = ["All"];

        characters.filter(
            (character: ICharacter) => 
                !filters.includes(character.species) && filters.push(character.species)
        );
        
        setSelectedFilters(["All"]);

        return filters;
    }, [data])

    const filteredCharacters = useMemo(() => {
        if (!data) return [];

        const characters = data.characters.results;
        const onlyAllFilterIsSelected = selectedFilters.includes("All");

        if (onlyAllFilterIsSelected) return characters;

        const filteredCharactersBasedOnCharactersSpecies = characters.filter(
            (character: ICharacter) => selectedFilters.includes(character.species) 
        );

        return filteredCharactersBasedOnCharactersSpecies;
    }, [data, selectedFilters])

    const createFavoriteCharactersPagination = useMemo(() => {
        let idx = 0;
        let pagination: ICharacter[][] = [[]];

        let favCharacters = favoriteCharacters;
        
        if(!!searchFilter) {
            favCharacters = favCharacters.filter((f => f.name.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase()) ));
        }
        
        for(let index = 0; index < favCharacters.length; index++) {
            if ((index + 1) % 21 == 0) {
                idx = idx + 1;
                pagination[idx] = []
            }

            pagination[idx].push(favCharacters[index]);
        };

        return pagination;
    }, [favoriteCharacters, searchFilter])

    const filteredFavoriteCharacters = useMemo(() => {
        if (!data) return [];
 
        let favCharacters = createFavoriteCharactersPagination[favoritePage - 1];

        const onlyAllFilterIsSelected = selectedFilters.includes("All");

        if (onlyAllFilterIsSelected) return favCharacters;

        if (!showFavoritePage) return favCharacters;
        
        const filteredCharactersBasedOnCharactersSpecies = favCharacters.filter(
            (character: ICharacter) => selectedFilters.includes(character.species) 
        );

        return filteredCharactersBasedOnCharactersSpecies;
    }, [favoriteCharacters, selectedFilters, showFavoritePage, createFavoriteCharactersPagination, favoritePage])

    const favoriteListIds = useMemo(() => {
        return filteredFavoriteCharacters.map((favoriteCharacter => favoriteCharacter.id));
    }, [filteredFavoriteCharacters])

    const getFavoriteCharactersFilters = useMemo((): string[] => {
        if (!filteredFavoriteCharacters.length) return ["All"];
    
        let filters: string[] = [];

        filteredFavoriteCharacters.filter(
            (character: ICharacter) => 
                !filters.includes(character.species) && filters.push(character.species)
        );
        
        setSelectedFilters(["All"]);

        return ["All", ...filters];
    }, [showFavoritePage, favoritePage])

    const getPagesAmount = useCallback((data: { characters: { info: { pages: number }} }) => {
        if (!data) return;

        setPagesAmount(data.characters.info.pages)
    }, [])
    
    const getFavoritePagesAmount = useCallback((createFavoriteCharactersPagination: ICharacter[][]) => {
        if (!createFavoriteCharactersPagination.length) return;

        setFavoritePagesAmount(createFavoriteCharactersPagination.length)
    }, [])

    const selectCharacter = useCallback((id: string) => {
        const newSelectedCharacter = filteredCharacters?.find((character: ICharacter) => character.id === id);

        setSelectedCharacter(newSelectedCharacter);
    }, [filteredCharacters])

    const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);

        executeSearch({
            variables: { FilterCharacter: searchFilter, page: page }
        })

        window.scrollTo(0, 350)
    }, [searchFilter])

    const handleChangeFavoritePage = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
        setFavoritePage(page);

        setSelectedFilters(["All"]);
    }, [])

    const selectFilter = useCallback((filter: string) => {
        
        if (filter == "All")
            return setSelectedFilters([filter])
            
        if (selectedFilters.includes("All"))
            return setSelectedFilters([filter])
        
        if (selectedFilters.includes(filter) && selectedFilters.length > 1)
            return setSelectedFilters(selectedFilters.filter(selectedFilter => selectedFilter != filter))
        
        if (selectedFilters.includes(filter) && selectedFilters.length == 1) return
        
        setSelectedFilters([...selectedFilters, filter]);
    }, [selectedFilters])

    const favoriteCharacter = useCallback((id: string) => {
        const alreadyFavorite = !!favoriteCharacters.find((fc) => fc.id == id);

        if (alreadyFavorite) 
            return setFavoriteCharacters(state => state.filter(fc => fc.id != id));

        const newFavoriteCharacter = filteredCharacters.find((character: ICharacter) => character.id == id);

        newFavoriteCharacter && setFavoriteCharacters([...favoriteCharacters, newFavoriteCharacter]);
    }, [filteredCharacters, favoriteCharacters])

    useEffect(() => {
        if (!data) {
            executeSearch({
                variables: { FilterCharacter: searchFilter, page: page }
            })
        } 

        getPagesAmount(data);
    }, [data])

    useEffect(() => {
        console.log(selectedFilters)
    }, [selectedFilters])
    
    useEffect(() => getFavoritePagesAmount(createFavoriteCharactersPagination), [createFavoriteCharactersPagination])
    
    return (
        <CharactersContext.Provider 
            value={{ 
                filters: showFavoritePage ? getFavoriteCharactersFilters : getFilters,
                favoriteCharacters: filteredFavoriteCharacters,
                characters: filteredCharacters,
                pagesAmount: pagesAmount,
                favoritePagesAmount,
                selectedCharacter,
                showFavoritePage,
                selectedFilters,
                searchFilter,
                favoritePage,
                loading, 
                page,
                handleChangeFavoritePage,
                setShowFavoritePage,
                searchForCharacter,
                favoriteCharacter,
                setSearchFilter,
                handleChangePage,
                selectCharacter,
                selectFilter,
                favoriteListIds
            }}
        >
            { children }
        </CharactersContext.Provider>
    )
} 
