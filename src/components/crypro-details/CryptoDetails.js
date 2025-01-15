import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoDetails, fetchCryptoHistory, fetchSimplePrice, fetchTickers } from '../../features/Crypto/thunk';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './CryptoDetail.css';
import { LABEL, TYPE } from '../../Constant/constant';
import NotFound from '../../pages/NotFound';
import styled from 'styled-components';
import useWebsocket from '../../Services/useWebsocket';
import DataTable from './DataTable';
import { motion } from 'framer-motion';
import DetailCard from './DetailCard';
import LineChart from '../Charts/LineChart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the crypto id from the URL
  const { cryptoDetails, cryptoHistory, status, error, tickers, simplePrice } = useSelector((state) => state.crypto);
  // console.log(tickers?.tickers?.map((item) => item.base), 'Tikcers');
  const { prices, error: errorWebSocket, isConnected } = useWebsocket([id]);

  useEffect(() => {
    if (id)
    dispatch(fetchCryptoDetails(id));
    dispatch(fetchCryptoHistory(id));
    dispatch(fetchTickers(id));
    dispatch(fetchSimplePrice(id));
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

  if (status === TYPE.LOADING) {
    return <p>{LABEL.LOADING}</p>;
  }

  if (status === TYPE.FAILED) {
    return <NotFound error={error} />;
  }

  return (
    <Main className="crypto-detail">
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ y: '-80vw' }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 1 }} 
      >
        <h1>Crypto Details</h1>
      </motion.div>

      <motion.div
        className="container"
        initial={{ x: '-80vw' }} 
        animate={{ x: 0 }} 
        transition={{ duration: 1 }}
      >
        <DetailCard cryptoDetails={cryptoDetails}
          simplePrice={simplePrice}
          prices={prices}
          id={id}
        />
      </motion.div>

      <LineChart data={chartData} />
      <DataTable tickers={tickers} />

      {errorWebSocket && <p style={{ color: 'red' }}>{LABEL.ERROR}: {errorWebSocket}</p>}
      {!isConnected && <p>{LABEL.CONNECTING}</p>}
      {isConnected && <p>{LABEL.CONNECTED}</p>}
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


