import { useCallback, useState } from "react";
import { CharacterCard } from "../CharacterCard";
import { useCharacters } from "../../hooks/useCharacters";
import { Pagination } from '@mui/material';
import { CharacterInfoModal } from "../CharacterInfoModal";
import { CardSkeletonLoad } from "../CharacterCard/CardSkeletonLoad";

import "./styles.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export function CardsList() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { 
        characters, 
        loading, 
        page, 
        pagesAmount, 
        showFavoritePage,
        favoriteCharacters,
        favoritePage,
        favoritePagesAmount,
        handleChangePage,
        setSearchFilter,
        handleChangeFavoritePage,
        setShowFavoritePage
    } = useCharacters();

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    
    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <div className="container-content pb-12 mt-20 md:mt-16">
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
                    }}
                >
                    <h1>Favorites</h1>
                    <FaArrowRight size={20} className="arrow-icon" />
                </button>
            </div>
            
            {
                showFavoritePage ? 
                    favoriteCharacters?.length ? (
                        <div className="cards-wrapper">
                            {
                                favoriteCharacters?.map((favoriteCharacters, idx) => (
                                    <CharacterCard
                                        key={favoriteCharacters.name + idx}
                                        character={favoriteCharacters} 
                                        handleOpenModal={handleOpenModal} 
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <h1 className="block mx-auto text-center text-white text-3xl py-36">
                            Could not find characters!
                        </h1>
                    ) : 
                loading ? (
                    <div className="cards-wrapper">
                        <CardSkeletonLoad />
                    </div>
                ) : !loading && characters.length ? (
                    <div className="cards-wrapper">
                        {
                            characters.map((character, idx) => (
                                <CharacterCard
                                    key={character.name + idx}
                                    character={character} 
                                    handleOpenModal={handleOpenModal} 
                                />
                            ))
                        }
                    </div>
                ) : !loading && !characters.length ? (
                    <h1 className="block mx-auto text-center text-white text-3xl py-36">
                        Could not find characters!
                    </h1>
                ) : ""
            }            
            <div className="flex justify-center">
                {
                    !showFavoritePage ? characters.length ? <Pagination
                        sx={{
                            "& button.MuiButtonBase-root, div.MuiPaginationItem-root": {
                                color: "white !important",
                                border: "1px solid #133962",
                                fontSize: "1rem"
                            }
                        }}
                        color="primary"
                        variant="outlined"
                        page={page}
                        count={pagesAmount}
                        onChange={handleChangePage}
                    /> : <></> : favoriteCharacters?.length ? <Pagination
                        sx={{
                            "& button.MuiButtonBase-root, div.MuiPaginationItem-root": {
                                color: "white !important",
                                border: "1px solid #133962",
                                fontSize: "1rem"
                            }
                        }}
                        color="primary"
                        variant="outlined"
                        page={favoritePage}
                        count={favoritePagesAmount}
                        onChange={handleChangeFavoritePage}
                    /> : <></>
                }
            </div> 

            <CharacterInfoModal 
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal} 
            />
        </div>
    )
}