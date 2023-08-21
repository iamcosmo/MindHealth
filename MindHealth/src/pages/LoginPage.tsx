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
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', 
  color: 'blue', 
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
    <Dialog open={true} onClose={onClose} PaperProps={{
      sx: {
        backgroundColor: 'rgba(72, 61, 139, 0.8)', 
        backdropFilter: 'blur(8px)', 
        borderRadius: '10px', 
        padding: '20px', 
      },
    }}> 
      <DialogTitle sx={{ borderBottom: '1px solid #ccc' }}>
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
        <DialogContentText sx={{ color: 'textSecondary' }}>
          Please enter your username and password to log in.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          sx={{ backgroundColor: 'rgba(153, 50, 204, 0.2)' }}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          sx={{ backgroundColor: 'rgba(153, 50, 204, 0.2)' }}
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