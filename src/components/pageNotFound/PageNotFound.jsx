import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { Fade } from 'react-awesome-reveal';  // Fade animation
import { motion } from 'framer-motion'; // For animations

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f4f6f8',
        color: '#333',
        padding: 3,
      }}
    >
      {/* Apply fade animation */}
      <Fade cascade duration={1000}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: '#ff6347',
          }}
        >
          404
        </Typography>
      </Fade>

      {/* Animated link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Oops! Page Not Found
        </Typography>
      </motion.div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ padding: '12px 30px' }}>
          Go to Home
        </Button>
      </Link>

      <img
        src="https://via.placeholder.com/500x300/ff6347/ffffff?text=404+Page+Not+Found"
        alt="404"
        style={{
          maxWidth: '80%',
          marginTop: '30px',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
};

export default PageNotFound;
