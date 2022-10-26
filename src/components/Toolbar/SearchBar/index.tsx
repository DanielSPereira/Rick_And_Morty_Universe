import React, { useState } from "react";
import { getCharacters, searchFilter } from "@/features/characters/charactersSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { FaSearch } from "react-icons/fa";
import { Search } from "./styles";

export function SearchBar() {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();

    return (
        <Search htmlFor="search" className="label-search box-shadow">
            <FaSearch size="25px" color="#363F5F" />
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                data-testid="search-bar"
                placeholder="Search..." 
                id="search" 
                type="text" 
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        dispatch(searchFilter(e.currentTarget.value))
                        dispatch(getCharacters({ CharacterName: e.currentTarget.value, Page: 1 }));
                    } 
                }}  
            />
        </Search>
    )
}