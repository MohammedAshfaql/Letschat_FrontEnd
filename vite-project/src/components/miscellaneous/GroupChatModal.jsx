import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,  
    FormControl,
    Input,
    Box,
  } from "@chakra-ui/react";
  
  const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
      
        <span onClick={onOpen}>{children}</span>
  
      
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              Create Group Chat
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody d="flex" flexDir="column" alignItems="center">
              <FormControl>
                <Input placeholder="Chat Name" mb={3} />
              </FormControl>
              <FormControl>
                <Input placeholder="Add Users eg: John, Piyush, Jane" mb={1} />
              </FormControl>
              <Box w="100%" d="flex" flexWrap="wrap">
                {/* User badges will be added here */}
              </Box>
              <Box>
                {/* Loading or search results will be displayed here */}
              </Box>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue">Create Chat</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default GroupChatModal;
  