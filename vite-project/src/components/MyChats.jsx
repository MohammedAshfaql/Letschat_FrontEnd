import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = () => {
  const [selectedChats, setSelectedChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchInitialChats = async () => {
      if (!user) {
        console.log('No user logged in');
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data: chatsData } = await axios.get(
          `https://lastcode.onrender.com/chat/sender/${user._id}`,
          config
        );
        
        // Group chats by user and get only the latest message
        const userChatsMap = new Map();
        
        chatsData.forEach(chat => {
          const otherId = chat.sender === user._id ? chat.receiver : chat.sender;
          
          if (!userChatsMap.has(otherId) || 
              new Date(chat.timestamp) > new Date(userChatsMap.get(otherId).timestamp)) {
            userChatsMap.set(otherId, chat);
          }
        });

        // Process and set latest chats
        const processedChats = await Promise.all(
          Array.from(userChatsMap.entries()).map(async ([otherId, chat]) => {
            try {
              const { data: userData } = await axios.get(
                `https://lastcode.onrender.com/user/id/${otherId}`,
                config
              );
              
              return {
                userId: otherId,
                name: userData.name,
                lastMessage: chat.content,
                timestamp: chat.timestamp
              };
            } catch (error) {
              console.error(`Error fetching user data for ID ${otherId}:`, error);
              return null;
            }
          })
        );

        // Filter out any null results from failed user fetches
        const validChats = processedChats.filter(chat => chat !== null);
        
        // Sort by most recent message
        validChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setSelectedChats(validChats);
      } catch (error) {
        console.error('Error fetching initial chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialChats();
  }, [user]);

  const handleNewChat = (chatInfo) => {
    setSelectedChats(prevChats => {
      // Remove the existing chat with this user if it exists
      const filteredChats = prevChats.filter(chat => chat.userId !== chatInfo.userId);
      
      // Add the new chat at the beginning of the array
      return [chatInfo, ...filteredChats];
    });
  };

  if (!user) {
    return <Box>Please log in to view chats</Box>;
  }

  return (
    <Box
      display={{ base: "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "24px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            marginLeft='15px'
            fontSize={{ base: "17px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <Stack overflowY="scroll">
          {loading ? (
            <Text>Loading chats...</Text>
          ) : (
            selectedChats.map((chat, index) => (
              <Box
                key={chat.userId || index}
                cursor="pointer"
                bg="#E8E8E8"
                color="black"
                px={3}
                py={2}
                borderRadius="lg"
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}
              >
                <Text fontWeight="bold">{chat.name}</Text>
                <Text fontSize="xs">
                  {chat.lastMessage}
                  {chat.timestamp && (
                    <Text as="span" fontSize="xs" float="right">
                      {new Date(chat.timestamp).toLocaleTimeString()}
                    </Text>
                  )}
                </Text>
              </Box>
            ))
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default MyChats;