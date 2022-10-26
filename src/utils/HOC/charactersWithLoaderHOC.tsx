import React from "react";
import { ListType } from "@/components/CardsList/ExploreList/List";
import { CardSkeletonLoad } from "@/components/CharacterCard/Skeleton";
import styled from "styled-components";
import { Character } from "@/types/character";

type ReturnParameters = { 
    characters: Character[]; 
    isLoading: boolean ;
    handleOpenModal: () => void; 
}

type HOCReturn = ({ characters, isLoading, handleOpenModal }: ReturnParameters) => JSX.Element

const NotFindText = styled.h1`
    color: var(--text-body);
    font-size: 1.5rem;
    text-align: center;
`;


export const charactersWithLoaderHOC = (Component: ListType): HOCReturn => {
    const ReturnComponent: HOCReturn = ({ characters, isLoading, handleOpenModal }) => {
        if (isLoading) {
            return <CardSkeletonLoad />;
        }
        
        if (characters.length === 0) {
            return <NotFindText>Could not find characters!</NotFindText>
        }
    
        return <Component characters={characters} handleOpenModal={handleOpenModal} />;
    } 

    return ReturnComponent;
}