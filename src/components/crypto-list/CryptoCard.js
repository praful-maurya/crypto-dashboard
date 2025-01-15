import React from "react";
import { LABEL } from "../../Constant/constant";
import styled from "styled-components";
import { COLORS } from "../../Constant/colors";

const CryptoCard = ({ crypto, handleCardClick, key }) => {
    return (
        <Main key={key} className="crypto-item" onClick={() => handleCardClick(crypto.id)}>
            <h3>{crypto.name}</h3>
            <p><span>{LABEL.PRICE}:</span> ${crypto.current_price}</p>
            <p><span>{LABEL.CHANGE}:</span> {crypto.price_change_percentage_24h}%</p>
            <p><span>{LABEL.MARKET_CAP}:</span> ${crypto.market_cap}</p>
        </Main>
    )
};

export default CryptoCard;

const Main = styled.div`
  display: inline-block;
  text-align: center;
  span{
    font-weight: 600;
    color:${COLORS.dark};
  }
`
