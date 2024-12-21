import React from 'react'
import MyChats from '../MyChats'
import SlideDrawer from '../miscellaneous/SlideDrawer'
import ChatBox from '../ChatBox'
import { Box } from '@chakra-ui/react'

const ChatPage = () => {
  return (
    <Box>
      <SlideDrawer />
      <Box 
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        <MyChats />
        
        <ChatBox />
      </Box>
    </Box>
  )
}

export default ChatPage;
