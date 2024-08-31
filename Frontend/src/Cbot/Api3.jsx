import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, TextField, Grid, Button, CircularProgress } from '@mui/material';

const API_KEY = '579b464db66ec23bdd000001b9bf6c6fa19840677fe9fbacb9c42a31';
const API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

const Api = () => {
  const [stateName, setStateName] = useState('');
  const [commodity, setCommodity] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedDate(data[data.length - 1].arrival_date);
    }
  }, [data]);

  const fetchData = async () => {
    if (!commodity) {
      setError('Commodity is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: {
          'api-key': API_KEY,
          format: 'json',
          // 'filters[commodity]': commodity,
          limit: 100000, // Increased limit to get more data for filtering
        },
      });
      console.log(response.data)
      memorySizeOf(response.data)
      function memorySizeOf(obj) {
        var bytes = 0;
      
        function sizeOf(obj) {
          if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
              case "number":
                bytes += 8;
                break;
              case "string":
                bytes += obj.length * 2;
                break;
              case "boolean":
                bytes += 4;
                break;
              case "object":
                var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                if (objClass === "Object" || objClass === "Array") {
                  for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) continue;
                    sizeOf(obj[key]);
                  }
                } else bytes += obj.toString().length * 2;
                break;
            }
          }
          return bytes;
        }
      
        function formatByteSize(bytes) {
          console.log(bytes)
          if (bytes < 1024) return bytes + " bytes";
          else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
          else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
          else return (bytes / 1073741824).toFixed(3) + " GiB";
        }
      
        console.log(formatByteSize(sizeOf(obj)));
      }




      const formattedData = response.data.records.map(record => ({
        state: record.state,
        district: record.district,
        arrival_date: record.arrival_date,
        min_price: parseFloat(record.min_price) / 100, // Convert to per kg
        max_price: parseFloat(record.max_price) / 100,
        modal_price: parseFloat(record.modal_price) / 100,
      }));

      setData(formattedData);

      // Filter data based on stateName if provided
      const filtered = stateName
        ? formattedData.filter(record => record.state.toLowerCase() === stateName.toLowerCase())
        : formattedData;

      setFilteredData(filtered);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const selectedData = filteredData.find(item => item.arrival_date === selectedDate) || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4"
    >
      <Typography variant="h4" gutterBottom>
        Commodity Price Chart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="State Name"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Fetch Data'}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" className="mt-4">
          {error}
        </Typography>
      )}

      {filteredData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Grid container spacing={3} className="mt-4">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Price Trends for {commodity} in {stateName} (per kg)
                  </Typography>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={filteredData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="min_price" stroke="#8884d8" name="Minimum Price" />
                        <Line type="monotone" dataKey="max_price" stroke="#82ca9d" name="Maximum Price" />
                        <Line type="monotone" dataKey="modal_price" stroke="#ffc658" name="Modal Price" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Price Calculator
                    </Typography>
                    <TextField
                      type="number"
                      label="Quantity (kg)"
                      value={quantity}
                      onChange={handleQuantityChange}
                      fullWidth
                      margin="normal"
                    />
                    <Typography variant="body1" gutterBottom>
                      Minimum Price: ₹{(selectedData.min_price * quantity).toFixed(2)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Maximum Price: ₹{(selectedData.max_price * quantity).toFixed(2)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Modal Price: ₹{(selectedData.modal_price * quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Api;
