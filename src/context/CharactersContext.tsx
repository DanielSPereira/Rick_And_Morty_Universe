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
    selectFilter: (filter: string) => void;
    selectCharacter: (id: string) => void;
    favoriteCharacter: (id: string) => void;
    searchForCharacter: () => void;
    changeSearchFilter: (name: string) => void;
    selectedCharacter: ICharacter | null;
    favoriteCharacters: ICharacter[] | null;
    characters: ICharacter[]; 
    selectedFilters: string[];
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
    const [favoriteCharacters, setFavoriteCharacters] = useState<ICharacter[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"]);
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);
    const [filters, setFilters] = useState<string[]>([]);
    const [characters, setCharacters] = useState<ICharacter[]>([]);

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

            return [...selectedFilters, filter];
        });
    }

    function favoriteCharacter(id: string) {
        const newFavoriteCharacter = characters.find(character => character.id == id);

        newFavoriteCharacter && setFavoriteCharacters([...favoriteCharacters, newFavoriteCharacter])
    }

    function getCategories() {
        let categories: string[] = [];

        data?.characters?.results.map((character: ICharacter) => 
            !categories.includes(character.species) && categories.push(character.species));
        
        setFilters(categories)
    }

    function getCharacters() {
        setCharacters(data.characters.results);    
    } 

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
    
        getCategories();
        getCharacters();
    }, [data])

    return (
        <CharactersContext.Provider 
            value={{ 
                searchForCharacter,
                favoriteCharacter,
                selectCharacter,
                selectFilter,
                changeSearchFilter,
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
