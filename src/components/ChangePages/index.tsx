import { memo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { ICharacter } from "../../reducers/CharactersReducer";
import { useSearch } from "../../hooks/useSearch";

import "./styles.css";

interface IChangePageComponentProps {
    showFavoritePage: boolean; 
    favoriteCharacters: ICharacter[];
    handleChangeSearchByName: (nameToSearch: string) => void;
    handleChangeShowFavoritesPage: (isToShow: boolean) => void; 
}

function ChangePageComponent({ 
    showFavoritePage, 
    favoriteCharacters,
    handleChangeSearchByName, 
    handleChangeShowFavoritesPage,
    }: IChangePageComponentProps) {
    const { handleSelectFilter } = useSearch()

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
                        handleChangeSearchByName("")
                        handleChangeShowFavoritesPage(false)
                        handleSelectFilter("All")
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
                        handleChangeSearchByName("")
                        handleChangeShowFavoritesPage(true)
                        handleSelectFilter("All")
                    }}
                >
                    <h1>Favorites</h1>
                    <FaArrowRight size={20} className="arrow-icon" />
                </button>
            </div>
    )
}

export const ChangePage = memo(ChangePageComponent);