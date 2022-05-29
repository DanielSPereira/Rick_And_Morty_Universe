import { useEffect, useRef } from "react";
import { Filters } from "../Filters";
import { SearchBar } from "../SearchBar";

import "./styles.css"

export function Toolbar() {
    const toolbar = useRef<HTMLDivElement>(null)

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
        <div className="toolbar" ref={toolbar}>
            <div className="container-content toolbar-wrapper"> 
                <SearchBar />
                <Filters />
            </div>
        </div>
    )
}