import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState, createContext, useMemo, useCallback } from "react";

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
    favoriteCharacters: ICharacter[] | null;
    selectedCharacter: ICharacter | null;
    selectedFilters: string[];
    showFavoritePage: boolean;
    characters: ICharacter[]; 
    searchFilter: string;
    pagesAmount: number;
    filters: string[];
    loading: boolean;
    page: number;
}

export const CharactersContext = createContext<ICharactersContext>({} as ICharactersContext);

export const GET_CHARACTERS = gql`
    query FeedSearchQuery($FilterCharacter: String, $page: Int) { 
        characters(page: $page, filter: { name: $FilterCharacter }) {
            info {
                pages
            },
            results {
                id,
                name
                image,
                status,
                species,
                created,
                episode {
                    id,
                    name,
                },
                location {
                    id,
                    name,
                }
            }
        }
    }
`;

export const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);
    const [favoriteCharacters, setFavoriteCharacters] = useState<ICharacter[]>([]);
    const [showFavoritePage, setShowFavoritePage] = useState<boolean>(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"]);
    const [pagesAmount, setPagesAmount] = useState<number>(1);
    const [searchFilter, setSearchFilter] = useState<string>("");
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

        let filters: string[] = [];

        characters.filter(
            (character: ICharacter) => 
                !filters.includes(character.species) && filters.push(character.species)
        );
    
        return ["All", ...filters];
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

    const getFavoriteCharactersFilters = useMemo((): string[] => {
        if (!favoriteCharacters) return ["All"];

        let filters: string[] = [];

        favoriteCharacters.filter(
            (character: ICharacter) => 
                !filters.includes(character.species) && filters.push(character.species)
        );

        setSelectedFilters(["All"])
    
        return ["All", ...filters];
    }, [favoriteCharacters, showFavoritePage])

    const filteredFavoriteCharacters = useMemo(() => {
        if (!data) return [];
 
        let favCharacters = favoriteCharacters;

        if (showFavoritePage && !!searchFilter) {
            favCharacters = favoriteCharacters.filter((f => f.name.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase()) ));
        }

        const onlyAllFilterIsSelected = selectedFilters.includes("All");

        if (onlyAllFilterIsSelected) return favCharacters;

        if (!showFavoritePage) return favCharacters;
        
        const filteredCharactersBasedOnCharactersSpecies = favCharacters.filter(
            (character: ICharacter) => selectedFilters.includes(character.species) 
        );

        return filteredCharactersBasedOnCharactersSpecies;
    }, [favoriteCharacters, selectedFilters, searchFilter, showFavoritePage])

    const getPagesAmount = useMemo(() => {
        if (!data) return pagesAmount;

        setPagesAmount(data.characters.info.pages)
    }, [data])

    function selectCharacter(id: string) {
        const newSelectedCharacter = filteredCharacters?.find((character: ICharacter) => character.id === id);

        setSelectedCharacter(newSelectedCharacter);
    }

    function handleChangePage(event: React.ChangeEvent<unknown>, page: number) {
        setPage(page);

        executeSearch({
            variables: { FilterCharacter: searchFilter, page: page }
        })
    }

    function selectFilter(filter: string) {
        setSelectedFilters((state) => {
            if (filter == "All") return [filter];

            if (state.includes("All")) return [filter];

            if (state.includes(filter) && state.length > 1) 
                return selectedFilters.filter(selectedFilter => selectedFilter != filter);

            if (state.includes(filter) && state.length == 1) return state;
            
            return [...selectedFilters, filter];
        });
    }

    function favoriteCharacter(id: string) {
        const alreadyFavorite = !!favoriteCharacters.find(fc => fc.id == id);

        if (alreadyFavorite) 
            return setFavoriteCharacters(state => state.filter(fc => fc.id != id));

        const newFavoriteCharacter = filteredCharacters.find((character: ICharacter) => character.id == id);

        newFavoriteCharacter && setFavoriteCharacters([...favoriteCharacters, newFavoriteCharacter]);
    }

    useEffect(() => {
        if (!data && !loading) {
            executeSearch({
                variables: { FilterCharacter: searchFilter, page: page }
            })
        } 
    }, [data])

    return (
        <CharactersContext.Provider 
            value={{ 
                favoriteCharacters: filteredFavoriteCharacters,
                characters: filteredCharacters,
                pagesAmount: pagesAmount,
                filters: showFavoritePage ? getFavoriteCharactersFilters : getFilters,
                selectedCharacter,
                selectedFilters,
                searchFilter,
                loading, 
                page,
                showFavoritePage,
                searchForCharacter,
                favoriteCharacter,
                setSearchFilter,
                handleChangePage,
                selectCharacter,
                selectFilter,
                setShowFavoritePage,
            }}
        >
            { children }
        </CharactersContext.Provider>
    )
} 
