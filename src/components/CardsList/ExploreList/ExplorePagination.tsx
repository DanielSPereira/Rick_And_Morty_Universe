import React from "react";
import { getCharacters, selectFilters, selectSpecie, setSpecies } from "@/features/characters/charactersSlice";
import { selectPagination, setAllCurrentPage } from "@/features/pagination/paginationSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppStore } from "@/hooks/useAppStore";
import { Pagination } from "@mui/material";


function ExplorePagination() {
    const { all } = useAppStore(selectPagination);
    const { searchFilter } = useAppStore(selectFilters);
    const dispatch = useAppDispatch();

    return (
        <Pagination
            sx={{
                "& button.MuiButtonBase-root, div.MuiPaginationItem-root": {
                    color: "white !important",
                    border: "1px solid #133962",
                    fontSize: "1rem",
                    marginBottom: ".5rem",
                }
            }}
            color="primary"
            variant="outlined"
            page={all.currentPage}
            count={all.pagesAmount}
            onChange={(_, page) => {
                dispatch(selectSpecie("All"));
                dispatch(setAllCurrentPage(page));
                dispatch(getCharacters({ CharacterName: searchFilter, Page: page }));
            }}
        /> 
    )
}

export default ExplorePagination;