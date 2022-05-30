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
    changeSearchFilter: (name: string) => void;
    favoriteCharacter: (id: string) => void;
    selectFilter: (filter: string) => void;
    selectCharacter: (id: string) => void;
    searchForCharacter: () => void;
    handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
    favoriteCharacters: ICharacter[] | null;
    selectedCharacter: ICharacter | null;
    selectedFilters: string[];
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
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"]);
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [pagesAmount, setPagesAmount] = useState<number>(0);
    const [filters, setFilters] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);

    const [executeSearch, { data, loading }] = useLazyQuery(
        GET_CHARACTERS
    );

    const searchForCharacter = useCallback(() => {
        executeSearch({
            variables: { FilterCharacter: searchFilter, page: page }
        })
    }, [searchFilter]);

    function handleChangePage(event: React.ChangeEvent<unknown>, page: number) {
        setPage(page);

        executeSearch({
            variables: { FilterCharacter: searchFilter, page: page }
        })
    }
    
    function changeSearchFilter(name: string) {
        setSearchFilter(name);
    }

    function selectCharacter(id: string) {
        const newSelectedCharacter = characters?.find((character: ICharacter) => character.id === id);

        setSelectedCharacter(newSelectedCharacter || null);
    }

    function selectFilter(filter: string) {
        setSelectedFilters((state) => {
            if (filter == "All") {
                return [filter];
            }

            if (state.includes("All")) {
                return [filter]; 
            }

            if (state.includes(filter) && state.length > 1) {
                return selectedFilters.filter(selectedFilter => selectedFilter != filter);
            }

            if (state.includes(filter) && state.length == 1) {
                return state;
            }
            
            return [...selectedFilters, filter];
        });
    }

    function favoriteCharacter(id: string) {
        const alreadyFavorite = !!favoriteCharacters.find(fc => fc.id == id);

        if (alreadyFavorite) {
            return setFavoriteCharacters(state => state.filter(fc => fc.id != id));
        }

        const newFavoriteCharacter = characters.find(character => character.id == id);

        newFavoriteCharacter && setFavoriteCharacters([...favoriteCharacters, newFavoriteCharacter]);
    }

    const getCategories = useMemo(() => {
        if (!data) return;
        let categories: string[] = [];

        data?.characters?.results.map((character: ICharacter) => 
            !categories.includes(character.species) && categories.push(character.species));    
        
        setFilters(["All", "Favorites", ...categories])
        setSelectedFilters(["All"])
    }, [data])

    const getCharacters = useMemo(() => {
            if (!data) return;
            setCharacters(data.characters.results)
    }, [data])

    const getPagesAmount = useMemo(() => {
        if (!data) return;

        const pages = data.characters.info.pages;

        setPagesAmount(pages);
    }, [data])

    const charactersFiltered = useMemo(() => {
        return characters.filter((character) => {
            if (selectedFilters.includes("All")) return character;

            if (selectedFilters.includes(character.species)) return character;

            if (selectedFilters.includes("Favorites") && !!favoriteCharacters.find(fc => fc.id == character.id)) return character;
             
            
            })        
    }, [selectedFilters, characters, favoriteCharacters])

    useEffect(() => {
        if (!data) {
            executeSearch({
                variables: { FilterCharacter: searchFilter, page: page }
            })
            return;
        } 
    }, [data])

    return (
        <CharactersContext.Provider 
            value={{ 
                searchForCharacter,
                favoriteCharacter,
                selectCharacter,
                selectFilter,
                changeSearchFilter,
                handleChangePage,
                page,
                selectedCharacter,
                favoriteCharacters,
                searchFilter,
                filters,
                selectedFilters,
                characters: charactersFiltered,
                pagesAmount,
                loading, 
            }}
        >
            { children }
        </CharactersContext.Provider>
    )
} 
