import React from 'react';
import { Box, Flex, Text, Progress } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export function Stepper({ steps, currentStep }) {
  return (
    <Box w="full" py={6} px={4} bg="white" borderBottom="1px" borderColor="gray.200">
      <Box maxW="5xl" mx="auto">
        {/* Desktop Stepper */}
        <Flex display={{ base: 'none', md: 'flex' }} align="center" justify="space-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <Flex key={index} align="center" flex={1}>
                <Flex direction="column" align="center" flex={1}>
                  <Flex
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    align="center"
                    justify="center"
                    border="2px"
                    transition="all 0.2s"
                    bg={isCompleted || isCurrent ? 'green.600' : 'white'}
                    borderColor={isCompleted || isCurrent ? 'green.600' : 'gray.300'}
                    color={isCompleted || isCurrent ? 'white' : 'gray.400'}
                  >
                    {isCompleted ? (
                      <CheckIcon w="20px" h="20px" />
                    ) : (
                      <Text fontWeight="semibold">{index + 1}</Text>
                    )}
                  </Flex>
                  <Text
                    mt={2}
                    fontSize="sm"
                    textAlign="center"
                    color={isCurrent ? 'green.700' : isCompleted ? 'gray.700' : 'gray.400'}
                    fontWeight={isCurrent ? 'semibold' : 'normal'}
                  >
                    {step}
                  </Text>
                </Flex>
                {index < steps.length - 1 && (
                  <Box
                    h="2px"
                    flex={1}
                    mx={2}
                    transition="all 0.2s"
                    bg={isCompleted ? 'green.600' : 'gray.300'}
                  />
                )}
              </Flex>
            );
          })}
        </Flex>

        {/* Mobile Stepper */}
        <Box display={{ base: 'block', md: 'none' }}>
          <Flex justify="space-between" align="center" mb={4}>
            <Flex align="center" gap={3}>
              <Flex
                w="40px"
                h="40px"
                borderRadius="full"
                align="center"
                justify="center"
                bg="green.600"
                color="white"
                fontWeight="semibold"
              >
                {currentStep + 1}
              </Flex>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  خطوة {currentStep + 1} من {steps.length}
                </Text>
                <Text fontWeight="semibold" color="gray.900">{steps[currentStep]}</Text>
              </Box>
            </Flex>
          </Flex>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            size="sm"
            colorScheme="green"
            borderRadius="full"
          />
        </Box>
      </Box>
    </Box>
  );
}
