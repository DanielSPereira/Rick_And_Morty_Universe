import { useCallback, useState } from "react";

import { ChangePage } from "../ChangePages";
import { ExploreList } from "./ExploreList";
import { FavoritesList } from "./FavoritesList";
import { useSearch } from "../../hooks/useSearch";
import { useCharacters } from "../../hooks/useCharacters";
import { useNavigation } from "../../hooks/useNavigation";
import { CharacterInfoModal } from "../CharacterInfoModal";
import { ExplorePagination } from "./ExploreList/ExplorePagination";
import { FavoritesPagination } from "./FavoritesList/FavoritesPagination";

import "./styles.css"

export function CardsList() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { handleSearchByName } = useSearch();
    const { characters, favoritesPagePagination } = useCharacters();
    const { showFavoritesPage, handleChangeShowFavoritesPage } = useNavigation();

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    
    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <div className="content container-content pb-12 mt-20 md:mt-16">
            <ChangePage 
                showFavoritePage={showFavoritesPage}
                handleChangeSearchByName={handleSearchByName} 
                handleChangeShowFavoritesPage={handleChangeShowFavoritesPage}
                favoriteCharacters={favoritesPagePagination}
            />
            
            {
                showFavoritesPage ? 
                    <FavoritesList handleOpenModal={handleOpenModal} /> : 
                    <ExploreList handleOpenModal={handleOpenModal} />
            }            

            <div className="flex justify-center">
                {
                    showFavoritesPage ? (
                        favoritesPagePagination?.length ? (
                            <FavoritesPagination />
                        ) : <></>
                        
                    ) : (   
                        characters.length ? (
                            <ExplorePagination />
                        ) : <></>
                    ) 
                }
            </div> 

            <CharacterInfoModal 
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal} 
            />
        </div>
    )
}