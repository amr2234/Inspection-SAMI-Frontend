import React from 'react';
import { FormField } from './FormField';
import { Box, Button, Flex, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

export function Step3({ formData, updateFormData, validationErrors = {} }) {
  const samples = formData.samples || [];
  const sampleCount = formData.sampleCount || '';

  const handleSampleCountChange = (value) => {
    const count = parseInt(value) || 0;
    updateFormData('sampleCount', value);
    
    // Adjust samples array based on count
    const currentSamples = [...samples];
    if (count > currentSamples.length) {
      const newSamples = Array(count - currentSamples.length).fill(null).map(() => ({
        type: '',
        number: ''
      }));
      updateFormData('samples', [...currentSamples, ...newSamples]);
    } else if (count < currentSamples.length) {
      updateFormData('samples', currentSamples.slice(0, count));
    }
  };

  const updateSample = (index, field, value) => {
    const updatedSamples = [...samples];
    updatedSamples[index] = { ...updatedSamples[index], [field]: value };
    updateFormData('samples', updatedSamples);
  };

  const addSample = () => {
    updateFormData('samples', [...samples, { type: '', number: '' }]);
    updateFormData('sampleCount', (samples.length + 1).toString());
  };

  const removeSample = (index) => {
    const updatedSamples = samples.filter((_, i) => i !== index);
    updateFormData('samples', updatedSamples);
    updateFormData('sampleCount', updatedSamples.length.toString());
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>تفاصيل العينات</Text>
      
      {/* Question: Were samples collected? */}
      <Box maxW="md" mb={6}>
        <FormField
          label="هل تم سحب عينات؟"
          name="hasSamples"
          value={formData.hasSamples || ''}
          onChange={(value) => {
            updateFormData('hasSamples', value);
            // Clear samples data if "لا" is selected
            if (value === 'لا') {
              updateFormData('sampleCount', '0');
              updateFormData('samples', []);
            }
          }}
          type="select"
          options={['نعم', 'لا']}
          required
          error={!!validationErrors.hasSamples}
          errorMessage={validationErrors.hasSamples}
        />
      </Box>

      {/* Show sample fields only if "نعم" */}
      {formData.hasSamples === 'نعم' && (
        <>
          <Box maxW="md" mb={6}>
            <FormField
              label="عدد العينات التي تم سحبها"
              name="sampleCount"
              value={sampleCount}
              onChange={handleSampleCountChange}
              type="number"
              required
              error={!!validationErrors.sampleCount}
              errorMessage={validationErrors.sampleCount}
            />
          </Box>

          {samples.length > 0 && (
            <Box mt={6}>
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="semibold" color="gray.700">قائمة العينات</Text>
                <Button
                  onClick={addSample}
                  variant="outline"
                  size="sm"
                  leftIcon={<AddIcon />}
                >
                  إضافة عينة
                </Button>
              </Flex>

              {samples.map((sample, index) => (
                <Box
                  key={index}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={4}
                  bg="gray.50"
                  mb={4}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="semibold" color="gray.700">العينة {index + 1}</Text>
                    {samples.length > 1 && (
                      <Button
                        onClick={() => removeSample(index)}
                        variant="ghost"
                        size="sm"
                        colorScheme="red"
                      >
                        <CloseIcon w={3} h={3} />
                      </Button>
                    )}
                  </Flex>

                  <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormControl flex={1} isRequired>
                      <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                        نوع العينة <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                      </FormLabel>
                      <Input
                        value={sample.type}
                        onChange={(e) => updateSample(index, 'type', e.target.value)}
                        placeholder="مثال: عينة مياه"
                        size="md"
                        borderRadius="md"
                      />
                    </FormControl>

                    <FormControl flex={1} isRequired>
                      <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                        رقم العينة <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                      </FormLabel>
                      <Input
                        value={sample.number}
                        onChange={(e) => updateSample(index, 'number', e.target.value)}
                        placeholder="أدخل رقم العينة"
                        size="md"
                        borderRadius="md"
                      />
                    </FormControl>
                  </Flex>
                </Box>
              ))}
            </Box>
          )}

          {samples.length === 0 && sampleCount && parseInt(sampleCount) === 0 && (
            <Box textAlign="center" py={8} color="gray.500" bg="gray.50" borderRadius="lg" border="1px" borderColor="gray.200">
              لا توجد عينات مضافة. أدخل عدد العينات لإضافتها.
            </Box>
          )}
        </>
      )}

      {/* Show message when no samples */}
      {formData.hasSamples === 'لا' && (
        <Box textAlign="center" py={8} color="gray.600" bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
          <Text fontSize="lg" fontWeight="semibold">لم يتم سحب عينات في هذه الزيارة</Text>
        </Box>
      )}
    </Box>
  );
}
