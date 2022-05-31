import { FaSearch } from "react-icons/fa";
import { useSearch } from "../../hooks/useSearch";

import "./styles.css"

export function SearchBar() {
    const { searchForCharacter } = useSearch();

    return (
        <label htmlFor="search" className="label-search box-shadow">
            <FaSearch size="25px" color="#363F5F" />
            <input 
                onKeyPress={(e) => {
                    if (e.key == "Enter") {
                        searchForCharacter(e.currentTarget.value);
                    } 
                }}  
                placeholder="Search..." 
                id="search" 
                type="text" />
        </label>
    )
}