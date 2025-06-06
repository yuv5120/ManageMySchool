import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

// Gradient Button Component
const GradientButton = styled('button')`
  background: linear-gradient(to right, #4facfe, #e54d9b);
  color: white;
  font-weight: 600;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  margin-bottom: 16px;
  &:hover {
    background: linear-gradient(to right, #3e8de3, #d1448e);
  }
`;

// Gradient Link Component
const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  background: linear-gradient(to right, #4facfe, #e54d9b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);

  const role = "Admin";

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role, schoolName };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'adminName') setAdminNameError(false);
    if (name === 'schoolName') setSchoolNameError(false);
  };

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      navigate('/Admin/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              Admin Register
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>
              Create your own school by registering as an admin.
              <br />
              You will be able to add students and faculty and manage the system.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="adminName"
                label="Enter your name"
                name="adminName"
                autoComplete="name"
                autoFocus
                error={adminNameError}
                helperText={adminNameError && 'Name is required'}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="schoolName"
                label="Create your school name"
                name="schoolName"
                autoComplete="off"
                error={schoolNameError}
                helperText={schoolNameError && 'School name is required'}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailError && 'Email is required'}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <GradientButton type="submit">
                {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </GradientButton>
              <Grid container>
                <Grid item>
                  Already have an account?
                </Grid>
                <Grid item sx={{ ml: 2 }}>
                  <StyledLink to="/Adminlogin">
                    Log in
                  </StyledLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default AdminRegisterPage;
