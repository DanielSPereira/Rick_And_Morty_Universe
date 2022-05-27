import { useState } from "react"
import { CharacterCard } from "../CharacterCard"
import { CharacterInfoModal } from "../CharacterInfoModal"
import { Filters } from "../Filters"
import { SearchBar } from "../SearchBar"
import "./styles.css"


export function Content() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleCloseModal() {
        setIsModalOpen(false);
    }
    
    function handleOpenModal() {
        setIsModalOpen(true);
    }

    return (
        <section className="content">
            <div className="container-content">
                <div className="toolbar">
                    <SearchBar />
                    <Filters />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-4 gap-12 mt-12">
                    <CharacterCard handleOpenModal={handleOpenModal} />
                    <CharacterCard handleOpenModal={handleOpenModal} />
                    <CharacterCard handleOpenModal={handleOpenModal} />

                    <CharacterInfoModal 
                        isModalOpen={isModalOpen}
                        handleCloseModal={handleCloseModal} 
                    />
                </div>
            </div>
        </section>
    )
}