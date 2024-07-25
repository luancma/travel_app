import { useAuth } from "@/context/AuthProvider";
import { initialize } from "@/services/firebase";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { signOut } from "firebase/auth";


const { auth } = initialize();

export const AppBarComponent = () => {
  const { uid } = useAuth().user || {};

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("logged out");
    })
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 8 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Amooostradinho
          </Typography>
          <Button onClick={handleLogout} color="inherit">{uid ? "Logout" : null}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}