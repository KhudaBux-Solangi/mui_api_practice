import * as React from 'react';
import { useState } from 'react';
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, Toolbar, Typography, Badge, } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../context/CartContext';  // Import CartContext
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const { cart, calculateTotal, increaseQuantity, decreaseQuantity } = useCart(); // Get cart items, calculate total, and cart manipulation functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false); // State to control cart drawer visibility
  const [productDrawerOpen, setProductDrawerOpen] = useState(false); // State for product drawer

  const { removeFromCart } = useCart(); // Use the cart context

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCartDrawerToggle = () => {
    setCartDrawerOpen(!cartDrawerOpen); // Toggle the cart drawer
  };

  const handleProductDrawerToggle = () => {
    setProductDrawerOpen(!productDrawerOpen); // Toggle product drawer
  };
  
 
  

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Get total items
  const totalPrice = calculateTotal().toFixed(2); // Get total price

  const drawer1 = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Link to="/" className="text-decoration-none text-dark">
        <Typography variant="body1">Home</Typography>
      </Link>
      <Link to="/about" className="text-decoration-none text-dark">
        <Typography variant="body1">About</Typography>
      </Link>
      <Link to="/contact" className="text-decoration-none text-dark">
        <Typography variant="body1">Contact</Typography>
      </Link>
      <Link to="/SignUpForm" className="text-decoration-none text-dark">
        <Typography variant="body1">Signup</Typography>
      </Link>

      {/* Icon buttons (Cart, Favorite, Account) */}
      <Box sx={{ mt: 2 }}>
        <Button color="inherit" onClick={handleCartDrawerToggle}>
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Button>
        <Button color="inherit">
          <FavoriteIcon />
        </Button>
        <Button color="inherit">
          <AccountCircleIcon />
        </Button>
      </Box>
    </Box>
  );

  // Cart Drawer Content
  const cartDrawer = (
    <Box sx={{ width: '100%', height: '100vh', padding: 2 }}>

      <Box className="p-2">
        <Button onClick={handleCartDrawerToggle} variant="outlined" color="secondary">
       <CloseIcon/>
        </Button>
      </Box>
     
      <Typography variant="h2">Your Cart</Typography>
      <Box sx={{ marginTop: 2 }}>
        {cart.length === 0 ? (
          <Typography>No items in the cart</Typography>
        ) : (
          cart.map((item) => (
            <Box className="shadow p-2 my-5" key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box className="rounded border img-fluid"> <img
                  src={item.images[0]}
                  alt={item.name}
                  style={{ width: 80, height: 100, objectFit: 'cover', margin: 10, padding: 10, }}
                />
                </Box>
                <Typography className='m-3'>{item.name}</Typography>
              </Box>
              <Box>
                <Box className="d-flex">
                  <Button
                    onClick={() => decreaseQuantity(item.id)}
                    variant="outlined" size="small"
                    sx={{ marginRight: 1 }}
                  >
                    -
                  </Button>

                  <Button
                    onClick={() => increaseQuantity(item.id)}
                    variant="outlined" size="small"
                    sx={{ marginLeft: 1 }}
                  >
                    +
                  </Button>


                  <Button
                    onClick={() => removeFromCart(item.id)} // Removes item from cart
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 1, color: 'red' }}
                  >
                    <DeleteIcon />
                  </Button>

                </Box>
                <Box className="d-flex">
                  <Typography>{item.quantity}</Typography>
                  <Typography sx={{ ml: 2 }}>${item.price * item.quantity}</Typography>
                </Box>

              </Box>
            </Box>
          ))
        )}
      </Box>
      <Typography variant="h6">Total Price Of Products: ${totalPrice}</Typography>
     
      <Link to="/" className="text-decoration-none text-white">
              <Button className='btn-dark'>Go To Cart </Button>
            </Link>
     
    </Box>
  );

  // Product Drawer (Half-Screen)
  const productDrawer = (
    <Box sx={{ width: '50%', padding: 2 }}>
      <Typography className='text-dark' variant="h6">Product Details</Typography>
      {/* Fix: Close button onClick */}
      <Button variant="contained" onClick={handleProductDrawerToggle}>
        Close
      </Button>
      {/* You can put the product details here */}
    </Box>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-decoration-none text-white">
              MUI
            </Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* Navigation Links */}
            <Link to="/" className="text-decoration-none text-white">
              <Button sx={{ color: '#fff' }}>Home</Button>
            </Link>
            <Link to="/about" className="text-decoration-none text-white">
              <Button sx={{ color: '#fff' }}>About</Button>
            </Link>
            <Link to="/contact" className="text-decoration-none text-white">
              <Button sx={{ color: '#fff' }}>Contact</Button>
            </Link>
            <Link to="/SignUpForm" className="text-decoration-none text-white">
              <Button sx={{ color: '#fff' }}>Signup</Button>
            </Link>

            {/* Cart Button with Badge */}
            <Button color="inherit" onClick={handleCartDrawerToggle}>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Button>

            {/* Icon Buttons for Favorite and Account */}
            <Button color="inherit">
              <FavoriteIcon />
            </Button>
            <Button color="inherit">
              <AccountCircleIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Optimize mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer1}
      </Drawer>

      {/* Full-Screen Cart Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"  // Cart drawer will be on the right side
        open={cartDrawerOpen}
        onClose={handleCartDrawerToggle}
        ModalProps={{
          keepMounted: true,  // Optimize mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '99%',  // Full width
            height: '100vh',  // Full height (fullscreen)
            padding: 2,  // Padding for the content
          },
        }}
      >
        {cartDrawer}
      </Drawer>

      {/* Half-Screen Product Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"  // Product drawer will be on the right side
        open={productDrawerOpen}
        onClose={handleProductDrawerToggle}
        ModalProps={{
          keepMounted: true,  // Optimize mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '50%',  // Half width for product drawer
            height: '100vh',  // Full height
            padding: 2,  // Padding for the content
          },
        }}
      >
        {productDrawer}
      </Drawer>
    </Box>
  );
}

export default Header;
