import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';
import { useUser } from '../../Context/UserContext';
import axios from 'axios';

const UserListItem = ({ users, onSelectChat }) => {
  const { user } = useUser();
  
  const handleUserClick = async (selectedUser) => {
    try {
      if (!user) {
        console.error('No user logged in');
        return;
      }

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch last chat with this user
      const { data: chatData } = await axios.get(
        `https://lastcode.onrender.com/chat/sender/${user._id}`,
        config
      );
      
      // Fetch user details
      const { data: userData } = await axios.get(
        `https://lastcode.onrender.com/user/id/${selectedUser._id}`,
        config
      );
      
      // Find all chats with this specific user and get the most recent one
      const userChats = chatData.filter(chat => 
        chat.receiver === selectedUser._id || chat.sender === selectedUser._id
      );

      const lastChat = userChats.reduce((latest, current) => {
        if (!latest) return current;
        return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest;
      }, null);
      
      // Prepare chat info for display
      const chatInfo = {
        userId: selectedUser._id,
        name: userData.name || selectedUser.name,
        lastMessage: lastChat?.content || 'No messages yet',
        timestamp: lastChat?.timestamp || new Date().toISOString() // Provide current timestamp if no chat exists
      };
      
      onSelectChat(chatInfo);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  const filteredUsers = users.filter(u => u._id !== user?._id); // Don't show current user in the list

  return (
    <Box>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((otherUser, index) => (
          <Box
            key={otherUser._id || index}
            onClick={() => handleUserClick(otherUser)}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
              background: "#38B2AC",
              color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
          >
            <Avatar
              mr={2}
              size="sm"
              cursor="pointer"
              name={otherUser.name || 'Default Name'}
              src={otherUser.pic || 'https://bit.ly/dan-abramov'}
            />
            <Box>
              <Text>{otherUser.name || 'No Name'}</Text>
              <Text fontSize="xs">
                <b>Email : </b>
                {otherUser.email || 'No Email'}
              </Text>
            </Box>
          </Box>
        ))
      ) : (
        <Text>No users found</Text>
      )}
    </Box>
  );
};

export default UserListItem;