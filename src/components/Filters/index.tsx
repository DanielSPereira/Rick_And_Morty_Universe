import "./styles.css"

export function Filters() {
    const selected = "All";
    const categories = ["All", "Human", "Alien"];

    return (
        <div className="categories-wrapper flex flex-col justify-center">
            <h1>Categories:</h1>
            <div>
                {
                    categories.map((category) => selected != category ? 
                        (
                            <button key={category} type="button" className="filter box-shadow">{category}</button>
                        ) : (
                            <button key={category} type="button" className="filter box-shadow selected-filter">{category}</button>
                        )
                    )
                }
            </div>
        </div>
    )
}