// import { useState } from "react";
// import { 
//   Button, 
//   Input, 
//   VStack, 
//   FormControl, 
//   FormLabel, 
//   Container, 
//   Box,
//   useToast
// } from "@chakra-ui/react";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const toast = useToast();

//   async function HandleSubmit(e) {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "https://lastcode.onrender.com/user/register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name, userName, email, password }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         toast({
//           title: "Success",
//           description: data.message || "User registered successfully",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });

//         // Clear form inputs
//         setName("");
//         setUserName("");
//         setEmail("");
//         setPassword("");
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to register");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       toast({
//         title: "Error",
//         description: error.message,
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
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
//             <FormControl>
//               <FormLabel>Name</FormLabel>
//               <Input
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 borderColor="gray.300"
//                 _hover={{ borderColor: "gray.400" }}
//                 _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
//               />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Username</FormLabel>
//               <Input
//                 placeholder="Enter your username"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//                 borderColor="gray.300"
//                 _hover={{ borderColor: "gray.400" }}
//                 _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
//               />
//             </FormControl>

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
//             >
//               Sign Up
//             </Button>
//           </VStack>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default Signup;

// Register

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Input, Button, VStack } from '@chakra-ui/react';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const response = await fetch('https://lastcode.onrender.com/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         navigate('/login'); // Redirect to login
//       } else {
//         alert('Registration failed');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//     }
//   };

//   return (
//     <VStack spacing={4}>
//       <Input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <Input
//         placeholder="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button onClick={handleRegister} colorScheme="teal">
//         Register
//       </Button>
//     </VStack>
//   );
// };

// export default Register;


import { useState } from "react";
import { Button, Input, VStack, FormControl, FormLabel, Container, Box, useToast } from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://lastcode.onrender.com/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({ title: "Success", description: data.message, status: "success", duration: 3000, isClosable: true });
        setName(""); setUserName(""); setEmail(""); setPassword("");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Container maxW="md" py={10}>
      <Box p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
        <form onSubmit={HandleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl><FormLabel>Name</FormLabel><Input value={name} onChange={(e) => setName(e.target.value)} /></FormControl>
            <FormControl isRequired><FormLabel>Username</FormLabel><Input value={userName} onChange={(e) => setUserName(e.target.value)} /></FormControl>
            <FormControl isRequired><FormLabel>Email</FormLabel><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></FormControl>
            <FormControl isRequired><FormLabel>Password</FormLabel><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></FormControl>
            <Button type="submit" colorScheme="blue" width="100%">Sign Up</Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;