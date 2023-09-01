import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SpaTwoToneIcon from "@mui/icons-material/SpaTwoTone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar/AppBar";
import { useEffect, useState } from "react";
import { pink } from "@mui/material/colors";
import { useUserContext } from "../UserContext";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, setUser, logout } = useUserContext();

  useEffect(() => {
    // Update the loggedIn state based on whether the user is logged in
    const loggedInStatus = user !== null;
    setLoggedIn(loggedInStatus);
  }, [user]);
  const handleProfile = async (settings: String) => {
    if (settings === "Log Out") {
      try {
        await axios.post("/logout"); 
        logout();
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    handleCloseUserMenu();
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const pages = ["Check Status", "Recomendations", "About"];
  const settings = ["Profile", "Log Out"];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: "100%" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SpaTwoToneIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "violet",
                textDecoration: "none",
              }}
            >
              MindHealth
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color="darkgoldenrod">
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SpaTwoToneIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "violet",
                textDecoration: "none",
              }}
            >
              MindHealth
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: pink[500] }}>
                    <AccountCircleIcon />
                  </Avatar>
                  <Typography>{user?.name}</Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {loggedIn ? ( // If logged in, show settings
                  settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link
                        to={setting === "Profile" ? "/profile" : "/"}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          textAlign="center"
                          onClick={() => handleProfile(setting)}
                          variant="body1"
                          color="secondary"
                          style={{ fontWeight: "bold" }}
                        >
                          {setting}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))
                ) : (
                  // If not logged in, show login option
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography
                        textAlign="center"
                        variant="body1"
                        color="secondary"
                        style={{ fontWeight: "bold" }}
                      >
                        Log In / Register
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
