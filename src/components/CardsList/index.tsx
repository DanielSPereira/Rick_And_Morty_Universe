import { useCallback, useState } from "react";
import { CharacterCard } from "../CharacterCard";
import { useCharacters } from "../../hooks/useCharacters";
import { Pagination } from '@mui/material';
import { CharacterInfoModal } from "../CharacterInfoModal";
import { CardSkeletonLoad } from "../CharacterCard/CardSkeletonLoad";
import { ChangePage } from "../ChangePages";

import "./styles.css"
import { useNavigation } from "../../hooks/useNavigation";

export function CardsList() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { characters, favoriteCharacters, loading } = useCharacters();
    const { 
        page,
        pagesAmount, 
        showFavoritePage,
        favoritePage,
        favoritePagesAmount,
        setSearchFilter,
        handleChangeFavoritePage,
        handleChangePage,
        setShowFavoritePage 
    } = useNavigation();

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    
    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <div className="content container-content pb-12 mt-20 md:mt-16">
            <ChangePage 
                showFavoritePage={showFavoritePage}
                setSearchFilter={setSearchFilter} 
                setShowFavoritePage={setShowFavoritePage}
                favoriteCharacters={favoriteCharacters}
            />
            
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