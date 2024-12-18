import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Card, Rating, CircularProgress, Grid } from '@mui/material'; 
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCart } from '../context/CartContext'; // Import CartContext

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import { Autoplay, Navigation, Pagination } from 'swiper';

function Products() {
  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const { addToCart } = useCart(); // Access addToCart function from CartContext

  // Fetching products from FakeStoreAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        
        // Mapping the API response to fit our data structure
        const mappedProducts = response.data.map(item => ({
          id: item.id,
          images: [item.image], // API returns only one image per product, so we wrap it in an array
          category: item.category || 'Category not available',
          name: item.title,
          rating: item.rating.rate || 4,
          price: item.price,
        }));

        setProducts(mappedProducts); // Set products data
      } catch (err) {
        setError('Failed to load products.'); // Error handling
      } finally {
        setLoading(false); // Turn off loading
      }
    };

    fetchProducts();
  }, []); 

  // Loading State
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress /> {/* Show loading spinner */}
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ p: 3 }}>
      {/* Product Grid - Using MUI Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              p: 3, 
              textAlign: 'center', 
              boxShadow: 3, 
              borderRadius: 2 
            }}>
              
              {/* Image Display: Swiper for Multiple Images */}
              <Box sx={{ width: '100%', height: 300, mb: 2, position: 'relative' }}>
                <Swiper
                  spaceBetween={10} // Space between slides
                  slidesPerView={1} // Number of slides to show at a time
                  loop={true} // Infinite loop
                  autoplay={{ delay: 2000 }} // Auto slide every 2 seconds
                  pagination={{ clickable: true }} // Pagination dots
                  modules={[Autoplay, Navigation, Pagination]}
                  style={{ height: '100%' }} // Ensures the swiper occupies full height
                >
                  <SwiperSlide>
                    <img
                      src={product.images[0]} // If only one image exists, show it
                      alt={`Product ${product.name}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </SwiperSlide>
                </Swiper>
              </Box>

              {/* Product Details Below the Image */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {product.category}
                </Typography>
                <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
                  {product.name}
                </Typography>
                <Rating
                  name="half-rating-read"
                  value={product.rating}
                  precision={0.1}
                  readOnly
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                    ${(product.price + 10).toFixed(2)} {/* Add a discount logic here */}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)} {/* Display actual price */}
                  </Typography>
                </Box>
              </Box>


              <Box clasName="d-flex justify-content-around gap-5 border">
              
                {/* Add to Cart Button */}
                <Button variant="contained" size="medium" sx={{ mt: 2 }} onClick={() => addToCart(product)}>
                  <AddShoppingCartIcon /> 
                </Button>

                {/* Favorite Button */}
                <Button variant="contained" size="medium" sx={{ ml: 2, mt: 2 }}>
                  <FavoriteIcon />
                </Button>

                {/* View Details Button */}
                <Button variant="contained" size="medium" sx={{ ml: 2, mt: 2 }}>
                  <VisibilityIcon /> 
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
