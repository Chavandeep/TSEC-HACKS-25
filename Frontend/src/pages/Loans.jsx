import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const LoanInfo = () => {
  const [selectedBank, setSelectedBank] = useState('All');

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  // Loan schemes data
  const loans = [
    {
      bank: 'SBI',
      name: 'Kisan Credit Card (KCC)',
      objective: 'Provide timely credit to farmers to meet their production credit needs.',
      features: {
        typeOfFacility: 'Revolving cash credit account',
        quantumOfLoan: 'Need based finance considering cropping pattern, acreage, etc.',
        interestRate: '7% per annum with a 2% interest subvention for loans up to ₹3 lakh.',
        repayment: 'Repayment period as per the crop period and marketing period.',
        insurance: 'Eligible crops covered under PMFBY.',
        additionalInfo: 'Rupay debit cards for all eligible KCC borrowers.',
        link: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan',
      },
    },
    {
      bank: 'SBI',
      name: 'Kisan Samriddhi Rin',
      objective: 'Provide adequate and timely cash credit facility to farmers using scientific farming methods.',
      features: {
        typeOfFacility: 'Agriculture cash credit',
        quantumOfLoan: '₹5 lakhs to ₹50 crores.',
        interestRate: '3% interest subvention for loans up to ₹3 lakh.',
        repayment: 'Repayment period fixed as per the anticipated harvesting period.',
        insurance: 'Optional: Personal Accident Insurance, Health Insurance.',
        additionalInfo: 'Collateral Security may be required.',
        link: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan',
      },
    },
    {
      bank: 'ICICI Bank',
      name: 'Kisan Credit Card (KCC)',
      objective: 'Credit facility to meet day-to-day farming requirements.',
      features: {
        typeOfFacility: 'Kisan Credit Card',
        quantumOfLoan: 'Based on cropping pattern and cost of production.',
        interestRate: '10.10% to 15.50% depending on credit assessment.',
        repayment: 'Flexible loan repayment options based on income.',
        insurance: 'No hidden charges, quick processing, non-mortgage loans available.',
        additionalInfo: 'Applicant must own agricultural land and be engaged in farming.',
        link: 'https://www.icicibank.com/rural/loans/farmer-finance',
      },
    },
  ];

  // Government schemes data
  const govtSchemes = [
    {
      name: 'Pradhan Mantri Fasal Bima Yojna',
      description: 'Crop insurance scheme providing financial support to farmers in case of crop failure.',
      link: 'https://pmfby.gov.in/',
    },
    {
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      description: 'Income support of ₹6,000 annually to all farmers.',
      link: 'https://pmkisan.gov.in/',
    },
    {
      name: 'Soil Health Card Scheme',
      description: 'Helps farmers understand their soil health and optimize nutrient use.',
      link: 'https://soilhealth.dac.gov.in/',
    },
  ];

  // Learning videos data with iframes
  const learningVideos = [
    {
      title: 'How to Apply for Kisan Credit Card',
      iframeSrc: 'https://www.youtube.com/embed/0ovnhc2ej6s?si=1Yrcozp5sSsSm0AI',
    },
    {
      title: 'Pradhan Mantri Fasal Bima Yojna Explained',
      iframeSrc: 'https://www.youtube.com/embed/47ROs0iltn0?si=aK9G3jvuOa-AQWfW',
    },
    {
      title: 'Best Farming Techniques for Maximizing Yield',
      iframeSrc: 'https://www.youtube.com/embed/lWj05R9NYMw?si=Hehg5hSm8dW1x8YI',
    },
    {
      title: 'How to Get a Kisan Credit Card in India',
      iframeSrc: 'https://www.youtube.com/embed/2qiNKen-rm0?si=vZoQox_ASZOXsX7J',
    },
  ];

  const filteredLoans = selectedBank === 'All' ? loans : loans.filter((loan) => loan.bank === selectedBank);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Farmer Loan Schemes</Typography>

      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel>Select Bank</InputLabel>
        <Select value={selectedBank} onChange={handleBankChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="SBI">SBI</MenuItem>
          <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
          {/* Add more banks here */}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredLoans.map((loan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{loan.name}</Typography>
                <Typography variant="subtitle1"><strong>Bank:</strong> {loan.bank}</Typography>
                <Typography variant="body2" gutterBottom>{loan.objective}</Typography>
                <Typography variant="body2"><strong>Type of Facility:</strong> {loan.features.typeOfFacility}</Typography>
                <Typography variant="body2"><strong>Quantum of Loan:</strong> {loan.features.quantumOfLoan}</Typography>
                <Typography variant="body2"><strong>Interest Rate:</strong> {loan.features.interestRate}</Typography>
                <Typography variant="body2"><strong>Repayment:</strong> {loan.features.repayment}</Typography>
                <Typography variant="body2"><strong>Insurance:</strong> {loan.features.insurance}</Typography>
                <Typography variant="body2"><strong>Additional Info:</strong> {loan.features.additionalInfo}</Typography>
                <Button variant="contained" color="primary" href={loan.features.link} target="_blank" sx={{ marginTop: '10px' }}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>Government Schemes for Farmers</Typography>
      <Grid container spacing={3}>
        {govtSchemes.map((scheme, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{scheme.name}</Typography>
                <Typography variant="body2" gutterBottom>{scheme.description}</Typography>
                <Button variant="contained" color="primary" href={scheme.link} target="_blank" sx={{ marginTop: '10px' }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>Learning Videos for Farmers</Typography>
      <Grid container spacing={3}>
        {learningVideos.map((video, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{video.title}</Typography>
                <Box component="iframe" 
                  src={video.iframeSrc}
                  width="100%"
                  height="315px"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sx={{ marginTop: '10px' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoanInfo;
