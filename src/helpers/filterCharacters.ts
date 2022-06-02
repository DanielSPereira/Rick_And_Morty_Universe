import { ICharacter } from "../reducers/CharactersReducer";

export function filterCharacters(selectedFilters: string[], characters: ICharacter[]): ICharacter[] {
    if (selectedFilters.includes("All")) return characters;

    const filteredCharacters: ICharacter[] = characters.filter(character => selectedFilters.includes(character.species))

    return filteredCharacters;
}