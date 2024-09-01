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
  ListItemIcon,
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
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Home</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">About</FooterLink>
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
              <ListItem disablePadding>
                <Link to="/fill" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Fill</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/list" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">User List</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/profile/:id" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">User Profile</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/negotiate/:farmerId" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Negotiate</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/product/:id" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Product Details</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Cart</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Checkout</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/order-confirmation" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Order Confirmation</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/posting" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Posting</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/inventory" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Inventory</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/con" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Farmer Connect</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/nego" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Negotiation</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/noti" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Notifications</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/myprofile" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">My Profile</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/loans" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Loans</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/farmvisit" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Farm Visit</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/negochat" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Nego Chat</FooterLink>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/vieww" style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">Vieww</FooterLink>
                </Link>
              </ListItem>
            </List>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary="123 Farm Street, Green City, CA 98765" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary="+1 234 567 890" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
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
