import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Tabs, Tab } from '@mui/material';

import { styled } from '@mui/system';
import { useState } from 'react';

interface LoginRegisterPageProps {
  onClose: () => void; 
}
const CustomTypography = styled(Typography)({
  fontSize: '30px',
  fontWeight: 'bold', // Make the text bolder
  color: '#6A1B9A', // Darker Violet Color
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Add shadow effect
  letterSpacing: '2.5px',
});

const LoginRegister:React.FC<LoginRegisterPageProps>= ({onClose}) => {

    const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = ( newTab: number) => {
    setCurrentTab(newTab);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomTypography color="textPrimary">MindHealth</CustomTypography>
          <Tabs value={currentTab}  onChange={(event, newTab) => handleTabChange(newTab)}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </div>
      </DialogTitle>
      <DialogContent>
        {currentTab === 0 ? (
          <div>
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
          </div>
        ) : (
          <div>
            <DialogContentText sx={{ color: 'textSecondary' }}>
              Please enter your information to register.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              sx={{ backgroundColor: 'rgba(153, 50, 204, 0.2)' }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
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
            {/* Additional registration fields */}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button onClick={() => handleTabChange(currentTab === 0 ? 1 : 0)} color="primary">
          {currentTab === 0 ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginRegister