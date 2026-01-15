import React from 'react';
import { FormField } from './FormField';
import { Box, Button, Flex, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

export function Step2({ formData, updateFormData, validationErrors = {} }) {
  const devices = formData.devices || [];
  const deviceCount = formData.deviceCount || '';

  const handleDeviceCountChange = (value) => {
    const count = parseInt(value) || 0;
    updateFormData('deviceCount', value);
    
    // Adjust devices array based on count
    const currentDevices = [...devices];
    if (count > currentDevices.length) {
      const newDevices = Array(count - currentDevices.length).fill(null).map(() => ({
        name: '',
        number: ''
      }));
      updateFormData('devices', [...currentDevices, ...newDevices]);
    } else if (count < currentDevices.length) {
      updateFormData('devices', currentDevices.slice(0, count));
    }
  };

  const updateDevice = (index, field, value) => {
    const updatedDevices = [...devices];
    updatedDevices[index] = { ...updatedDevices[index], [field]: value };
    updateFormData('devices', updatedDevices);
  };

  const addDevice = () => {
    updateFormData('devices', [...devices, { name: '', number: '' }]);
    updateFormData('deviceCount', (devices.length + 1).toString());
  };

  const removeDevice = (index) => {
    const updatedDevices = devices.filter((_, i) => i !== index);
    updateFormData('devices', updatedDevices);
    updateFormData('deviceCount', updatedDevices.length.toString());
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>الأجهزة البيئية المستخدمة</Text>
      
      {/* Question: Are there environmental devices? */}
      <Box maxW="md" mb={6}>
        <FormField
          label="هل تم استخدام أجهزة بيئية؟"
          name="hasDevices"
          value={formData.hasDevices || ''}
          onChange={(value) => {
            updateFormData('hasDevices', value);
            // Clear devices data if "لا" is selected
            if (value === 'لا') {
              updateFormData('deviceCount', '0');
              updateFormData('devices', []);
            }
          }}
          type="select"
          options={['نعم', 'لا']}
          required
          error={!!validationErrors.hasDevices}
          errorMessage={validationErrors.hasDevices}
        />
      </Box>

      {/* Show device fields only if "نعم" */}
      {formData.hasDevices === 'نعم' && (
        <>
          <Box maxW="md" mb={6}>
            <FormField
              label="عدد الأجهزة المستخدمة"
              name="deviceCount"
              value={deviceCount}
              onChange={handleDeviceCountChange}
              type="number"
              required
              error={!!validationErrors.deviceCount}
              errorMessage={validationErrors.deviceCount}
            />
          </Box>

          {devices.length > 0 && (
            <Box mt={6}>
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="semibold" color="gray.700">قائمة الأجهزة</Text>
                <Button
                  onClick={addDevice}
                  variant="outline"
                  size="sm"
                  leftIcon={<AddIcon />}
                >
                  إضافة جهاز
                </Button>
              </Flex>

              {devices.map((device, index) => (
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
                    <Text fontWeight="semibold" color="gray.700">الجهاز {index + 1}</Text>
                    {devices.length > 1 && (
                      <Button
                        onClick={() => removeDevice(index)}
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
                        اسم الجهاز <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                      </FormLabel>
                      <Input
                        value={device.name}
                        onChange={(e) => updateDevice(index, 'name', e.target.value)}
                        placeholder="أدخل اسم الجهاز"
                        size="md"
                        borderRadius="md"
                      />
                    </FormControl>

                    <FormControl flex={1} isRequired>
                      <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                        رقم الجهاز <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                      </FormLabel>
                      <Input
                        value={device.number}
                        onChange={(e) => updateDevice(index, 'number', e.target.value)}
                        placeholder="أدخل رقم الجهاز"
                        size="md"
                        borderRadius="md"
                      />
                    </FormControl>
                  </Flex>
                </Box>
              ))}
            </Box>
          )}

          {devices.length === 0 && deviceCount && parseInt(deviceCount) === 0 && (
            <Box textAlign="center" py={8} color="gray.500" bg="gray.50" borderRadius="lg" border="1px" borderColor="gray.200">
              لا توجد أجهزة مضافة. أدخل عدد الأجهزة لإضافتها.
            </Box>
          )}
        </>
      )}

      {/* Show message when no devices */}
      {formData.hasDevices === 'لا' && (
        <Box textAlign="center" py={8} color="gray.600" bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
          <Text fontSize="lg" fontWeight="semibold">لم يتم استخدام أجهزة بيئية في هذه الزيارة</Text>
        </Box>
      )}
    </Box>
  );
}
