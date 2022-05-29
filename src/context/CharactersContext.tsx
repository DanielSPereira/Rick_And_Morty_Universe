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
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: string;
    location : ILocation;
    image: string;
    episode: IEpisode[];
    url: string;
    created: string;
}

interface ICharactersContext { 
    setPage: React.Dispatch<React.SetStateAction<"Favorites" | "Explore">>;
    changeSearchFilter: (name: string) => void;
    favoriteCharacter: (id: string) => void;
    selectFilter: (filter: string) => void;
    selectCharacter: (id: string) => void;
    searchForCharacter: () => void;
    favoriteCharacters: ICharacter[] | null;
    selectedCharacter: ICharacter | null;
    page: "Favorites" | "Explore";
    selectedFilters: string[];
    characters: ICharacter[]; 
    filters: string[];
    loading: boolean;
}

export const CharactersContext = createContext<ICharactersContext>({} as ICharactersContext);

const GET_CHARACTERS = gql`
    query FeedSearchQuery($FilterCharacter: String) { 
        characters(page: 1, filter: { name: $FilterCharacter }) {
            results {
                id,
                name,
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
    const [filters, setFilters] = useState<string[]>([]);
    const [page, setPage] = useState<"Favorites" | "Explore">("Explore");

    const [executeSearch, { data, loading }] = useLazyQuery(
        GET_CHARACTERS
    );

    const searchForCharacter = useCallback(() => {
        executeSearch({
            variables: { FilterCharacter: searchFilter }
        })
    }, [searchFilter])
    
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
        
        setFilters(categories)
        setSelectedFilters(["All"])
    }, [data])

    const getCharacters = useMemo(
        () => {
            if (!data) return;
            setCharacters(data.characters.results)
        }, [data]
    )

    const charactersFiltered = useMemo(() => {
        return characters.filter(
            (character) => !selectedFilters.includes("All") ? 
                selectedFilters.includes(character.species) && character :
                character 
        );
    }, [selectedFilters, characters])

    useEffect(() => {
        if (!data) {
            executeSearch({
                variables: { FilterCharacter: searchFilter }
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
                setPage,
                page,
                selectedCharacter,
                favoriteCharacters,
                filters,
                selectedFilters,
                characters: charactersFiltered,
                loading, 
            }}
        >
            { children }
        </CharactersContext.Provider>
    )
} 
