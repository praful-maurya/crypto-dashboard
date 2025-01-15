import React from "react";

const DataTable = ({tickers}) => {
    return (
        <>
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
                    <p>Network Error: (Tickers not available)</p>
                )}
            </div>
        </>
    )
};

export default DataTable;