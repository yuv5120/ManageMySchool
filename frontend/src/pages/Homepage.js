import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                {/* Text + Buttons section (now on the left) */}
                <Grid item xs={12} md={6}>
                    <StyledBoxContainer>
                        <StyledTitle>
                            Manage-MySchool
                            <br />
                            School Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledButtonBox>
                            <StyledLink to="/choose">
                                <GradientButton variant="contained" fullWidth>
                                    Login
                                </GradientButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <GradientButton variant="contained" fullWidth>
                                    Login as Guest
                                </GradientButton>
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <StyledLink to="/Adminregister">
                                    <GradientLink>Sign up</GradientLink>
                                </StyledLink>
                            </StyledText>
                        </StyledButtonBox>
                    </StyledBoxContainer>
                </Grid>

                {/* Image section (now on the right) */}
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledBoxContainer = styled(Box)`
  background: #fff;
  padding: 40px;
  margin: 20px;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const StyledButtonBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  color: #252525;
  font-weight: bold;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
`;

const StyledText = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const GradientButton = styled(Button)`
  background: linear-gradient(to right, #2196f3, #e91e63);
  color: white;
  &:hover {
    background: linear-gradient(to right, #1e88e5, #d81b60);
  }
`;

const GradientLink = styled.span`
  background: linear-gradient(to right, #2196f3, #e91e63);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to right, #1e88e5, #d81b60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;


