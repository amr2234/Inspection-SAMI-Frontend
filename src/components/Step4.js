import React from 'react';
import { FormField } from './FormField';
import { Box, Text } from '@chakra-ui/react';

export function Step4({ formData, updateFormData }) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>المخالفات والإجراءات</Text>
      
      <Box>
        <FormField
          label="المخالفة رقم 2 – نوع المخالفة"
          name="violation2Type"
          value={formData.violation2Type || ''}
          onChange={(value) => updateFormData('violation2Type', value)}
          type="select"
          options={[
            'عدم الالتزام بالاشتراطات البيئية',
            'تلوث بيئي',
            'تصريف غير قانوني',
            'عدم وجود تراخيص',
            'مخالفة بناء',
            'أخرى'
          ]}
          required
        />
        
        <Box borderTop="1px" borderColor="gray.200" pt={6} mt={6}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>اللائحة التنفيذية</Text>
          
          <Box>
            <FormField
              label="اللائحة التنفيذية – رقم 1"
              name="regulation1"
              value={formData.regulation1 || ''}
              onChange={(value) => updateFormData('regulation1', value)}
              type="select"
              options={[
                'المادة 5 - الفقرة 1',
                'المادة 5 - الفقرة 2',
                'المادة 7 - الفقرة 1',
                'المادة 7 - الفقرة 3',
                'المادة 10 - الفقرة 1',
                'المادة 12 - الفقرة 2',
                'المادة 15 - الفقرة 1'
              ]}
              required
            />
            
            <FormField
              label="اللائحة التنفيذية – رقم 2"
              name="regulation2"
              value={formData.regulation2 || ''}
              onChange={(value) => updateFormData('regulation2', value)}
              type="select"
              options={[
                'المادة 5 - الفقرة 1',
                'المادة 5 - الفقرة 2',
                'المادة 7 - الفقرة 1',
                'المادة 7 - الفقرة 3',
                'المادة 10 - الفقرة 1',
                'المادة 12 - الفقرة 2',
                'المادة 15 - الفقرة 1'
              ]}
              required
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
