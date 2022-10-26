import React from "react";
import { filtersWithLoaderHOC } from "@/utils/HOC/filtersWithLoaderHOC";
import { List, CustomButton } from "./styles"

export type FiltersListProps = { 
    filters: Array<string>; 
    selectedSpecies: Array<string>;
    selectSpecie: (specie: string) => void;
}

const FiltersList = ({ 
    filters, 
    selectedSpecies,
    selectSpecie,
}: FiltersListProps ) => {    

    return (
        <List>
            {filters?.map(filter => (
                <CustomButton
                    key={filter}
                    data-testid={filter + '-filter'}
                    onClick={() => selectSpecie(filter)}
                    type="button"
                    selected={selectedSpecies.includes(filter)}
                >{filter}</CustomButton>
            ))}
        </List>
    )
}

export type FiltersListType = typeof FiltersList;
export default filtersWithLoaderHOC(FiltersList);
