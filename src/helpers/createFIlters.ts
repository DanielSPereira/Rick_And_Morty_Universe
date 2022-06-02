import { ICharacter } from "../reducers/CharactersReducer";

export function createFilters(characters: ICharacter[]) {
    const filters: string[] = characters.reduce((acc: string[], curr: ICharacter) => {
        if (acc.includes(curr.species)) return acc;

        acc.push(curr.species);

        return acc;
    }, [])

    return ["All", ...filters];
}