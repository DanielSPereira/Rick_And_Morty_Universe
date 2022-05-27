import { useEffect, useRef, useState } from "react"
import { CharacterCard } from "../CharacterCard"
import { CharacterInfoModal } from "../CharacterInfoModal"
import { Filters } from "../Filters"
import { SearchBar } from "../SearchBar"
import "./styles.css"


export function Content() {
    const toolbar = useRef<HTMLDivElement>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleCloseModal() {
        setIsModalOpen(false);
    }
    
    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function fixContentOnTop() {
        if (window.pageYOffset > toolbar.current?.offsetTop! - 40) {
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
        <section className="content w-full">
            <div className="container-content">
                <div className="toolbar" ref={toolbar}>
                    <SearchBar />
                    <Filters />
                </div>

                <div className="cards-wrapper">
                    <CharacterCard handleOpenModal={handleOpenModal} />
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