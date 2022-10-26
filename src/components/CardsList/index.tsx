import React, { useEffect, useState } from "react";

import ChangePage from "@/components/ChangePages";
import ExploreList from "@/components/CardsList/ExploreList";
import FavoritesList from "@/components/CardsList/FavoritesList";
import CharacterInfoModal from "@/components/CharacterInfoModal";
import ExplorePagination from "@/components/CardsList/ExploreList/ExplorePagination";
import FavoritesPagination from "@/components/CardsList/FavoritesList/FavoritesPagination";

import { useAppStore } from "@/hooks/useAppStore";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { getCharacters, selectCharacters, setSpecies } from "@/features/characters/charactersSlice";
import { changePage, selectPagination } from "@/features/pagination/paginationSlice";

import { Container, PaginationContainer } from "./styles";

export function CardsList() {    
    const dispatch = useAppDispatch();
    const { page } = useAppStore(selectPagination);
    const { favoritesCharacters } = useAppStore(selectCharacters);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getCharacters())
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])
    
    const hasFavorites = !!favoritesCharacters.length;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    return (
        <Container>
            <ChangePage
                page={page}
                hasFavorites={hasFavorites}
                changePage={(page) => dispatch(changePage(page))}
            />
            
            {
                page === "favorites" ? (
                    <>
                        <FavoritesList handleOpenModal={handleOpenModal} />
                        <PaginationContainer>
                            <FavoritesPagination />                 
                        </PaginationContainer> 
                    </>
                ) : (
                    <>
                        <ExploreList handleOpenModal={handleOpenModal} /> 
                        <PaginationContainer>
                            <ExplorePagination />                 
                        </PaginationContainer>
                    </>
                )
            }             

            <CharacterInfoModal 
                isModalOpen={isModalOpen}
                handleCloseModal={() => setIsModalOpen(false)} 
            />
        </Container>
    )
}