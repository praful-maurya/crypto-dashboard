import React from "react";
import { LABEL } from "../../Constant/constant";
import { Line } from "react-chartjs-2";

const LineChart = ({data}) => {
    return (
        <>
            <h2>{LABEL.PRICE_HISTORY}</h2>
            <div className="chart-container">
                <Line data={data} />
            </div>
        </>
    )
};

export default LineChart;