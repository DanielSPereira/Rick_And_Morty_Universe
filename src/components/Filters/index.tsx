import { useCharacters } from "../../hooks/useCharacters";
import { FilterSkeletonLoad } from "./FilterSkeletonLoad";
import "./styles.css"

export function Filters() {
    const { filters, selectedFilters, selectFilter } = useCharacters();

    return (
        <div className="categories-wrapper flex flex-col justify-center items-center sm:items-start">
            <h1>Categories:</h1>
            { 
                !filters.length ? (
                    <div className="flex">
                        <FilterSkeletonLoad />
                    </div>
                ) : (
                    <div className="pt-1">
                        <button 
                            onClick={() => selectFilter("All")} 
                            key="All" 
                            type="button" 
                            className={
                                selectedFilters.includes("All") ? 
                                    "filter box-shadow selected-filter" : 
                                    "filter box-shadow"
                            }
                        >All</button>
                        {
                            filters.map((filter) => 
                                <button 
                                    onClick={() => selectFilter(filter)} 
                                    key={filter} 
                                    type="button" 
                                    className={
                                        selectedFilters.includes(filter) ? 
                                            "filter box-shadow selected-filter" : 
                                            "filter box-shadow"
                                    }
                                >{ filter }</button>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}