export function createFiltersCombination(selectedSpecies: string[], filter: string) {
    if (filter == "All") return [filter];
            
    if (selectedSpecies.includes("All")) return [filter];
    
    if (selectedSpecies.includes(filter) && selectedSpecies.length > 1)
        return selectedSpecies.filter(selectedFilter => selectedFilter != filter);
    
    if (selectedSpecies.includes(filter) && selectedSpecies.length == 1) return "SAME"
        
    return [...selectedSpecies, filter];
}