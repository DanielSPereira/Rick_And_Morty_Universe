import { useCharacters } from "../../hooks/useCharacters";
import { FilterSkeletonLoad } from "./FilterSkeletonLoad";

import "./styles.css"

export function Filters() {
    const { filters, selectedFilters, selectFilter } = useCharacters();

    return (
        <div className="categories-wrapper">
            <h1>Categories:</h1>
            {
                !filters.length ? (
                    <div className="flex">
                        <FilterSkeletonLoad />
                    </div>
                ) : (
                    <div className="pt-1">
                        {
                            filters.map((filter) =>
                                <button
                                    data-testid={filter + '-filter'}
                                    onClick={() => selectFilter(filter)}
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