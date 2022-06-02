import { useContextSelector } from "use-context-selector";
import { CharactersContext } from "../context/CharactersContext";

export function useNavigation() {
    const exploreCurrentPage = useContextSelector(CharactersContext, ctx => ctx.exploreCurrentPage);
    const explorePagesAmount = useContextSelector(CharactersContext, ctx => ctx.explorePagesAmount);

    const favoritesCurrentPage = useContextSelector(CharactersContext, ctx => ctx.favoritesCurrentPage);
    const favoritePagesAmount = useContextSelector(CharactersContext, ctx => ctx.favoritesPagesAmount);
    const showFavoritesPage = useContextSelector(CharactersContext, ctx => ctx.showFavoritesPage);
    
    
    const handleChangeExplorePage = useContextSelector(CharactersContext, ctx => ctx.handleChangeExplorePage);
    const handleChangeFavoritesPage = useContextSelector(CharactersContext, ctx => ctx.handleChangeFavoritesPage);
    const handleChangeShowFavoritesPage = useContextSelector(CharactersContext, ctx => ctx.handleChangeShowFavoritesPage);
    
    return {
        favoritesCurrentPage,
        favoritePagesAmount,
        showFavoritesPage,
        exploreCurrentPage,
        explorePagesAmount,
        handleChangeShowFavoritesPage,    
        handleChangeFavoritesPage,
        handleChangeExplorePage,
    };
} 