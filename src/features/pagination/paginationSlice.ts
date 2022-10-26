import { getCharacters } from "@/features/characters/charactersSlice";
import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";

type Pagination = { pagesAmount: number; currentPage: number; }

export type InitialState = {
    page: "all" | "favorites",
    favorites: Pagination;
    all: Pagination;
}

export type SelectState = {
    pagination: InitialState;
}

const initialState: InitialState = {
    page: "all",
    favorites: {
        pagesAmount: 1,
        currentPage: 1,
    },
    all: {
        pagesAmount: 1,
        currentPage: 1,
    },
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers,
    extraReducers: builder => {
        
        builder.addCase(getCharacters.fulfilled, (state, action) => {
            let pagesAmount = action.payload.characters.info.pages;

            state.all.pagesAmount = pagesAmount;
        })
    },
})

export const selectPagination = ({ pagination }: SelectState) => ({
    all: pagination.all,
    page: pagination.page,
    favorites: pagination.favorites,
});

export const { 
    changePage, 
    setFavoritesPagesAmount, 
    setFavoritesCurrentPage, 
    setAllPagesAmount, 
    setAllCurrentPage 
} = paginationSlice.actions;
export default paginationSlice.reducer;
