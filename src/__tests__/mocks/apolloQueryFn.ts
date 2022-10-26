import { _characters } from "@/__tests__/mocks/_characters";
import { ApolloQueryResult, QueryOptions } from "@apollo/client";

export const apolloQueryFn = async ({ variables }: QueryOptions<unknown, unknown>): Promise<ApolloQueryResult<unknown>> => { 
    let CharacterName = (variables as { CharacterName: string }).CharacterName;

    const response = {
        data: {
            characters: {
                results: _characters
                    .filter(char => {
                        if (!CharacterName) return char;

                        return char.name.toLowerCase().includes(CharacterName.toLowerCase());
                    }),
                info: {
                    pages: 10,
                }
            }
        },
        loading: false,
        networkStatus: 1
    }

    return response;
};