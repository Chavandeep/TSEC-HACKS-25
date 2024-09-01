import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

function Api() {
  const [cityName, setCityName] = useState('');
  const [vegIds, setVegIds] = useState('');
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2024-08-22');
  const [filter, setFilter] = useState('daily');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    if (!cityName || !vegIds) {
      setError('City Name and Vegetable IDs are required');
      return;
    }

    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://vegetablemarketprice.com/api/dataapi/market/${cityName}/chartdatavalues`,
        {
          params: {
            start: startDate,
            end: endDate,
            vegIds: vegIds,
          },
          headers: {
            "Origin": 'localhost:5173', 
            "x-requested-with": "XMLHttpRequest"
          }
        }
      );

      const { columnMapping, data: apiData, columns } = response.data;

      const vegIdArray = vegIds.split(',').map(id => id.trim());

      const tableData = columnMapping
        .filter(({ vegId }) => vegIdArray.includes(vegId))
        .map(({ vegName, vegId }) => {
          const vegetableData = apiData.find(series => series.name === vegName);

          if (!vegetableData || !vegetableData.data) {
            console.warn(`No data found for vegetable: ${vegName}`);
            return {
              vegName,
              historicPrices: columns.map(date => ({
                date,
                retailPrice: 'N/A',
                shoppingMallPrice: 'N/A'
              }))
            };
          }

          const historicPrices = columns.map((date, index) => {
            const entry = vegetableData.data[index] || {};
            return {
              date,
              retailPrice: entry.retailprice || 'N/A',
              shoppingMallPrice: entry.shopingmallprice || 'N/A'
            };
          });

          return {
            vegName,
            historicPrices
          };
        });

      setData(tableData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(`Failed to fetch data: ${err.message}`);
    }
  };

  // Format data for Chart.js
  const formatDataForChart = (data) => {
    if (!data) return [];

    return data.map(item => {
      const labels = item.historicPrices.map(price => price.date);
      const retailPrices = item.historicPrices.map(price => parseFloat(price.retailPrice.replace('N/A', '0')));
      const shoppingMallPrices = item.historicPrices.map(price => parseFloat(price.shoppingMallPrice.replace('N/A', '0')));

      return {
        vegName: item.vegName,
        chartData: {
          labels: labels,
          datasets: [
            {
              label: 'Retail Price',
              data: retailPrices,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
            },
            {
              label: 'Shopping Mall Price',
              data: shoppingMallPrices,
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderWidth: 1,
            }
          ],
        }
      };
    });
  };

  const chartData = formatDataForChart(data);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Fetch Vegetable Market Data</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFetchData();
        }}
        className="space-y-4"
      >
        <label className="block">
          City Name:
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="e.g., mumbai"
            required
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label className="block">
          Vegetable IDs (comma-separated):
          <input
            type="text"
            value={vegIds}
            onChange={(e) => setVegIds(e.target.value)}
            placeholder="e.g., beetroot,greenchili,onionbig,onionsmall,tomato"
            required
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label className="block">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label className="block">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </label>
        <label className="block">
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="past_month">Past Month</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Vegetable Historic Prices:</h2>
          {chartData.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{item.vegName}</h3>
              <div className="h-64">
                <Line data={item.chartData} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Api;
