import { Character } from "@/types/character";

type ApplyFiltersProps = {
    searchFilter?: string;
    filters: Array<string>;
    dataSource: Array<Character>;
}

export const applyFilters = ({
    searchFilter,
    filters,
    dataSource,
}: ApplyFiltersProps) => {
    let filteredDataSource = dataSource.filter(data => {
        if (filters.includes("All")) return data;

        return filters.includes(data.species);
    });

    switch (searchFilter != undefined) {
        case false: return filteredDataSource;
        
        case true: {
            if (!searchFilter) return filteredDataSource;

            return filteredDataSource.filter(data => {
                return data.name.toLowerCase().includes(searchFilter.toLowerCase());
            });
        }

    }
};
