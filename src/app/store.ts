import charactersReducer, { charactersSlice } from "@/features/characters/charactersSlice";
import paginationReducer, { paginationSlice } from "@/features/pagination/paginationSlice";
import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({    
    [charactersSlice.name]: charactersReducer,
    [paginationSlice.name]: paginationReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
      reducer: rootReducer,
      preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];