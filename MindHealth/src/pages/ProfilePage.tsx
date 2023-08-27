import {
  Avatar,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useUserContext } from "../UserContext";
const ProfilePage = () => {
  const { user } = useUserContext();
  const theme = useTheme();
  const profileImage = user?.profileImage;
  const below500px = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Paper
        elevation={3}
        className="profile-paper"
        style={{
          display: "flex",
          flexDirection:below500px? "column":"row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #4a47a3 30%, #42275a 90%)",
        }}
      >
        <div
          className="avatarDiv"
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "45px",
            marginLeft: "25px",
          }}
        >
          <Avatar
            alt={user?.name}
            src={profileImage}
            sx={{
              width: 150,
              height: 150,
              // marginRight: "20px",
              backgroundColor: "#2e294e",
            }}
          >
            <Typography variant="h5" sx={{ fontSize: "6rem" }}>
              {user?.name ? user.name[0] : ""}
            </Typography>
          </Avatar>
          <div style={{ marginTop: "10px" }}>
            <Typography variant="h4" sx={{ color: "#fff" }}>
              {user?.name}
            </Typography>
            <Typography sx={{ color: "#ccc" }}>{user?.email}</Typography>
          </div>
        </div>
        <div
          className="tableDiv"
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "70%",
            flex: 1,
          }}
        >
          <div
            className="profile-details"
            style={{
              marginTop: "10px",
              textShadow:
                "1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography variant="h4" sx={{ color: "#f39c12" }}>
              Profile Details
            </Typography>
          </div>
          <div
            className="table-container"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <TableContainer
              component={Paper}
              elevation={8}
              sx={{
                background: "transparent",
                boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.4)",
                borderRadius: "12px",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Profession</TableCell>
                    <TableCell>{user?.profession}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{user?.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sex</TableCell>
                    <TableCell>{user?.sex || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone No</TableCell>
                    <TableCell>{user?.phone || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Age</TableCell>
                    <TableCell>
                      {user?.dob ? calculateAge(user.dob) : "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Paper>
    </div>
  );
};

function calculateAge(dob: Date) {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
}

export default ProfilePage;
