import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
    query FeedSearchQuery($CharacterName: String, $Page: Int) { 
        characters(page: $Page, filter: { name: $CharacterName }) {
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