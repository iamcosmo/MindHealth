import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const navigate= useNavigate();
  return (
    <div>
      <h1>Welcome to Your ProfilePage</h1>
      <Button variant="contained" onClick={()=>{navigate("/")}}>HomePage</Button>
    </div>
  );
};

export default ProfilePage;
