import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';

const UserListItem = ({ users, handleFunction }) => {
  return (
    <Box>
      {users.length > 0 ? (
        users.map((user, index) => (
          <Box
            key={index}
            onClick={() => handleFunction(user)} // Passing the user data to handleFunction
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
              background: "#38B2AC",
              color: "white",
            }}
            w="100%"
            d="flex"
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
              name={user.name || 'Default Name'}
              src={user.pic || 'https://bit.ly/dan-abramov'}
            />
            <Box>
              <Text>{user.name || 'No Name'}</Text>
              <Text fontSize="xs">
                <b>Email : </b>
                {user.email || 'No Email'}
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
