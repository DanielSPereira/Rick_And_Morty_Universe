import { render } from "@testing-library/react";
import { CharacterInfoModal } from ".";

import Modal from "react-modal";

const handleCloseModal = jest.fn();

jest.mock("../../hooks/useCharacters", () => {
    return {
        useCharacters() {
            return {
                selectedCharacter: {
                    id: "1",
                    name: "Rick",
                    status: "Alive",
                    species: "Human",
                    image: "imagem",
                    created: "2017-11-04T18:48:46.250Z",
                    episode: [{ id: "1", name: "first ep" }],
                    location: {
                        id: "1",
                        name: "last location"
                    }
                }
            }
        }
    }
});

describe("CharacterInfoModal Component", () => {    
    it("should render selected character information", () => {
        Modal.setAppElement("body");

        const { getByTestId } = render(
            <CharacterInfoModal isModalOpen={true} handleCloseModal={handleCloseModal} />
        );

        expect(getByTestId("character-modal-status").firstElementChild).toHaveClass("alive");
        expect(getByTestId("modal-last-known-location").textContent).toBe("last location");
        expect(getByTestId("modal-character-created").textContent).toBe("November 6, 2017");
        expect(getByTestId("character-modal-name").textContent).toBe("Rick");
        expect(getByTestId("first-seen-modal").textContent).toBe("first ep");
        expect(getByTestId("modal-episode-amount").textContent).toBe("1");
    });
});