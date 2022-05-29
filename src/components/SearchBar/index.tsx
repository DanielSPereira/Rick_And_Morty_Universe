import { FaSearch } from "react-icons/fa";
import { useCharacters } from "../../hooks/useCharacters";
import "./styles.css"

export function SearchBar() {
    const { searchForCharacter, changeSearchFilter } = useCharacters();

    return (
        <label htmlFor="search" className="label-search box-shadow">
            <FaSearch size="25px" color="#363F5F" />
            <input 
                onKeyPress={(e) => e.key == "Enter" && searchForCharacter()} 
                onChange={(e) => changeSearchFilter(e.target.value)} 
                placeholder="Search..." 
                id="search" 
                type="text" />
        </label>
    )
}