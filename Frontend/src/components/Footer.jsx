import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  LocalFlorist,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const FooterRoot = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: theme.palette.common.white,
  padding: theme.spacing(6, 0),
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    color: theme.palette.success.light,
    cursor: 'pointer',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.success.light,
  },
}));

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.success.main,
  },
}));

export default function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <FooterRoot>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About */}
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <LocalFlorist fontSize="large" />
              <Typography variant="h5" ml={1} fontWeight="bold">
                Farmissan
              </Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              Cultivating a greener future through sustainable farming practices and innovative agricultural solutions.
            </Typography>
            <Box>
              <SocialButton size="small" aria-label="facebook">
                <Facebook />
              </SocialButton>
              <SocialButton size="small" aria-label="twitter">
                <Twitter />
              </SocialButton>
              <SocialButton size="small" aria-label="instagram">
                <Instagram />
              </SocialButton>
              <SocialButton size="small" aria-label="linkedin">
                <LinkedIn />
              </SocialButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <List dense>
                  <ListItem disablePadding>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Home</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Product</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Login</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Signup</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/upload" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Upload</FooterLink>
                    </Link>
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={4}>
                <List dense>
                  <ListItem disablePadding>
                    <Link to="/management" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Management</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/desc" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Description</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/plans" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Plans</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/chatbot" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Chatbot</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/api" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">API</FooterLink>
                    </Link>
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={4}>
                <List dense>
                  <ListItem disablePadding>
                    <Link to="/farmerdb" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Farmer Dashboard</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/retailerdb" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Retailer Dashboard</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/consumerdb" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Consumer Dashboard</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/trans" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Translate</FooterLink>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link to="/cha" style={{ textDecoration: 'none' }}>
                      <FooterLink variant="body2">Chala Hai</FooterLink>
                    </Link>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <List>
              <ListItem>
                <LocationOn sx={{ marginRight: 1 }} />
                <ListItemText primary="123 Farm Street, Green City, CA 98765" />
              </ListItem>
              <ListItem>
                <Phone sx={{ marginRight: 1 }} />
                <ListItemText primary="+1 234 567 890" />
              </ListItem>
              <ListItem>
                <Email sx={{ marginRight: 1 }} />
                <ListItemText primary="info@farmissan.com" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box textAlign="center">
          <Typography variant="body2" color="inherit">
            © {getCurrentYear()} Farmissan. All rights reserved.
          </Typography>
          <Box mt={2}>
            <GreenButton variant="contained">Subscribe</GreenButton>
          </Box>
        </Box>
      </Container>
    </FooterRoot>
  );
}
