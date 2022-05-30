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
    favoriteCharacter: (id: string) => void;
    selectFilter: (filter: string) => void;
    selectCharacter: (id: string) => void;
    searchForCharacter: (name: string) => void;
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
    const [pagesAmount, setPagesAmount] = useState<number>(1);
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const [executeSearch, { data, loading }] = useLazyQuery(
        GET_CHARACTERS
    );

    const searchForCharacter = useCallback((name: string) => {
        setSearchFilter(name);

        executeSearch({
            variables: { FilterCharacter: name, page: page }
        })
    }, [searchFilter]);

    const getCategories = useMemo((): string[] => {
        if (!data) return ["All"];
        
        let categories: string[] = [];

        data?.characters?.results.filter(
            (character: ICharacter) => !categories.includes(character.species) && categories.push(character.species)
        );    
    
        setSelectedFilters(["All"]);

        return ["All", "Favorites", ...categories];
    }, [data])
    
    const charactersFiltered = useMemo(() => {
        if (!data) return [];

        if (selectedFilters.includes("Favorites") && selectedFilters.length == 1) {
            return favoriteCharacters;
        }
        
        if (selectedFilters.includes("Favorites") && selectedFilters.length > 1) {
            return data.characters.results.filter(
                (character: ICharacter) =>
                    !!favoriteCharacters.find(fc => fc.id == character.id) && selectedFilters.includes(character.species) 
            )           
        }
        return data.characters.results.filter((character: ICharacter) => {
            if (selectedFilters.includes("All")) return character;

            if (selectedFilters.includes(character.species)) return character;
        })        
    }, [selectedFilters, data, favoriteCharacters])

    const getPagesAmount = useMemo(() => {
        if (!data) return pagesAmount;

        setPagesAmount(data.characters.info.pages)
    }, [data])


    function selectCharacter(id: string) {
        const newSelectedCharacter = charactersFiltered?.find((character: ICharacter) => character.id === id);

        setSelectedCharacter(newSelectedCharacter || null);
    }

    function handleChangePage(event: React.ChangeEvent<unknown>, page: number) {
        setPage(page);

        executeSearch({
            variables: { FilterCharacter: searchFilter, page: page }
        })
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

        const newFavoriteCharacter = charactersFiltered.find((character: ICharacter) => character.id == id);

        newFavoriteCharacter && setFavoriteCharacters([...favoriteCharacters, newFavoriteCharacter]);
    }

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
                characters: charactersFiltered,
                pagesAmount: pagesAmount,
                favoriteCharacters,
                selectedCharacter,
                selectedFilters,
                searchFilter,
                filters: getCategories,
                loading, 
                page,
                searchForCharacter,
                favoriteCharacter,
                handleChangePage,
                selectCharacter,
                selectFilter,
            }}
        >
            { children }
        </CharactersContext.Provider>
    )
} 
