import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../contexts/LanguageContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green color for farming theme
    },
    secondary: {
      main: '#FFA000', // Amber color for accent
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
});

const Header = () => {
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState('');
  const { language, setLanguage } = useLanguage();
  const [y, setY] = useState(window.scrollY);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setAccountType(userDoc.data().accountType);
        }
      } else {
        setUser(null);
        setAccountType('');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
      alert(`Logout failed: ${error.message}`);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const menuItems = ['Home', 'Products', 'About Us', 'Blog', 'Contact'];

  const MenuLink = ({ to, children }) => (
    <Box
      component={ScrollLink}
      to={to}
      smooth={true}
      spy={true}
      offset={-70}
      sx={{
        cursor: 'pointer',
        color: 'text.primary',
        position: 'relative',
        textDecoration: 'none',
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '0',
          height: '2px',
          bottom: '-4px',
          left: '50%',
          backgroundColor: theme.palette.primary.main,
          transition: 'all 0.3s ease-in-out',
        },
        '&:hover::after': {
          width: '100%',
          left: '0',
        },
      }}
    >
      {children}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="relative"
        className={`transition-all duration-300 ${y > 100 ? 'py-1' : 'py-2'}`}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 2,
        }}
      >
        <Toolbar className="container mx-auto px-4">
          <ScrollLink to="home" smooth={true} className="flex items-center cursor-pointer">
            <LocalFloristIcon sx={{ color: theme.palette.primary.main, fontSize: 40 }} />
            <Typography variant="h6" sx={{ ml: 2, color: theme.palette.primary.main }}>
              Farmissan
            </Typography>
          </ScrollLink>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item} onClick={handleClose}>
                    <MenuLink to={item.toLowerCase().replace(' ', '-')}>
                      {item}
                    </MenuLink>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleClose}>
                  <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Log in
                  </RouterLink>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box className="ml-auto flex items-center space-x-6">
              {menuItems.map((item) => (
                <MenuLink key={item} to={item.toLowerCase().replace(' ', '-')}>
                  {item}
                </MenuLink>
              ))}
              <Box
                component={RouterLink}
                to="/login"
                sx={{
                  color: 'text.primary',
                  textDecoration: 'none',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '-4px',
                    left: '50%',
                    backgroundColor: theme.palette.primary.main,
                    transition: 'all 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    width: '100%',
                    left: '0',
                  },
                }}
              >
                Log in
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          )}

          {user && (
            <div className="flex items-center ml-4">
              <img
                src={user.photoURL || 'https://example.com/default-profile-pic.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="mr-4">
                <span className="block font-bold">{user.displayName || 'User'}</span>
                <span className="text-sm">{accountType}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="contained"
                color="error"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: theme.palette.error.dark,
                  },
                }}
              >
                Logout
              </Button>
            </div>
          )}

          <IconButton color="inherit" component={RouterLink} to="/cart" sx={{ ml: 2 }}>
            <ShoppingCartIcon />
          </IconButton>

          <div className="ml-4">
            <span className="block font-bold">Language:</span>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="p-2 bg-white text-black rounded"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="te">Telugu</option>
              <option value="mr">Marathi</option>
              <option value="ta">Tamil</option>
              <option value="gu">Gujarati</option>
              <option value="kn">Kannada</option>
              <option value="ml">Malayalam</option>
              <option value="or">Odia</option>
              <option value="as">Assamese</option>
            </select>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
