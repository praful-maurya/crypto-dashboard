import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoDetails, fetchCryptoHistory, fetchTickers } from '../../features/Crypto/thunk';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './CryptoDetail.css';
import { LABEL, TYPE } from '../../Constant/constant';
import NotFound from '../../pages/NotFound';
import styled from 'styled-components';
import useWebsocket from '../../Services/useWebsocket';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the crypto id from the URL
  const { cryptoDetails, cryptoHistory, status, error, tickers } = useSelector((state) => state.crypto);
  // console.log(tickers?.tickers?.map((item) => item.base), 'Tikcers');
  const { prices, error: errorWebSocket, isConnected } = useWebsocket([id]);

  useEffect(() => {
    if (id)
    dispatch(fetchCryptoDetails(id));
    dispatch(fetchCryptoHistory(id));
    dispatch(fetchTickers(id));
  }, [dispatch, id]);

  const chartData = {
    labels: cryptoHistory?.prices?.map((item) => new Date(item[0]).toLocaleDateString()) || [],
    datasets: [
      {
        label: `${cryptoDetails?.name} ${LABEL.PRICE_HISTORY}`,
        data: cryptoHistory?.prices?.map((item) => item[1]) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  // console.log('chartData', chartData)

  if (status === TYPE.LOADING) {
    return <p>{LABEL.LOADING}</p>;
  }

  if (status === TYPE.FAILED) {
    return <NotFound error={error} />;
  }

  return (
    <Main className="crypto-detail">
      <div style={{ textAlign: 'center' }}>
        <h1>Crypto Details</h1>
      </div>
      <div className='container'>
        <h2>{cryptoDetails?.name}</h2>
        <p><span>{LABEL.CHANGE}:</span>  ${prices?.[id] || cryptoDetails?.market_data?.current_price?.usd}</p>
        <p><span>{LABEL.MARKET_CAP}:</span>  ${cryptoDetails?.market_data?.market_cap?.usd}</p>
        <p><span>{LABEL.CHANGE}:</span>  {cryptoDetails?.market_data?.price_change_percentage_24h}%</p>
      </div>

      <h2>{LABEL.PRICE_HISTORY}</h2>
      <div className="chart-container">
        <Line data={chartData} />
      </div>

      <h2>Price Comparison</h2>
      <div className="tickers-container">
        {tickers?.tickers?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Market</th>
                <th>Last Price</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              {tickers?.tickers?.map((ticker) => (
                <tr key={ticker.market.name}>
                  <td>{ticker.market.name}</td>
                  <td>${ticker.last}</td>
                  <td>{ticker.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tickers available</p>
        )}
      </div>

      {errorWebSocket && <p style={{ color: 'red' }}>Error: {errorWebSocket}</p>}
      {!isConnected && <p>Connecting to WebSocket...</p>}
      {isConnected && <p>Connected to WebSocket</p>}
    </Main>
  );
};

export default CryptoDetail;

const Main = styled.div`
  .container{
    border: 2px solid #f05486;
    background: linear-gradient(90deg, rgb(201, 167, 211) 0%, rgb(184, 184, 197) 35%, rgba(161, 92, 146, 0.67) 100%);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;

    h2{
      color:rgb(240, 84, 133);
      font-size: 28px;
    }
     p{
       span{
        font-weight: 600;
      }
    }
   }   
  
   .tickers-container {
    margin-top: 20px;
    table {
      width: 100%;
      border-collapse: collapse;
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f4f4f4;
      }
    }
  }
`;


