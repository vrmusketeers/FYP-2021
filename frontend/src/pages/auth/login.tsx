import { Link as RouterLink, useHistory} from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useCallback } from 'react';

const Login = () => {
  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
            <Box sx={{ mb: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
                  </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
                  </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                {/* Social Button */}
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                {/* Social Button */}
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
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
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                onClick={()=>{history.push('/patient-list')}}
                variant="contained"
              >
                Sign in now
                  </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Don&apos;t have an account?
                  {' '}
              <Link component={RouterLink} to="/patient-list" variant="h6" underline="hover">
                Sign up
                  </Link>
            </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;