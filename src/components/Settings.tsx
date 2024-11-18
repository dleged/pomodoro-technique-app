import {
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

interface SettingsProps {
  onUpdate: (workTime: number, shortBreakTime: number, longBreakTime: number) => void;
}

export function Settings({ onUpdate }: SettingsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [workTime, setWorkTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);

  const handleSave = () => {
    onUpdate(workTime, shortBreakTime, longBreakTime);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Settings"
        icon={<FaCog />}
        onClick={onOpen}
        variant="ghost"
        color={useColorModeValue('gray.600', 'gray.400')}
        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'gray.800')} maxW="300px">
          <DrawerCloseButton size="sm" />
          <DrawerHeader borderBottomWidth="1px" color={useColorModeValue('gray.800', 'white')} fontSize="md" py={3}>
            Timer Settings
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={3} align="stretch" pt={2}>
              <FormControl size="sm">
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')} fontSize="sm">Work Time (minutes)</FormLabel>
                <NumberInput
                  value={workTime}
                  onChange={(_, value) => setWorkTime(value)}
                  min={1}
                  max={60}
                  size="sm"
                >
                  <NumberInputField 
                    bg={useColorModeValue('white', 'gray.700')}
                    _hover={{ borderColor: useColorModeValue('blue.500', 'blue.300') }}
                    _focus={{ 
                      borderColor: useColorModeValue('blue.500', 'blue.300'),
                      boxShadow: 'none'
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper 
                      color={useColorModeValue('gray.600', 'gray.400')}
                      _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                    />
                    <NumberDecrementStepper 
                      color={useColorModeValue('gray.600', 'gray.400')}
                      _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl size="sm">
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')} fontSize="sm">Short Break (minutes)</FormLabel>
                <NumberInput
                  value={shortBreakTime}
                  onChange={(_, value) => setShortBreakTime(value)}
                  min={1}
                  max={30}
                  size="sm"
                >
                  <NumberInputField 
                    bg={useColorModeValue('white', 'gray.700')}
                    _hover={{ borderColor: useColorModeValue('blue.500', 'blue.300') }}
                    _focus={{ 
                      borderColor: useColorModeValue('blue.500', 'blue.300'),
                      boxShadow: 'none'
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper 
                      color={useColorModeValue('gray.600', 'gray.400')}
                      _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                    />
                    <NumberDecrementStepper 
                      color={useColorModeValue('gray.600', 'gray.400')}
                      _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl size="sm">
                <FormLabel color={useColorModeValue('gray.700', 'gray.200')} fontSize="sm">Long Break (minutes)</FormLabel>
                <NumberInput
                  value={longBreakTime}
                  onChange={(_, value) => setLongBreakTime(value)}
                  min={1}
                  max={60}
                  size="sm"
                >
                  <NumberInputField 
                    bg={useColorModeValue('white', 'gray.700')}
                    _hover={{ borderColor: useColorModeValue('blue.500', 'blue.300') }}
                    _focus={{ 
                      borderColor: useColorModeValue('blue.500', 'blue.300'),
                      boxShadow: 'none'
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper 
                      color={useColorModeValue('gray.600', 'gray.400')}
                      _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                    />
                    <NumberDecrementStepper 
                      color={useColorModeValue('gray.600', 'gray.400')}
                      _active={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Button
                colorScheme="blue"
                onClick={handleSave}
                size="sm"
                w="full"
                mt={2}
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'sm'
                }}
                transition="all 0.2s"
              >
                Save Settings
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
