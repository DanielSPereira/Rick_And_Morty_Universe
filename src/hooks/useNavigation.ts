import { useContextSelector } from "use-context-selector";
import { CharactersContext } from "../context/CharactersContext";

export function useNavigation() {
    const page = useContextSelector(CharactersContext, ctx => ctx.page);
    const pagesAmount = useContextSelector(CharactersContext, ctx => ctx.pagesAmount);
    const favoritePage = useContextSelector(CharactersContext, ctx => ctx.favoritePage);
    const showFavoritePage = useContextSelector(CharactersContext, ctx => ctx.showFavoritePage);
    const favoritePagesAmount = useContextSelector(CharactersContext, ctx => ctx.favoritePagesAmount);
    const setShowFavoritePage = useContextSelector(CharactersContext, ctx => ctx.setShowFavoritePage);
    const setSearchFilter = useContextSelector(CharactersContext, ctx => ctx.setSearchFilter);
    const handleChangePage = useContextSelector(CharactersContext, ctx => ctx.handleChangePage);
    const handleChangeFavoritePage = useContextSelector(CharactersContext, ctx => ctx.handleChangeFavoritePage);
    
    return {
        page,
        pagesAmount,
        favoritePage,
        showFavoritePage,    
        favoritePagesAmount,
        handleChangeFavoritePage,
        setShowFavoritePage,
        handleChangePage,
        setSearchFilter,
    };
} 