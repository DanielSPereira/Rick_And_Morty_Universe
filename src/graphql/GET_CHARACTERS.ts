import { gql } from "@apollo/client";

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