import { useCallback, useState } from "react";
import { CharacterCard } from "../CharacterCard";
import { useCharacters } from "../../hooks/useCharacters";
import { Pagination } from '@mui/material';
import { CharacterInfoModal } from "../CharacterInfoModal";
import { CardSkeletonLoad } from "../CharacterCard/CardSkeletonLoad";

import "./styles.css"


export function CardsList() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { 
        characters, 
        loading, 
        page, 
        pagesAmount, 
        selectedFilters,
        handleChangePage, 
    } = useCharacters();

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    
    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <div className="container-content pb-12">
            {
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
                    <h1 className="block mx-auto text-center text-white text-3xl py-48">
                        Could not find characters that match this filter!
                    </h1>
                ) : ""
            }            
            {
                !selectedFilters.includes("Favorites") ?
                    <div className="flex justify-center">
                        <Pagination
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
                        />
                    </div> 
                    : <></>
            }

            <CharacterInfoModal 
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal} 
            />
        </div>
    )
}