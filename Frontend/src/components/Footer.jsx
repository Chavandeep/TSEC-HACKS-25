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
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <List dense>
              {['Home', 'Services', 'Products', 'About Us', 'Contact'].map((text) => (
                <ListItem key={text} disablePadding>
                  <FooterLink variant="body2">{text}</FooterLink>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Services */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Our Services
            </Typography>
            <List dense>
              {['Crop Planning', 'Soil Analysis', 'Irrigation', 'Organic Farming', 'Farm Management'].map((text) => (
                <ListItem key={text} disablePadding>
                  <FooterLink variant="body2">{text}</FooterLink>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <LocationOn fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="123 Farm Road, Green Valley, 12345" primaryTypographyProps={{ variant: 'body2' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <Phone fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="+1 (555) 123-4567" primaryTypographyProps={{ variant: 'body2' }} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <Email fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="info@farmissan.com" primaryTypographyProps={{ variant: 'body2' }} />
              </ListItem>
            </List>
          </Grid>
          
          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Newsletter
            </Typography>
            <Typography variant="body2" mb={2}>
              Stay updated with our latest news and offers!
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                required
                id="email"
                placeholder="Enter your email"
                name="email"
                autoComplete="email"
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  input: { color: 'white' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              />
              <GreenButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1 }}
              >
                Subscribe
              </GreenButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        {/* Copyright */}
        <Box textAlign="center">
          <Typography variant="body2">
            © {getCurrentYear()} Farmissan. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </FooterRoot>
  );
}