import { Pagination } from "@mui/material";

import { useNavigation } from "../../../hooks/useNavigation";

export function FavoritesPagination() {
    const { favoritesCurrentPage, favoritePagesAmount, handleChangeFavoritesPage } = useNavigation();
    
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
            page={favoritesCurrentPage}
            count={favoritePagesAmount}
            onChange={handleChangeFavoritesPage}
        /> 
    )
}