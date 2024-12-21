import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Box,
  Input,
  useToast,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import ProfileModal from '../miscellaneous/ProfileModal';
import ChatLoading from '../ChatLoading';
import UserListItem from '../useAvtar/UserListItem';
import axios from 'axios';

const SlideDrawer = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // Store users found in search
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();  // Hook for handling dark/light theme

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    setLoading(true);

    try {
      // Request to search by name or email
      const { data } = await axios.get(
        `https://login-signup-ndpt.onrender.com/user/search?name=${search}`
      );
      
      // Append new results to the existing users list
      setUsers((prevUsers) => [...prevUsers, ...data]);  // Append new results

    } catch (error) {
      console.error('Error fetching search results', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        {/* Search Users */}
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" display="flex" alignItems="center" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: 'none', md: 'flex' }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        {/* App Name */}
        <Text fontSize="2xl" fontFamily="Work sans" textAlign="center">
          LETS CHAT
        </Text>

        {/* Notifications and Profile */}
        <Flex alignItems="center" gap={4}>
          {/* Notifications */}
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>

          {/* Theme Toggle Button */}
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle theme"
            variant="ghost"
            isRound
            size="md"
          />

          {/* Profile */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                cursor="pointer"
                src="https://bit.ly/dan-abramov"
              />
            </MenuButton>
            <MenuList>
              <ProfileModal>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Drawer for Search Users */}
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              <Box display="flex" pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? <ChatLoading /> : <UserListItem users={users} handleFunction={() => {}} />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SlideDrawer;
