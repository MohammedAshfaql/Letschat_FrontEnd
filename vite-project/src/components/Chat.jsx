
import React, { useState, useEffect } from 'react';
import { Box, VStack, Input, Button, Text } from '@chakra-ui/react';
import { useUser } from '../Context/UserContext';
import io from 'socket.io-client';

const socket = io('https://lastcode.onrender.com'); // Update with backend URL

const Chat = () => {
  const { user, selectedReceiver, setSelectedReceiver, messages, setMessages } = useUser();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://lastcode.onrender.com/');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch messages between the logged-in user and selected receiver
  useEffect(() => {
    if (!user || !selectedReceiver) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          https://lastcode.onrender.com/${user._id}/${selectedReceiver._id}
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [user, selectedReceiver, setMessages]);

  useEffect(() => {
    if (!selectedReceiver) return;

    const roomId = ${user._id}_${selectedReceiver._id};
    socket.emit('join room', roomId);

    socket.on('receive message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receive message');
  }, [selectedReceiver, setMessages, user._id]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      sender: user._id,
      receiver: selectedReceiver._id,
      content: message,
      roomId: ${user._id}_${selectedReceiver._id},
    };

    socket.emit('send message', payload);
    setMessage(''); // Clear the input
  };

  return (
    <Box display="flex" h="100vh">
      {/* User List */}
      <VStack w="30%" bg="gray.100" p={4}>
        {users.map((u) => (
          <Box
            key={u._id}
            p={3}
            bg={selectedReceiver?._id === u._id ? 'blue.100' : 'white'}
            borderRadius="md"
            w="full"
            cursor="pointer"
            onClick={() => setSelectedReceiver(u)}
          >
            <Text>{u.name}</Text>
          </Box>
        ))}
      </VStack>

      {/* Chatbox */}
      <Box w="70%" p={4} bg="white" display="flex" flexDirection="column">
        <VStack flex="1" overflowY="scroll">
          {messages.map((msg, index) => (
            <Text key={index} alignSelf={msg.sender === user._id ? 'flex-end' : 'flex-start'}>
              {msg.content}
            </Text>
          ))}
        </VStack>
        <Box display="flex" mt={2}>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={sendMessage} ml={2}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;