import { useSearch } from "../../hooks/useSearch";
import { FilterSkeletonLoad } from "./FilterSkeletonLoad";

import "./styles.css"

export function Filters() {
    const { filters, selectedFilters, handleSelectFilter, loading } = useSearch();

    return (
        <div className="categories-wrapper">
            <h1>Filters:</h1>
            {
                loading ? (
                    <div className="grid grid-cols-3 gap-4">
                        <FilterSkeletonLoad />
                    </div>
                ) : (
                    <div className="pt-1">
                        {
                            filters.map((filter) =>
                                <button
                                    data-testid={filter + '-filter'}
                                    onClick={() => handleSelectFilter(filter)}
                                    key={filter}
                                    type="button"
                                    className={
                                        selectedFilters.includes(filter) ? "filter box-shadow selected-filter" : "filter box-shadow"
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