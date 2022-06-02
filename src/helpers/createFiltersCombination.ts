export function createFiltersCombination(selectedFilters: string[], filter: string) {
    if (selectedFilters.includes("All") && filter == "All") return "SAME";

    if (!selectedFilters.includes("All") && filter == "All") return [filter];

    if (selectedFilters.includes("All") && filter != "All") return [filter];
    
    if (!selectedFilters.includes("All") && !selectedFilters.includes(filter) && filter != "All") return [...selectedFilters, filter];
    
    if (!selectedFilters.includes("All") && selectedFilters.includes(filter) && selectedFilters.length == 1) return "SAME";
    
    if (!selectedFilters.includes("All") && selectedFilters.includes(filter) && selectedFilters.length > 1) 
        return selectedFilters.filter(sf => sf != filter);

    return [...selectedFilters, filter]
}