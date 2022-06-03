import { act, renderHook } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";

import { CharactersProvider, useCharactersTest } from "./CharactersContext";
import { GET_CHARACTERS } from "../graphql/GET_CHARACTERS";

const mocks = [
    {
        request: {
          query: GET_CHARACTERS,
          variables: {
            CharacterName: "", 
            Page: 1
          },
        },
        result: {
          data: {
            characters: {
                info: {
                    pages: 42
                },
                results: {
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
            }
          },
        },
      },
];



describe("Characters Context", () => {
    beforeEach(() => {
      jest.mock("../helpers/createFIlters", () => {
        return {
          createFilters() {
            return ["All"]
          }
        }
      })
    })

    it("should add new character to favorite list", async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
                <MockedProvider mocks={mocks} addTypename={false}>
                    <CharactersProvider>{children}</CharactersProvider>
                </MockedProvider>
        )

        const { result } = renderHook(() => useCharactersTest(), {
            wrapper
        })

        const character = {
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

        // TODO
        act(() => result.current.handleAddFavoriteCharacter(character));

        expect(result.current.favoriteCharacters).toStrictEqual(
          expect.arrayContaining([
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
          ])
        );
    });
});