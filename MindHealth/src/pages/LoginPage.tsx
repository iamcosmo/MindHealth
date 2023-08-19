import React, { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';



interface LoginPageProps {
  onClose: () => void; 
}
const CustomTypography = styled(Typography)({
  fontSize: '30px',
});

const LoginPage: React.FC<LoginPageProps>= ({onClose}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        console.log('Login successful');
        onClose();     
        
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <Dialog open={true} onClose={onClose}> 
      <DialogTitle>
        <CustomTypography >Login</CustomTypography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose} 
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your username and password to log in.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginPage;