import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography
} from '@material-ui/core';

const Signup = () => {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <form>
            <Box sx={{ mb: 3 }}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Create new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create new account
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="First name"
              margin="normal"
              name="firstName"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last name"
              margin="normal"
              name="lastName"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                name="policy"
              />
              <Typography
                color="textSecondary"
                variant="body1"
              >
                I have read the
                {' '}
                <Link
                  color="primary"
                  to="#"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Have an account?!!!
              <Link
                color="primary"
                to="/login"
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Signup;