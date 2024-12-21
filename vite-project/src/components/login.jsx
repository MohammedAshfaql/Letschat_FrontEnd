// import { useState } from "react";
// import { 
//   Button, 
//   Input, 
//   VStack, 
//   FormControl, 
//   FormLabel, 
//   Container, 
//   Box, 
//   Text,
//   useToast
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Loginpage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
  
//   const navigate = useNavigate();
//   const toast = useToast();

//   async function HandleSubmit(e) {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError("");
  
//       const response = await axios.post(
//         "https://lastcode.onrender.com/user/login",
//         { email, password }
//       );
  
//       if (response.status === 200) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
  
//         toast({
//           title: "Login Successful",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
  
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       // Check if the error has a response and use its details
//       if (error.response && error.response.status) {
//         setError("Invalid email or password");
//         toast({
//           title: "Error",
//           description: error.response.data.message || "Invalid email or password",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       } else {
//         setError("Network error or server is down");
//         toast({
//           title: "Error",
//           description: "Network error or server is down",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//     setEmail("");
//     setPassword("");
//   }
  

//   return (
//     <Container maxW="md" py={10}>
//       <Box
//         p={8}
//         borderWidth="1px"
//         borderRadius="lg"
//         boxShadow="lg"
//         bg="white"
//       >
//         <form onSubmit={HandleSubmit}>
//           <VStack spacing={4} align="stretch">
//             <FormControl isRequired>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 borderColor="gray.300"
//                 _hover={{ borderColor: "gray.400" }}
//                 _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
//               />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 borderColor="gray.300"
//                 _hover={{ borderColor: "gray.400" }}
//                 _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
//               />
//             </FormControl>

//             <Button
//               type="submit"
//               colorScheme="blue"
//               width="100%"
//               mt={4}
//               isLoading={loading}
//               loadingText="Loading..."
//             >
//               Login
//             </Button>

//             {error && (
//               <Text color="red.500" textAlign="center" mt={2}>
//                 {error}
//               </Text>
//             )}
//           </VStack>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default Loginpage;




import { useState } from "react";
import { 
  Button, 
  Input, 
  VStack, 
  FormControl, 
  FormLabel, 
  Container, 
  Box, 
  Text,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const toast = useToast();

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.post(
        "https://lastcode.onrender.com/user/login",
        { email, password }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        navigate("/chat");
        console.log(response.data.token);
      }
    } catch (error) {
      setError("Invalid email or password");
      toast({
        title: "Error",
        description: "Error while logging in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
    setEmail("");
    setPassword("");
  }

  return (
    <Container maxW="md" py={10}>
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <form onSubmit={HandleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              mt={4}
              isLoading={loading}
              loadingText="Loading..."
            >
              Login
            </Button>

            {error && (
              <Text color="red.500" textAlign="center" mt={2}>
                {error}
              </Text>
            )}
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Loginpage;