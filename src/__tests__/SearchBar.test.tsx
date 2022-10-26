import React from "react";
import { describe, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./config/renderWithProviders";

import { _characters } from "@/__tests__/mocks/_characters";
import { setupStore } from "@/app/store";
import { apolloClient } from "@/lib/apollo";
import { SearchBar } from "@/components/Toolbar/SearchBar";
import { GET_CHARACTERS } from "@/graphql/GET_CHARACTERS";
import { getCharacters } from "@/features/characters/charactersSlice";
import { apolloQueryFn } from "./mocks/apolloQueryFn";

describe("search bar features", () => {
    const apolloQuerySpy = vi.spyOn(apolloClient, "query").mockImplementation(apolloQueryFn);
    
    const store = setupStore();
    
    it("should be able to fetch characters whose names match with input value", async () => {
        const { getByTestId } = renderWithProviders(
            <SearchBar />, 
            { store }
        );
        
        const input = getByTestId("search-bar");
        
        input.focus();

        await userEvent.type(input, "morty");

        expect(input).toHaveProperty("value", "morty");

        await userEvent.keyboard("[Enter]");
        
        expect(apolloQuerySpy).toHaveBeenCalledWith({ 
            query: GET_CHARACTERS, 
            variables: {
                CharacterName: "morty",
                Page: 1
            }, 
        });

        const { 
            characters: { 
                characters, 
                filteredCharacters, 
                favoritesCharacters,
                filteredFavoritesCharacters,
                searchFilter,
                species,
            } 
        } = store.getState();

        expect(species).toEqual(["All", "Human"]);
        expect(searchFilter).toEqual("morty");
        expect(characters[0].name).toEqual("Morty Smith");
        expect(filteredCharacters[0].name).toEqual("Morty Smith");
        

        expect(characters).toHaveLength(1);
        expect(filteredCharacters).toHaveLength(1);
        expect(favoritesCharacters).toHaveLength(0);
        expect(filteredFavoritesCharacters).toHaveLength(0);
    });


    it("should be able remove search filter and reset characters list", async () => {
        await store.dispatch(getCharacters({ CharacterName: "morty", Page: 1 }))
        
        const { getByTestId } = renderWithProviders(
            <SearchBar />, 
            { store }
        );
        
        const input = getByTestId("search-bar");
        
        input.focus();

        expect(input).toHaveProperty("value", "");

        await userEvent.keyboard("[Enter]");
        
        expect(apolloQuerySpy).toHaveBeenCalledWith({ 
            query: GET_CHARACTERS, 
            variables: {
                CharacterName: "",
                Page: 1
            }, 
        });

        const { 
            characters: { 
                characters, 
                filteredCharacters, 
                favoritesCharacters,
                filteredFavoritesCharacters,
                searchFilter,
                species,
            } 
        } = store.getState();

        expect(searchFilter).toEqual("");
        expect(species).toEqual(["All", "Human", "Alien"]);
        expect(characters).toHaveLength(3);
        expect(filteredCharacters).toHaveLength(3);
        expect(favoritesCharacters).toHaveLength(0);
        expect(filteredFavoritesCharacters).toHaveLength(0);
    });
});
