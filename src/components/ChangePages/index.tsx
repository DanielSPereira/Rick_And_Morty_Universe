import React, { memo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button, Flex } from "./styles";

interface IChangePageComponentProps {
    page: "all" | "favorites";
    hasFavorites: boolean;
    changePage: (page: "all" | "favorites") => void; 
}

function ChangePageComponent({ 
    page, 
    hasFavorites,
    changePage,
}: IChangePageComponentProps) {

    return (
        <Flex>
            <Button 
                data-testid="page-all"
                variant={page === "all" ? "disabled" : "enabled"}
                disabled={page === "all"}
                type="button" 
                onClick={() => {
                    changePage("all");
                }}
            >
                <FaArrowLeft size={20} className="arrow-icon" />
                <h1>Explore</h1>
            </Button>

            <Button
                data-testid="page-favorites"
                variant={!hasFavorites || page === "favorites" ? "disabled" : "enabled"}
                disabled={!hasFavorites || page === "favorites"}
                type="button" 
                onClick={() => {
                    changePage("favorites");
                }}
            >
                <h1>Favorites</h1>
                <FaArrowRight size={20} className="arrow-icon" />
            </Button>
        </Flex>
    )
}

export default memo(ChangePageComponent);