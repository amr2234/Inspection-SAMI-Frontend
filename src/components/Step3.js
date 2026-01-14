import React from 'react';
import { FormField } from './FormField';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

export function Step3({ formData, updateFormData }) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>تفاصيل العينات</Text>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormField
          label="هل تم سحب العينات؟"
          name="samplesCollected"
          value={formData.samplesCollected || ''}
          onChange={(value) => updateFormData('samplesCollected', value)}
          type="select"
          options={['نعم', 'لا']}
          required
        />
        
        <FormField
          label="نوع العينة"
          name="sampleType"
          value={formData.sampleType || ''}
          onChange={(value) => updateFormData('sampleType', value)}
          type="select"
          options={['عينة مياه', 'عينة هواء', 'عينة تربة', 'عينة منتج', 'عينة أخرى']}
          required
        />
        
        <FormField
          label="موقع حفظ العينة"
          name="sampleStorageLocation"
          value={formData.sampleStorageLocation || ''}
          onChange={(value) => updateFormData('sampleStorageLocation', value)}
          type="text"
          placeholder="أدخل موقع حفظ العينة"
          required
        />
        
        <FormField
          label="رقم العينة"
          name="sampleNumber"
          value={formData.sampleNumber || ''}
          onChange={(value) => updateFormData('sampleNumber', value)}
          type="text"
          placeholder="أدخل رقم العينة"
          required
        />
        
        <FormField
          label="نتيجة العينة"
          name="sampleResult"
          value={formData.sampleResult || ''}
          onChange={(value) => updateFormData('sampleResult', value)}
          type="select"
          options={['مطابق', 'غير مطابق', 'قيد الفحص', 'غير متوفر']}
          required
        />
        
        <FormField
          label="إجمالي العينات التي تم سحبها"
          name="totalSamples"
          value={formData.totalSamples || ''}
          onChange={(value) => updateFormData('totalSamples', value)}
          type="number"
          placeholder="0"
          required
        />
      </SimpleGrid>
    </Box>
  );
}
