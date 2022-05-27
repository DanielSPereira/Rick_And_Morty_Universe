import { FaSearch } from "react-icons/fa";
import "./styles.css"

export function SearchBar() {
    return (
        <label htmlFor="search" className="label-search box-shadow">
            <FaSearch size="25px" color="#363F5F" />
            <input placeholder="Search..." id="search" type="text" />
        </label>
    )
}