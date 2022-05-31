import { memo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { ICharacter } from "../../context/CharactersContext";
import { useSearch } from "../../hooks/useSearch";

import "./styles.css";

interface IChangePageComponentProps {
    showFavoritePage: boolean; 
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
    setShowFavoritePage: React.Dispatch<React.SetStateAction<boolean>>; 
    favoriteCharacters: ICharacter[];
}

function ChangePageComponent({ 
    showFavoritePage, 
    setSearchFilter, 
    setShowFavoritePage,
    favoriteCharacters,
    }: IChangePageComponentProps) {
    const { selectFilter } = useSearch()

    return (
        <div className="flex justify-between mb-6">
                <button 
                    className={
                        !showFavoritePage ? 
                            "explore-button disabled" :
                            "explore-button enable" 
                    } 
                    disabled={!showFavoritePage}
                    type="button" 
                    onClick={() => {
                        setSearchFilter("")
                        setShowFavoritePage(false)
                        selectFilter("All")
                    }}
                >
                    <FaArrowLeft size={20} className="arrow-icon" />
                    <h1>Explore</h1>
                </button>
                <button 
                    className={
                        !favoriteCharacters?.length && !showFavoritePage || showFavoritePage ? 
                            "favorite-button disabled" :
                            "favorite-button enable" 
                    } 
                    disabled={!favoriteCharacters?.length && !showFavoritePage || showFavoritePage}
                    type="button" 
                    onClick={() => {
                        setSearchFilter("")
                        setShowFavoritePage(true)
                        selectFilter("All")
                    }}
                >
                    <h1>Favorites</h1>
                    <FaArrowRight size={20} className="arrow-icon" />
                </button>
            </div>
    )
}

export const ChangePage = memo(ChangePageComponent);