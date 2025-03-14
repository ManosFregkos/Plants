import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation

  const goToHomePage = () => {
    navigate("/"); // Navigate to the home page
  };
  return (
    <Stack height={60} justifyContent={'center'} alignItems={'center'}>
      <Button onClick={goToHomePage} variant={'text'}>Back to home page</Button>
    </Stack>
  )
}
export default Header