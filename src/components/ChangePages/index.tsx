import { memo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { ICharacter } from "../../reducers/CharactersReducer";
import { useSearch } from "../../hooks/useSearch";

import "./styles.css";

interface IChangePageComponentProps {
    showFavoritePage: boolean; 
    favoriteCharacters: ICharacter[];
    handleChangeShowFavoritesPage: (isToShow: boolean) => void; 
}

function ChangePageComponent({ 
    showFavoritePage, 
    favoriteCharacters,
    handleChangeShowFavoritesPage,
    }: IChangePageComponentProps) {

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
                        handleChangeShowFavoritesPage(false)
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
                        handleChangeShowFavoritesPage(true)
                    }}
                >
                    <h1>Favorites</h1>
                    <FaArrowRight size={20} className="arrow-icon" />
                </button>
            </div>
    )
}

export const ChangePage = memo(ChangePageComponent);