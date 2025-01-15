import React from "react";
import { LABEL } from "../../Constant/constant";

const DetailCard = ({cryptoDetails, prices, id, simplePrice}) => {
    return (
        <>
        <h2>{cryptoDetails?.name}</h2>
                <p><span>{LABEL.CHANGE}:</span>  ${prices?.[id] || cryptoDetails?.market_data?.current_price?.usd}</p>
                <p><span>{LABEL.MARKET_CAP}:</span>  ${cryptoDetails?.market_data?.market_cap?.usd}</p>
                <p><span>{LABEL.CHANGE}:</span>  {cryptoDetails?.market_data?.price_change_percentage_24h}%</p>
                <h3>{LABEL.CURRENT_PRICE}: ${simplePrice[id]?.usd || 'Loading...'}</h3>
        </>
    )
};

export default DetailCard;