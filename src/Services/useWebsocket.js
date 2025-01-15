import { useEffect, useState } from 'react';

const useWebSocket = (cryptoIds) => {
  const [price, setPrices] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${cryptoIds.join(',')}`);
    
    socket.onopen = () => {
    //   console.log('WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
        console.log('event', event);
        
      try {
        const data = JSON.parse(event.data);
        console.log('data', data);
        
        setPrices((prevPrices) => ({
          ...prevPrices,
          ...data,
        }));
      } catch (e) {
        setError('Error parsing WebSocket message');
      }
    };

    socket.onerror = (e) => {
      setError(`WebSocket error: ${e.message}`);
    };

    socket.onclose = () => {
      setIsConnected(false);
      // Optionally, you could implement a reconnect strategy here
      setTimeout(() => {
        // Reconnect after 3 seconds
        setIsConnected(true);
      }, 3000);
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, [cryptoIds]);

  return { price, isConnected, error };
};

export default useWebSocket;
