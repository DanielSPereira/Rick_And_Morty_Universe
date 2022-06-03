import { render } from "@testing-library/react";
import { Filters } from ".";

jest.mock("../../hooks/useSearch", () => {
    return {
        useSearch: () => ({
            filters: ["All", "Human", "Alien"],
            selectedFilters: ["All"]
        })
    }
})

describe("Filters Component", () => {
    it("should render the category filter options", () => {
        const { getByTestId } = render(<Filters />);
    
        expect(getByTestId("All-filter").textContent).toBe("All");
        expect(getByTestId("Human-filter").textContent).toBe("Human");
        expect(getByTestId("Alien-filter").textContent).toBe("Alien");
    })
});