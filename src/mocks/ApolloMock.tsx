import { MockedProvider } from '@apollo/client/testing';
import { CharactersProvider, GET_CHARACTERS } from '../context/CharactersContext';

const mocks = [
    {
        request: {
          query: GET_CHARACTERS,
          variables: {
            FilterCharacter: 'Rick',
          },
        },
        result: {
          data: {
            characters: {  
                results: [
                    {
                        id: "1",
                        name: "Rick",
                        status: "Alive",
                        species: "Human",
                        image: "imagem",
                        created: "january 2, 2015",
                        episode: [{ id: "1", name: "first ep" }],
                        location: {
                            id: "1",
                            name: "first location"
                        }
                    }
                ] 
            },
          },
        },
    },
];

export const ApolloMock = 
    () => 
        <MockedProvider mocks={mocks} addTypename={false}>
            <CharactersProvider>
            </CharactersProvider>
        </MockedProvider>;