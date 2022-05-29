import { useCharacters } from "../../hooks/useCharacters";
import { FaStar } from "react-icons/fa"
import { useState } from "react";
import "./styles.css"

export function TabPageWidget() {
    const [openPopover, setOpenPopover] = useState(false);

    const { setPage, page } = useCharacters();

    return (
        <>
            {
                openPopover && (
                    <div className="popover">
                        <button 
                            onClick={() => setPage("Explore")} 
                            className={
                                page == "Explore" ? 
                                    "selected-page border-b-2 border-solid border-emerald-600" : 
                                    "border-b-2 border-solid border-emerald-600"}
                        >
                            Explore
                        </button>
                        
                        <button 
                            onClick={() => setPage("Favorites")} 
                            className={
                                page == "Favorites" ? 
                                "selected-page" : 
                                ""
                            }
                        >
                            Favorites
                        </button>
                    </div>
                )
            }
            <button onClick={() => setOpenPopover(!openPopover)} className="widget-anchor">
                <FaStar size={20} color="yellow" />
            </button>
        </>
    )
};
