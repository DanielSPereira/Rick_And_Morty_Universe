import React from "react";
import { useAppStore } from "@/hooks/useAppStore";
import { selectCharacters } from "@/features/characters/charactersSlice";

import List from "./List";

function ExploreList({ handleOpenModal }: { handleOpenModal: () => void}) {
    const { characters, isLoading } = useAppStore(selectCharacters);

    return <List noDataText="Could not find characters!" data={characters} isLoading={isLoading} handleOpenModal={handleOpenModal} />;
};

export default ExploreList;