import React from "react";
import { LABEL } from "../../../Constant/constant";

const Filter = ({handlePriceFilterChange, priceRange}) => {
    return (
        <>
        <div className="filter-controls">
            <h4>Filters:</h4>
            <label>
                <h5>{LABEL.MIN_PRICE}:</h5>
                <input
                    type="number"
                    name="min"
                    value={priceRange[0]}
                    onChange={handlePriceFilterChange}
                />
            </label>
            <label>
                <h5>{LABEL.MAX_PRICE}:</h5>
                <input
                    type="number"
                    name="max"
                    value={priceRange[1]}
                    onChange={handlePriceFilterChange}
                />
            </label>
        </div>
        </>
    )
};

export default Filter;