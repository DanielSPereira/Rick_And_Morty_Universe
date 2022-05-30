import { render } from "@testing-library/react";
import { SearchBar } from ".";


describe("SearchBar Component", () => {
    it("should render input with placeholder 'Search...'", () => {
        const { getByPlaceholderText } = render(<SearchBar />);
        
        expect(getByPlaceholderText("Search...")).toBeInTheDocument();
    });
});