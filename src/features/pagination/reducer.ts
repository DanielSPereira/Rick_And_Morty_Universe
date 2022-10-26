import { InitialState } from "./paginationSlice";

export type Reducers = {
    [key: string]: (state: InitialState, action: { payload: any; type: string }) => void;
}   

export const reducers: Reducers = {
    changePage(state, action) {
        state.page = action.payload;
    },

    setFavoritesPagesAmount(state, action) {
        state.favorites.pagesAmount = action.payload;
    },

    setFavoritesCurrentPage(state, action) {
        state.favorites.currentPage = action.payload;
    },

    setAllPagesAmount(state, action) {
        state.all.pagesAmount = action.payload;
    },

    setAllCurrentPage(state, action) {
        state.all.currentPage = action.payload;
    },
}