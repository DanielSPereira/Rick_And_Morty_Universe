import { Pagination } from "@mui/material";

import { useNavigation } from "../../../hooks/useNavigation";

export function ExplorePagination() {
    const { explorePagesAmount, exploreCurrentPage, handleChangeExplorePage } = useNavigation();
    
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
            page={exploreCurrentPage}
            count={explorePagesAmount}
            onChange={handleChangeExplorePage}
        /> 
    )
}