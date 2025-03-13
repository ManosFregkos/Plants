import {Outlet} from "react-router-dom";
import {Stack} from "@mui/material";

const MainLayout = () => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <main>
        <Outlet/>
      </main>
    </Stack>
  );
};

export default MainLayout;