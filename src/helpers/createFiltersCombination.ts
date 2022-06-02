export function createFiltersCombination(selectedFilters: string[], filter: string) {
    if (filter == "All") {
        if (selectedFilters.includes(filter)) return "SAME";

        return [filter];
    }
            
    if (selectedFilters.includes("All"))
        return [filter];
    
    if (selectedFilters.includes(filter) && selectedFilters.length > 1)
        return selectedFilters.filter(selectedFilter => selectedFilter != filter);
    
    if (selectedFilters.includes(filter) && selectedFilters.length == 1) return "SAME"
        
    return [...selectedFilters, filter];
}