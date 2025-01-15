import React from "react";
import { LABEL } from "../../Constant/constant";

const CryptoCard = ({ crypto, handleCardClick }) => {
    return (
        <div className="crypto-item" onClick={() => handleCardClick(crypto.id)}>
            <h3>{crypto.name}</h3>
            <p>{LABEL.PRICE}: ${crypto.current_price}</p>
            <p>{LABEL.CHANGE}: {crypto.price_change_percentage_24h}%</p>
            <p>{LABEL.MARKET_CAP}: ${crypto.market_cap}</p>
        </div>
    )
};

export default CryptoCard;
