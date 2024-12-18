import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Grid } from '@mui/material';

const SignIn = () => {
  // State to handle form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to handle form validation errors
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes and clear error message on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error on change for the specific field
    setErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  // Validate the form inputs
  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are no validation errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate an async API call
      setTimeout(() => {
        console.log('Form submitted successfully', formData);
        setIsSubmitting(false);
        // Reset form data
        setFormData({
          email: '',
          password: '',
        });
      }, 1000);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ padding: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            width: '100%',
            padding: 3,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
