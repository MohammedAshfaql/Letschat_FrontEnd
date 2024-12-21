import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = () => {
  return (
    <Box
      d={{ base: "flex", md: "flex" }}
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
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            marginLeft='15px'
            fontSize={{ base: "17px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
       
        borderRadius="lg"
        overflowY="hidden"
      >
        <Stack overflowY="scroll">
          {/* Chat Items */}
          <Box
            cursor="pointer"
            bg="#E8E8E8"
            color="black"
            px={3}
            py={2}
            borderRadius="lg"
          >
            <Text>Sender Name</Text>
            <Text fontSize="xs">
              <b>Sender Name: </b> Chat message preview...
            </Text>
          </Box>

          {/* Repeat above Box for other chats */}
        </Stack>
      </Box>
    </Box>
  );
};

export default MyChats;
