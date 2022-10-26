import { selectCharacters } from "@/features/characters/charactersSlice";
import { selectPagination, setFavoritesCurrentPage, setFavoritesPagesAmount } from "@/features/pagination/paginationSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppStore } from "@/hooks/useAppStore";
import { Pagination } from "@mui/material";
import { createFavoritesPagePagination } from "@/utils/createFavoritesPagePagination";
import { useEffect } from "react";

function FavoritesPagination() {
    const { favoritesCharacters } = useAppStore(selectCharacters);
    const { favorites } = useAppStore(selectPagination);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const favoritesPagination = createFavoritesPagePagination(favoritesCharacters);

        dispatch(setFavoritesPagesAmount(favoritesPagination.length));
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [favoritesCharacters]);

    return (
        <Pagination
            sx={{
                "& button.MuiButtonBase-root, div.MuiPaginationItem-root": {
                    color: "white !important",
                    border: "1px solid #133962",
                    fontSize: "1rem"
                }
            }}
            color="primary"
            variant="outlined"
            page={favorites.currentPage}
            count={favorites.pagesAmount}
            onChange={(_, page) => dispatch(setFavoritesCurrentPage(page))}
        /> 
    )
}

export default FavoritesPagination;
