import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Grid, } from '@mui/material';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  // State to handle form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State to handle form validation errors
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // First Name validation
    if (!formData.firstName) newErrors.firstName = 'First Name is required';

    // Last Name validation
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';

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

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
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
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
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
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              margin="normal"
            />
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
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
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
            
<Box className="mt-5 d-flex">
<Typography className='text-dark'>Already have an account?
 
<Link className='text-primiry p-3 my-4' to="/SignIn" style={{ textDecoration: 'none' }}>
        
      Signup
      
    </Link> </Typography>
</Box>

            
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
