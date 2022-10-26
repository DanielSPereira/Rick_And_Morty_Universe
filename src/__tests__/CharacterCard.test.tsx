import React from "react";
import { renderWithProviders } from "./config/renderWithProviders";
import { describe, expect, it, vi } from "vitest";

import { CharacterCard } from "@/components/CharacterCard";

import { _characters } from "@/__tests__/mocks/_characters";
import { fireEvent } from "@testing-library/react";
import { setupStore } from "@/app/store";

describe("character card features", async () => {
    const handleOpenModal = vi.fn(() => {});

    const store = setupStore();

    const character = _characters[0];

    it("should render the character information passed as props to the component CharacterCard", () => {
        const { getByTestId } = renderWithProviders(
            <CharacterCard 
                character={character}
                handleOpenModal={handleOpenModal} 
            />, 
            { store }
        );
        
        expect(getByTestId("character-name").textContent).toEqual(character.name);
        expect(getByTestId("episode-name").textContent).toEqual(character.episode[0].name);
        expect(
            getByTestId("character-status-species").textContent?.includes(character.status) && 
            getByTestId("character-status-species").textContent?.includes(character.species)
        ).toEqual(true);
    });

    it("should be able to add a character to the favorites list if it is not already in there or remove it otherwise", async () => {
        const { getByTestId } = renderWithProviders(
            <CharacterCard 
                character={character} 
                handleOpenModal={handleOpenModal} 
            />, 
            { store }
        );

        expect(store.getState().characters.species).toEqual(["All"]);
        expect(store.getState().characters.favoritesCharacters.includes(character)).toEqual(false);
        expect(store.getState().characters.favoritesCharacters).toHaveLength(0);
        
        // should add to favorites list
        fireEvent.click(getByTestId("favorite-button"));

        expect(store.getState().characters.favoritesSpecies).toEqual(["All", "Human"]);
        expect(store.getState().characters.favoritesCharacters.includes(character)).toEqual(true);
        expect(store.getState().characters.favoritesCharacters).toHaveLength(1);

        // should remove from favorites list
        fireEvent.click(getByTestId("favorite-button"));

        expect(store.getState().characters.species).toEqual(["All"]);
        expect(store.getState().characters.favoritesCharacters.includes(character)).toEqual(false);
        expect(store.getState().characters.favoritesCharacters).toHaveLength(0);
    });
});
