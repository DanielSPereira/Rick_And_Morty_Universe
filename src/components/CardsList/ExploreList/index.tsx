import React from "react";
import { selectCharacters } from "@/features/characters/charactersSlice";
import { useAppStore } from "@/hooks/useAppStore";

import List from "./List";

function ExploreList({ handleOpenModal }: { handleOpenModal: () => void}) {
    const { characters, isLoading } = useAppStore(selectCharacters);

    return <List characters={characters} isLoading={isLoading} handleOpenModal={handleOpenModal} />;
};

export default ExploreList;