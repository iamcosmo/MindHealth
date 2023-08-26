import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import axios from "axios";
import { useState, useContext } from "react";
import { useUserContext } from "../UserContext";

interface LoginRegisterPageProps {
  onClose: () => void;
}
const CustomTypography = styled(Typography)({
  fontSize: "30px",
  fontWeight: "bold",
  color: "#6A1B9A",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  letterSpacing: "2.5px",
});

const LoginRegister: React.FC<LoginRegisterPageProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const registerLoginUser = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      if (currentTab === 0) {
        //login logic
        try {
          const { data, status } = await axios.post("/login", {
            email,
            password,
          });
          if (status === 200) {
            alert("Login Successfull!!");
            setUser(data);
            navigate("/");
          }
        } catch (err) {
          alert("Login Failed!!");
        }
      } else {
        //register logic
        await axios.post("/register", {
          name,
          email,
          password,
        });
        alert("Registratin Successful! Now you can Login");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Registration Failed Please try later!!");
      // Handle error
    }
  };

  const handleTabChange = (newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(72, 61, 139, 0.8)",
          backdropFilter: "blur(8px)",
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "1px solid #ccc" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomTypography>MindHealth</CustomTypography>
          <Tabs
            value={currentTab}
            onChange={(event, newTab) => handleTabChange(newTab)}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </div>
      </DialogTitle>
      <form onSubmit={registerLoginUser}>
        <DialogContent>
          {currentTab === 0 ? (
            <div>
              <DialogContentText sx={{ color: "textSecondary" }}>
                Please enter your Email and password to log in.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Email"
                type="email"
                value={email}
                fullWidth
                onChange={(ev) => setEmail(ev.target.value)}
                sx={{ backgroundColor: "rgba(153, 50, 204, 0.2)" }}
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                value={password}
                fullWidth
                onChange={(ev) => setPassword(ev.target.value)}
                sx={{ backgroundColor: "rgba(153, 50, 204, 0.2)" }}
              />
            </div>
          ) : (
            <div>
              <DialogContentText sx={{ color: "textSecondary" }}>
                Please enter your information to register.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Full Name"
                type="text"
                fullWidth
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                sx={{ backgroundColor: "rgba(153, 50, 204, 0.2)" }}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                sx={{ backgroundColor: "rgba(153, 50, 204, 0.2)" }}
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                sx={{ backgroundColor: "rgba(153, 50, 204, 0.2)" }}
              />
              {/* Additional registration fields */}
            </div>
          )}
        </DialogContent>
        {/* <form onSubmit={registerLoginUser}> */}
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Close
          </Button>
          <Button type="submit" color="primary">
            {currentTab === 0 ? "Login" : "Register"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginRegister;
