import { useEffect, useRef } from "react";
import { Filters } from "./Filters";
import { SearchBar } from "./SearchBar";
import { Container, CustomToolbar, Marker } from "./styles";

export function Toolbar() {
    const toolbar = useRef<HTMLDivElement>(null);
    const marker = useRef<HTMLDivElement>(null);

    const fixContentOnTop = () => {
        console.log(window.pageYOffset > marker.current?.offsetTop!)

        if (window.pageYOffset > marker.current?.offsetTop! - 10) {
            toolbar.current?.classList.add("sticky");
            marker.current?.classList.add("sticky");
        } else {
            toolbar.current?.classList.remove("sticky");
            marker.current?.classList.remove("sticky");
        }
    }
    
    useEffect(() => {
        if (!toolbar.current) return;

        window.addEventListener("scroll", fixContentOnTop)

        return () => {
            window.removeEventListener("scroll", fixContentOnTop);
        }
    }, [])

    return (
        <Marker ref={marker}>
            <CustomToolbar ref={toolbar}>
                <Container> 
                    <SearchBar />
                    <Filters />
                </Container>
            </CustomToolbar>
        </Marker>
    )
}