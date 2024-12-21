


import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Input, Button, useToast } from '@chakra-ui/react';
import io from 'socket.io-client';
import axios from 'axios';
import { useUser } from '../Context/UserContext';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const toast = useToast();
  const { user } = useUser(); // Access the user from context
  const [receiverId] = useState('6766485d1e7c6b8dbcf1668e'); // Receiver ID can be made dynamic if needed

  useEffect(() => {
    if (user?._id) {
      const newSocket = io('http://localhost:3000');
      newSocket.emit('register', user._id); // Register the user ID with the socket server
      newSocket.on('chat message', (msg) => setMessages((prev) => [...prev, msg])); // Listen for messages
      setSocket(newSocket);

      return () => newSocket.disconnect(); // Cleanup on unmount
    }
  }, [user]);

  const sendMessage = async () => {
    if (message.trim() && user?._id) {
      const messagePayload = {
        sender: user._id, // Use the logged-in user's ID
        receiver: receiverId,
        content: message,
      };

      try {
        // Send message to server via WebSocket
        socket.emit('send message', messagePayload);

        // Send message to database via API
        const response = await axios.post(
          'https://lastcode.onrender.com/chat/',
          JSON.stringify(messagePayload), // Convert the payload to JSON
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
            },
          }
        );

        if (response.status === 201) {
          // Add the sent message to local state
          setMessages((prev) => [...prev, { sender: user._id, content: message }]);
          setMessage('');
        } else {
          throw new Error('Failed to save message');
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to send the message.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: '100%', md: '68%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <VStack align="start" spacing={3} maxH="400px" overflowY="scroll" width="100%" p={2}>
        {messages.map((msg, index) => (
          <Box key={index} p={2} bg="gray.100" borderRadius="md" w="full" boxShadow="sm">
            <Text>
              <strong>{msg.sender === user._id ? 'You' : 'Other'}:</strong> {msg.content}
            </Text>
          </Box>
        ))}
      </VStack>
      <Box display="flex" mt={3} w="full">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          flex="1"
        />
        <Button onClick={sendMessage} colorScheme="teal" ml={3}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbox;
