import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptocurrencies } from '../../features/Crypto/thunk';
import { useNavigate } from 'react-router-dom';
import './listStyle.css';
import { LABEL, TYPE } from '../../Constant/constant';
import NotFound from '../../pages/NotFound';
import CryptoCard from './CryptoCard';
import CustomButton from '../Button/CustomButton';
import Filter from './FilterAndSort/Filter';
import Sort from './FilterAndSort/Sort';
import { motion } from 'framer-motion';

const CryptoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cryptocurrencies, status, error } = useSelector((state) => state.crypto);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('desc');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  useEffect(() => {
    dispatch(fetchCryptocurrencies(page));
  }, [dispatch, page]);

  useEffect(() => {
    sortCryptocurrencies(sortBy, sortOrder);
  }, [sortBy, sortOrder]);

  const sortCryptocurrencies = (sortBy, sortOrder) => {
    const sortedData = [...cryptocurrencies].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
    dispatch({ type: 'crypto/setCryptocurrencies', payload: sortedData });
  };

  const handleSortChange = (e) => {
    const [key, order] = e.target.value.split('-');
    setSortBy(key);
    setSortOrder(order);
  };

  const handlePriceFilterChange = useCallback(
    (e) => {
      const newPriceRange = [...priceRange];
      newPriceRange[e.target.name === 'min' ? 0 : 1] = e.target.value;
      setPriceRange(newPriceRange);
    },
    [priceRange]
  );

  const loadMoreData = () => {
    setPage(page + 1);
    if (status === TYPE.LOADING) {
      return <p>{LABEL.LOAD_MORE}</p>
    }
  };

  //Navigation on clickOf card.
  const handleCardClick = useCallback(
    (id) => navigate(`/crypto/${id}`),
    [navigate]
  );

  const filterCryptocurrencies = () => {
    return cryptocurrencies.filter(
      (crypto) =>
        crypto.current_price >= priceRange[0] && crypto.current_price <= priceRange[1]
    );
  };

  const filteredCryptos = filterCryptocurrencies();

  if (status === TYPE.LOADING && page === 1) {
    return <p>{LABEL.LOADING}</p>;
  }

  if (status === TYPE.FAILED) {
    return <NotFound error={error} />;
  }

  return (
    <>
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ y: '-100vw' }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Cryptocurrency Dashboard</h1>
      </motion.div>

      <div className="crypto-list">
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        <div className="filter-controls">
          <Filter handlePriceFilterChange={handlePriceFilterChange} priceRange={priceRange} />
          <Sort handleSortChange={handleSortChange} />
        </div>
        </motion.div>

        <motion.div
          className="crypto-items"
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {filteredCryptos?.map((crypto) => (
            <CryptoCard crypto={crypto} handleCardClick={handleCardClick} key={crypto.id} />
          ))}
          <CustomButton label={LABEL.LOAD_MORE} onClick={loadMoreData} />
        </motion.div>
      </div>
    </>
  );
};

export default CryptoList;