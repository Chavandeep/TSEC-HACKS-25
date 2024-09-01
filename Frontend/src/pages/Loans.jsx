import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
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

  const loans = [
    {
      bank: 'SBI',
      name: 'Kisan Credit Card (KCC)',
      objective: 'To provide timely and adequate credit to farmers to meet their production credit needs.',
      features: {
        typeOfFacility: 'Revolving cash credit account',
        quantumOfLoan: 'Need Based finance considering cropping pattern, acreage, and Scale of Finance (SOF).',
        interestRate: '7% per annum with a 2% interest subvention for loans up to ₹3 lakh.',
        repayment: 'Repayment period as per the crop period and marketing period.',
        insurance: 'Eligible crops covered under PRADHAN MANTRI FASAL BIMA YOJNA (PMFBY).',
        additionalInfo: 'Rupay debit cards for all eligible KCC borrowers.',
        link: 'https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan',
      },
    },
    {
      bank: 'SBI',
      name: 'Kisan Samriddhi Rin',
      objective: 'To provide adequate and timely cash credit facility to farmers using scientific and progressive methods of farming.',
      features: {
        typeOfFacility: 'Agriculture cash credit',
        quantumOfLoan: '₹5 lakhs to ₹50 crores.',
        interestRate: '3% interest subvention as Prompt Repayment Incentive (PRI) up to Rs. 3.00 lakhs.',
        repayment: 'Repayment period fixed as per the anticipated harvesting and marketing period for crops.',
        insurance: 'Borrower should opt for Personal Accident Insurance, Health Insurance (wherever applicable).',
        additionalInfo: 'Collateral Security by way of mortgage of immovable property or Liquid securities.',
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
        insurance: 'No hidden charges, quick processing, non-mortgage loans also available.',
        additionalInfo: 'Applicant must own agricultural land and be engaged in agricultural activities.',
        link: 'https://www.icicibank.com/rural/loans/farmer-finance',
      },
    },
    // Add more loan schemes here
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
    </Box>
  );
};

export default LoanInfo;
