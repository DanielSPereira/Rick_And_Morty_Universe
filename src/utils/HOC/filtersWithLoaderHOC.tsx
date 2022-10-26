import React from "react";
import { FiltersListType } from "@/components/Toolbar/Filters/FiltersList";
import FilterSkeletonLoad, { FilterSkeletonLoadType } from "@/components/Toolbar/Filters/Skeleton";

type ReturnParameters = { 
    species: string[]; 
    isLoading: boolean ;
    selectedSpecies: string[]; 
    selectSpecie: (specie: string) => void;
}

type HOCReturn = ({ species, isLoading, selectedSpecies }: ReturnParameters) => JSX.Element

export const filtersWithLoaderHOC = (Component: FiltersListType): HOCReturn => {
    const ReturnComponent: HOCReturn = ({ species, isLoading, selectedSpecies, selectSpecie }) => {

        if (isLoading) {
            return <FilterSkeletonLoad />;
        } 
    
        return <Component selectSpecie={selectSpecie} filters={species} selectedSpecies={selectedSpecies} />;
    }

    return ReturnComponent;
}
