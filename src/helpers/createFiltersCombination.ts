export function createFiltersCombination(selectedFilters: string[], filter: string) {
    if (selectedFilters.includes("All") && filter === "All") return "SAME";

    if (selectedFilters.includes(filter) && selectedFilters.length == 1) return "SAME";

    if (selectedFilters.includes(filter) && selectedFilters.length > 1) 
        return selectedFilters.filter(fil => fil != filter);

    return [...selectedFilters, filter]
}