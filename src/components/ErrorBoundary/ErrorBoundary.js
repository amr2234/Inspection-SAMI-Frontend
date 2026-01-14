import React from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('❌ Error Boundary Caught:', error, errorInfo);
    
    // Store error details in state
    this.state = {
      hasError: true,
      error,
      errorInfo,
    };
    
    // You can also log the error to an error reporting service
    // Example: Sentry.captureException(error);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Optionally navigate to home
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Center h="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
          <Box
            maxW="lg"
            p={8}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="lg"
            boxShadow="xl"
            textAlign="center"
          >
            <VStack spacing={6}>
              <Icon
                as={WarningIcon}
                boxSize={16}
                color="red.500"
              />
              
              <Heading size="lg" color={useColorModeValue('gray.800', 'white')}>
                حدث خطأ غير متوقع
              </Heading>
              
              <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="md">
                نعتذر عن هذا الإزعاج. حدث خطأ أثناء معالجة طلبك.
              </Text>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box
                  w="100%"
                  p={4}
                  bg="red.50"
                  borderRadius="md"
                  textAlign="left"
                  fontSize="sm"
                  maxH="200px"
                  overflowY="auto"
                >
                  <Text fontWeight="bold" color="red.700" mb={2}>
                    Error Details:
                  </Text>
                  <Text color="red.600" fontFamily="mono" whiteSpace="pre-wrap">
                    {this.state.error.toString()}
                  </Text>
                  {this.state.errorInfo && (
                    <Text color="red.500" fontFamily="mono" fontSize="xs" mt={2}>
                      {this.state.errorInfo.componentStack}
                    </Text>
                  )}
                </Box>
              )}

              <VStack spacing={3} w="100%">
                <Button
                  colorScheme="teal"
                  size="lg"
                  w="100%"
                  onClick={this.handleReload}
                >
                  إعادة تحميل الصفحة
                </Button>
                
                <Button
                  variant="outline"
                  colorScheme="teal"
                  size="lg"
                  w="100%"
                  onClick={this.handleReset}
                >
                  العودة إلى الصفحة الرئيسية
                </Button>
              </VStack>

              <Text fontSize="sm" color="gray.500">
                إذا استمرت المشكلة، يرجى الاتصال بالدعم الفني
              </Text>
            </VStack>
          </Box>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
