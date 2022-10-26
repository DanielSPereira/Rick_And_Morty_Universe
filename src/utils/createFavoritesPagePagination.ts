import { Character } from "@/types/character";

export function createFavoritesPagePagination(favoritesCharacters: Character[]) {
    let index = 0;
    let pagination: Character[][] = [[]];

    for (let i = 0; i < favoritesCharacters.length; i++) {
        if ((i + 1) % 21 == 0) {
            index++
            pagination[index] = [];
        }

        pagination[index].push(favoritesCharacters[i])
    }
    return pagination;
}