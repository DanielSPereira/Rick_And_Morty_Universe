import { useEffect, useRef, useState } from "react"
import { useCharacters } from "../../hooks/useCharacters"
import { CharacterCard } from "../CharacterCard"
import { CardSkeletonLoad } from "../CharacterCard/CardSkeletonLoad"
import { CharacterInfoModal } from "../CharacterInfoModal"
import { Filters } from "../Filters"
import { SearchBar } from "../SearchBar"
import "./styles.css"


export function Content() {
    const toolbar = useRef<HTMLDivElement>(null)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { characters, loading } = useCharacters();

    function handleCloseModal() {
        setIsModalOpen(false);
    }
    
    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function fixContentOnTop() {
        if (window.pageYOffset > toolbar.current?.offsetTop! - 10) {
            toolbar.current?.classList.add("sticky");
        } else {
            toolbar.current?.classList.remove("sticky");
        }
    }
    
    useEffect(() => {
        if (!toolbar.current) return;

        window.addEventListener("scroll", fixContentOnTop)
    }, [])

    return (
        <section className="content">
            <div className="container-content">
                <div className="toolbar" ref={toolbar}>
                    <SearchBar />
                    <Filters />
                </div>

                <div className="cards-wrapper">
                    {
                        loading ? (
                            <CardSkeletonLoad />
                        ) : (
                            characters.map(((character, idx) => (
                                <CharacterCard
                                    key={character.name + idx}
                                    character={character} 
                                    handleOpenModal={handleOpenModal} 
                                />
                            )))
                        )
                    }
                </div>
            </div>
            
            <CharacterInfoModal 
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal} 
            />
        </section>
    )
}