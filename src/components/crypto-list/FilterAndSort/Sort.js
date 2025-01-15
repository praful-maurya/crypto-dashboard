import React from "react";
import { LABEL } from "../../../Constant/constant";

const Sort = ({ handleSortChange }) => {
  return (
    <div className="sort-controls">
      <h4>Sort:</h4>
      <select onChange={handleSortChange}>
        <option value="price-desc">{LABEL.PRICE} (High to Low)</option>
        <option value="price-asc">{LABEL.PRICE} (Low to High)</option>
        <option value="market_cap-desc">{LABEL.MARKET_CAP} (High to Low)</option>
        <option value="market_cap-asc">{LABEL.MARKET_CAP} (Low to High)</option>
        <option value="price_change_percentage_24h-desc">{LABEL.CHANGE} (High to Low)</option>
        <option value="price_change_percentage_24h-asc">{LABEL.CHANGE} (Low to High)</option>
      </select>
    </div>
  )
};

export default Sort;