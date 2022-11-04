import React from "react";
import FilterSkeletonLoad from "../Skeleton";
import { List, CustomButton } from "./styles";
import { withLoader } from "@/utils/HOC/withLoader";

//-------------------------------------------------------

export interface IFiltersListProps extends Partial<JSX.Element> { 
    data: Array<string>; 
    selectedSpecies: Array<string>;
    selectSpecie: (specie: string) => void;
};

//-------------------------------------------------------

const FiltersList = ({ data, selectedSpecies, selectSpecie }: IFiltersListProps ) => {    
    return (
        <List>
            {data?.map(filter => (
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
};

export default withLoader<string, IFiltersListProps>(FiltersList, FilterSkeletonLoad);
