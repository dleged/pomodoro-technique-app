import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Container,
  Progress,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { Settings } from './components/Settings';
import { formatTime } from './utils/formatTime';
import { usePomodoro } from './hooks/usePomodoro';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';


function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    time,
    isActive,
    mode,
    pomodoroCount,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings,
  } = usePomodoro({
    onComplete: async () => {
      try {
        let permissionGranted = await isPermissionGranted();
        if (!permissionGranted) {
          const permission = await requestPermission();
          permissionGranted = permission === 'granted';
        }
        debugger;
        if (permissionGranted) {
          await sendNotification({
            title: mode === 'work' ? 'Break Time!' : 'Back to Work!',
            body: mode === 'work' ? 'Time for a break! Take a moment to relax.' : 'Break is over! Let\'s get back to being productive.'
          });
        }
      } catch (error) {
        console.error('Failed to show notification:', error);
      }
    },
  });

  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bg} color={color} py={0} px={0}>
        <Container maxW="container.sm" p={0} h="400px" w="500px">
          <VStack spacing={4} h="full">
            <Box
              p={6}
              borderRadius="0"
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow="lg"
              w="full"
              h="full"
              position="relative"
            >
              <VStack spacing={4}>
                <HStack w="full" justify="space-between" mb={2}>
                  <Heading size="md">Pomodoro Technique</Heading>
                  <HStack spacing={2}>
                    <Settings onUpdate={(workTime, shortBreakTime, longBreakTime) => {
                      updateSettings({ workTime, shortBreakTime, longBreakTime });
                    }} />
                    <IconButton
                      aria-label="Toggle color mode"
                      icon={colorMode === 'light' ? <FaMoon color="#718096" /> : <FaSun color="#F6E05E" />}
                      onClick={toggleColorMode}
                      variant="ghost"
                      _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                    />
                  </HStack>
                </HStack>

                <Text fontSize="6xl" fontWeight="bold" fontFamily="mono">
                  {formatTime(time)}
                </Text>
                <Progress
                  value={progress}
                  w="full"
                  colorScheme={mode === 'work' ? 'blue' : 'green'}
                  size="sm"
                  borderRadius="full"
                />
                <Text fontSize="xl" color={mode === 'work' ? 'red.500' : 'green.500'}>
                  {mode === 'work' ? '✍️ Work Time' : '☕ Break Time'}
                </Text>

                <HStack spacing={4}>
                  <Button
                    leftIcon={isActive ? <FaPause /> : <FaPlay />}
                    colorScheme={isActive ? 'orange' : 'blue'}
                    onClick={isActive ? pauseTimer : startTimer}
                  >
                    {isActive ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    leftIcon={<FaRedo />}
                    colorScheme="gray"
                    onClick={resetTimer}
                  >
                    Reset
                  </Button>
                </HStack>

                <Text>
                  Completed Pomodoros: {pomodoroCount}
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
