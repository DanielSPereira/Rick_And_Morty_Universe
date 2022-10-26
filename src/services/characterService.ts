import { GET_CHARACTERS } from "@/graphql/GET_CHARACTERS"
import { apolloClient } from "@/lib/apollo"
import { Character } from "@/types/character";

type GetCharactersProps = { CharacterName: string, Page: number };
export type GetCharactersReturnType = { results: Character[]; info: { pages: number} };

export const characterService = (() => ({
    async getCharacters(variables?: GetCharactersProps): Promise<{ characters: GetCharactersReturnType }> {
        try {
            const response = await apolloClient.query<{ characters: GetCharactersReturnType }>({ 
                query: GET_CHARACTERS, 
                variables, 
            });
        
            if (!response || !response.data) throw new Error("Could not get characters!")
            
            return response.data;
        } catch (err) {

            throw err;
        }
    }
}))()