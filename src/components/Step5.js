import React from 'react';
import { Box, Text, FormControl, FormLabel, Input, Flex } from '@chakra-ui/react';

export function Step5({ formData, updateFormData }) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>الغرامات المالية</Text>
      
      <Box>
        {/* Violation 1 */}
        <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="gray.50" mb={8}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>المخالفة رقم 1</Text>
          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              مقترح قيمة المخالفة رقم 1 (ريال سعودي) <span style={{ color: 'red', marginRight: '4px' }}>*</span>
            </FormLabel>
            <Box position="relative">
              <Input
                type="number"
                value={formData.fine1 || ''}
                onChange={(e) => updateFormData('fine1', e.target.value)}
                placeholder="0.00"
                textAlign="left"
                min="0"
                step="0.01"
                size="md"
                borderRadius="md"
              />
              <Text position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="gray.500" fontSize="sm">
                ر.س
              </Text>
            </Box>
          </FormControl>
        </Box>

        {/* Violation 2 */}
        <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="gray.50" mb={8}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>المخالفة رقم 2</Text>
          <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              مقترح قيمة المخالفة رقم 2 (ريال سعودي) <span style={{ color: 'red', marginRight: '4px' }}>*</span>
            </FormLabel>
            <Box position="relative">
              <Input
                type="number"
                value={formData.fine2 || ''}
                onChange={(e) => updateFormData('fine2', e.target.value)}
                placeholder="0.00"
                textAlign="left"
                min="0"
                step="0.01"
                size="md"
                borderRadius="md"
              />
              <Text position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="gray.500" fontSize="sm">
                ر.س
              </Text>
            </Box>
          </FormControl>
        </Box>

        {/* Total */}
        <Box borderTop="2px" borderColor="gray.300" pt={4}>
          <Flex justify="space-between" align="center" bg="green.50" p={4} borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold" color="gray.800">إجمالي الغرامات:</Text>
            <Text fontSize="2xl" fontWeight="bold" color="green.700">
              {(parseFloat(formData.fine1 || 0) + parseFloat(formData.fine2 || 0)).toFixed(2)} ر.س
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
