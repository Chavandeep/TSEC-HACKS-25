import React, { useState } from 'react';
import axios from 'axios';

function ChalaHai() {
  const [cityName, setCityName] = useState('');
  const [vegIds, setVegIds] = useState('');
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
            start: '2023-01-04',
            end: '2024-08-22',
            vegIds: vegIds,
          },
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': 'http://localhost:3000',
          },
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
      setError('Failed to fetch data');
    }
  };

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
          {data.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{item.vegName}</h3>
              <table className="min-w-full border border-gray-300 mt-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Retail Price</th>
                    <th className="border p-2">Shopping Mall Price</th>
                  </tr>
                </thead>
                <tbody>
                  {item.historicPrices.map((priceData, i) => (
                    <tr key={i}>
                      <td className="border p-2">{priceData.date}</td>
                      <td className="border p-2">{priceData.retailPrice}</td>
                      <td className="border p-2">{priceData.shoppingMallPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChalaHai;
