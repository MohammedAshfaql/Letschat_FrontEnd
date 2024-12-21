import React from 'react';
import { 
  IconButton, 
  useDisclosure, 
  Button, 
  Image, 
  Text, 
  Box 
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { 
  Modal, 
  ModalBody, 
  ModalOverlay, 
  ModalHeader, 
  ModalFooter,
  ModalContent, 
  ModalCloseButton
} from '@chakra-ui/react';
import { useUser } from '../../Context/UserContext';

const ProfileModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="30px"
            fontFamily="Work sans"
            textAlign="center"
          >
            {user?.name || 'Loading...'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              justifyContent="center"
            >
              <Image
                src={'https://bit.ly/dan-abramov'}
               
                borderRadius="full"
                boxSize="120px"
              />
              <Text 
                fontSize={{ base: '18px', md: '22px' }}
                fontFamily="Work sans"
                mt={4}
              >
                Email: {user?.email || 'Loading...'}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;