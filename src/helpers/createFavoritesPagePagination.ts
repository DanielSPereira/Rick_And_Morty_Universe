import { ICharacter } from "../reducers/CharactersReducer";

export function createFavoritesPagePagination(favoritesCharacters: ICharacter[]) {
    let index = 0;
    let pagination: ICharacter[][] = [[]];

    for (let i = 0; i < favoritesCharacters.length; i++) {
        if ((i + 1) % 21 == 0) {
            index++
            pagination[index] = [];
        }

        pagination[index].push(favoritesCharacters[i])
    }
    return pagination;
}