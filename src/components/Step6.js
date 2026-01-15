import React, { useEffect } from 'react';
import { FormField } from './FormField';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

export function Step6({ formData, updateFormData, validationErrors = {} }) {
  // Mock logged-in user data - Replace with actual auth context
  const loggedInUser = {
    name: 'أحمد محمد علي', // Replace with actual user from auth
    title: 'مفتش أول', // Replace with actual title
  };

  // Mock list of users for assistant inspector - Replace with actual API call
  const availableInspectors = [
    'محمد أحمد السعيد',
    'فاطمة عبدالله القحطاني',
    'خالد محمد العتيبي',
    'سارة علي الحربي',
    'عبدالرحمن فيصل الدوسري',
  ];

  // Auto-fill main inspector on component mount
  useEffect(() => {
    if (!formData.mainInspectorName) {
      updateFormData('mainInspectorName', loggedInUser.name);
    }
    if (!formData.mainInspectorTitle) {
      updateFormData('mainInspectorTitle', loggedInUser.title);
    }
  }, []);
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>معلومات المفتشين</Text>
      
      <Box>
        {/* Main Inspector - Auto-filled from login */}
        <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="blue.50" mb={8}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={2}>المفتش الرئيسي</Text>
          <Text fontSize="sm" color="gray.500" mb={4}>(تم التعبئة تلقائياً من بيانات تسجيل الدخول)</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormField
              label="اسم المفتش الرئيسي"
              name="mainInspectorName"
              value={formData.mainInspectorName || ''}
              onChange={(value) => updateFormData('mainInspectorName', value)}
              type="text"
              placeholder="أدخل اسم المفتش الرئيسي"
              required
              disabled={true}
              error={!!validationErrors.mainInspectorName}
              errorMessage={validationErrors.mainInspectorName}
            />
            
            <FormField
              label="المسمى الوظيفي"
              name="mainInspectorTitle"
              value={formData.mainInspectorTitle || ''}
              onChange={(value) => updateFormData('mainInspectorTitle', value)}
              type="text"
              placeholder="أدخل المسمى الوظيفي"
              required
              disabled={true}
              error={!!validationErrors.mainInspectorTitle}
              errorMessage={validationErrors.mainInspectorTitle}
            />
          </SimpleGrid>
        </Box>

        {/* Assistant Inspector Question */}
        <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="gray.50">
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>المفتش المساعد</Text>
          
          <FormField
            label="هل يوجد مفتش مساعد؟"
            name="hasAssistantInspector"
            value={formData.hasAssistantInspector || ''}
            onChange={(value) => {
              updateFormData('hasAssistantInspector', value);
              // Clear assistant inspector data if "لا" is selected
              if (value === 'لا') {
                updateFormData('assistantInspectorName', '');
              }
            }}
            type="select"
            options={['نعم', 'لا']}
            required
            error={!!validationErrors.hasAssistantInspector}
            errorMessage={validationErrors.hasAssistantInspector}
          />
          
          {/* Show assistant inspector dropdown if "نعم" */}
          {formData.hasAssistantInspector === 'نعم' && (
            <Box mt={6}>
              <FormField
                label="اختر المفتش المساعد"
                name="assistantInspectorName"
                value={formData.assistantInspectorName || ''}
                onChange={(value) => updateFormData('assistantInspectorName', value)}
                type="select"
                options={availableInspectors}
                placeholder="اختر من قائمة المفتشين"
                required
                error={!!validationErrors.assistantInspectorName}
                errorMessage={validationErrors.assistantInspectorName}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
