import React from 'react';
import { FormField } from './FormField';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

export function Step6({ formData, updateFormData }) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>معلومات المفتشين</Text>
      
      <Box>
        {/* Main Inspector */}
        <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="gray.50" mb={8}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>المفتش الرئيسي</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormField
              label="اسم المفتش الرئيسي"
              name="mainInspectorName"
              value={formData.mainInspectorName || ''}
              onChange={(value) => updateFormData('mainInspectorName', value)}
              type="text"
              placeholder="أدخل اسم المفتش الرئيسي"
              required
            />
            
            <FormField
              label="المسمى الوظيفي"
              name="mainInspectorTitle"
              value={formData.mainInspectorTitle || ''}
              onChange={(value) => updateFormData('mainInspectorTitle', value)}
              type="text"
              placeholder="أدخل المسمى الوظيفي"
              required
            />
          </SimpleGrid>
        </Box>

        {/* Assistant Inspector */}
        <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="gray.50">
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>المفتش المساعد</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormField
              label="اسم المفتش المساعد"
              name="assistantInspectorName"
              value={formData.assistantInspectorName || ''}
              onChange={(value) => updateFormData('assistantInspectorName', value)}
              type="text"
              placeholder="أدخل اسم المفتش المساعد"
            />
            
            <FormField
              label="المسمى الوظيفي"
              name="assistantInspectorTitle"
              value={formData.assistantInspectorTitle || ''}
              onChange={(value) => updateFormData('assistantInspectorTitle', value)}
              type="text"
              placeholder="أدخل المسمى الوظيفي"
            />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
