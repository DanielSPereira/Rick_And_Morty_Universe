import { useState } from "react"
import { useCharacters } from "../../hooks/useCharacters"
import { CharacterCard } from "../CharacterCard"
import { CardSkeletonLoad } from "../CharacterCard/CardSkeletonLoad"
import { CharacterInfoModal } from "../CharacterInfoModal"

import "./styles.css"


export function CardsList() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { favoriteCharacters, characters, loading, page } = useCharacters();

    function handleCloseModal() {
        setIsModalOpen(false);
    }
    
    function handleOpenModal() {
        setIsModalOpen(true);
    }

    return (
        <div className="container-content">
            <div className="cards-wrapper">
                {
                    loading ? (
                        <CardSkeletonLoad />
                    ) : (
                        page == "Favorites" ? 
                            favoriteCharacters?.map((character, idx) => (
                                <CharacterCard
                                    key={character.name + idx}
                                    character={character} 
                                    handleOpenModal={handleOpenModal} 
                            />)) :
                            characters.map((character, idx) => (
                                <CharacterCard
                                    key={character.name + idx}
                                    character={character} 
                                    handleOpenModal={handleOpenModal} 
                                />
                            ))
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