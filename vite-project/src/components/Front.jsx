import { Button, Box, HStack, Heading } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./login";

const Front = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
      p={6}
    >
      
      <HStack spacing={4} >
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => navigate("/login")}
          isDisabled={location.pathname === "/login"} 
        >
          Login
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => navigate("/signup")}
          isDisabled={location.pathname === "/signup"} 
        >
          Sign Up
        </Button>
      </HStack>
      <Login/>
    </Box>
  );
};

export default Front;
