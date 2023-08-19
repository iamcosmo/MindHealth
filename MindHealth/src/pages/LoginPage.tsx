import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// const FormContainer = styled(Container)(({ theme }) => ({
//   marginTop: theme.spacing(4),
// }));

// const Form = styled('form')({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// });

// const TextFieldWrapper = styled(TextField)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
// }));
const FormContainer = styled(Container)(({ theme }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: '9999',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}));

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
});

const TextFieldWrapper = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        // Successful login, perform necessary actions
        console.log('Login successful');
      }
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }
  };
  return (
    <FormContainer maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Form>
        <TextFieldWrapper
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextFieldWrapper
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </FormContainer>
  );
}

export default LoginPage;