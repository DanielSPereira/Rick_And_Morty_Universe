import React from "react";
import { describe, it, vi } from "vitest";
import { renderWithProviders } from "./config/renderWithProviders";

import { setupStore } from "@/app/store";
import { Filters } from "@/components/Toolbar/Filters";
import { _characters } from "@/__tests__/mocks/_characters";
import { getCharacters, selectSpecie } from "@/features/characters/charactersSlice";
import { apolloQueryFn } from "./mocks/apolloQueryFn";
import { apolloClient } from "@/lib/apollo";
import { GET_CHARACTERS } from "@/graphql/GET_CHARACTERS";
import { fireEvent } from "@testing-library/react";


describe("filters features", () => {
    const apolloQuerySpy = vi.spyOn(apolloClient, "query").mockImplementation(apolloQueryFn);
    
    const store = setupStore();
    
    it("should filter the characters by them species", async () => {
        await store.dispatch(getCharacters({
            CharacterName: "",
            Page: 1,
        }));
        
        expect(apolloQuerySpy).toHaveBeenCalledWith({ 
            query: GET_CHARACTERS, 
            variables: {
                CharacterName: "",
                Page: 1
            }, 
        });
    
        const { getByTestId } = renderWithProviders(
            <Filters />, 
            { store }
        );

        const alienFilterBtn = getByTestId("Alien-filter");

        expect(store.getState().characters.species).toEqual(["All", "Human", "Alien"]);

        fireEvent.click(alienFilterBtn);

        expect(store.getState().characters.selectedSpecies).toEqual(["Alien"]);
        expect(store.getState().characters.filteredCharacters).toHaveLength(1);
        expect(store.getState().characters.filteredCharacters[0].name).toEqual("Alien Googah");
    
    });
});
