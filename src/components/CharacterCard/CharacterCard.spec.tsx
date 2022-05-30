import { render } from "@testing-library/react";
import { CharacterCard } from ".";


const handleOpenModal = jest.fn();

describe("CharacterCard Component", () => {
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
    
    it("should render character information passed by props", () => {
        const { getByTestId } = render(
            <CharacterCard 
                character={character} 
                handleOpenModal={handleOpenModal}    
            />
        );

        expect(getByTestId("character-status-species").textContent).toBe("Alive - Human");
        expect(getByTestId("character-status").firstElementChild).toHaveClass("alive");
        expect(getByTestId("episode-name").textContent).toBe("first ep");
        expect(getByTestId("character-name").textContent).toBe("Rick"); 
    });
});