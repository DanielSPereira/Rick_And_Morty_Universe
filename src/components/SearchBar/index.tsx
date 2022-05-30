import { FaSearch } from "react-icons/fa";
import { useCharacters } from "../../hooks/useCharacters";

import "./styles.css"

export function SearchBar() {
    const { searchFilter, searchForCharacter, changeSearchFilter } = useCharacters();

    return (
        <label htmlFor="search" className="label-search box-shadow">
            <FaSearch size="25px" color="#363F5F" />
            <input 
                onKeyPress={(e) => searchForCharacter()} 
                onChange={(e) => changeSearchFilter(e.target.value)} 
                value={searchFilter}
                placeholder="Search..." 
                id="search" 
                type="text" />
        </label>
    )
}