import React from 'react';
import { FormField } from './FormField';
import { Box, Text, SimpleGrid, VStack, Input, FormControl, FormLabel, Image, Button, Flex, useColorModeValue, Icon } from '@chakra-ui/react';
import { CloseIcon, AttachmentIcon } from '@chakra-ui/icons';

// Branch -> Regions -> Cities mapping
const branchData = {
  'الفرع الرئيسي': {
    'الرياض': ['الرياض', 'الخرج', 'الدرعية', 'المجمعة'],
    'الشرقية': ['الدمام', 'الخبر', 'الجبيل', 'القطيف', 'الأحساء']
  },
  'الفرع الشمالي': {
    'تبوك': ['تبوك', 'ضباء', 'الوجه', 'أملج'],
    'الجوف': ['سكاكا', 'دومة الجندل', 'القريات'],
    'الحدود الشمالية': ['عرعر', 'رفحاء', 'طريف']
  },
  'الفرع الجنوبي': {
    'عسير': ['أبها', 'خميس مشيط', 'بيشة', 'النماص'],
    'جازان': ['جازان', 'صبيا', 'أبو عريش', 'صامطة'],
    'نجران': ['نجران', 'شرورة', 'حبونا']
  },
  'الفرع الشرقي': {
    'الشرقية': ['الدمام', 'الخبر', 'الظهران', 'الجبيل', 'القطيف', 'الأحساء', 'حفر الباطن']
  },
  'الفرع الغربي': {
    'مكة المكرمة': ['مكة', 'جدة', 'الطائف', 'رابغ', 'القنفذة'],
    'المدينة المنورة': ['المدينة', 'ينبع', 'العلا', 'بدر']
  }
};

export function Step1({ formData, updateFormData, validationErrors = {} }) {
  // Get available regions based on selected branch
  const getRegionsForBranch = () => {
    if (!formData.branch) return [];
    return Object.keys(branchData[formData.branch] || {});
  };

  // Get available cities based on selected region
  const getCitiesForRegion = () => {
    if (!formData.branch || !formData.region) return [];
    return branchData[formData.branch]?.[formData.region] || [];
  };

  // Handle branch change - reset region and city
  const handleBranchChange = (value) => {
    updateFormData('branch', value);
    updateFormData('region', '');
    updateFormData('city', '');
  };

  // Handle region change - reset city
  const handleRegionChange = (value) => {
    updateFormData('region', value);
    updateFormData('city', '');
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('يرجى اختيار صورة بصيغة JPG، PNG، أو WEBP');
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('حجم الصورة يجب أن يكون أقل من 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData('inspectionImage', reader.result);
        updateFormData('inspectionImageFile', file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    updateFormData('inspectionImage', '');
    updateFormData('inspectionImageFile', null);
  };

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const errorBorderColor = useColorModeValue('red.500', 'red.400');
  const errorBgColor = useColorModeValue('red.50', 'red.900');
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>معلومات الزيارة</Text>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormField
          label="اسم المنشأة"
          name="facilityName"
          value={formData.facilityName || ''}
          onChange={(value) => updateFormData('facilityName', value)}
          type="text"
          required
          error={!!validationErrors.facilityName}
          errorMessage={validationErrors.facilityName}
        />
        
        <FormField
          label="كود المنشأة"
          name="facilityCode"
          value={formData.facilityCode || ''}
          onChange={(value) => {
            updateFormData('facilityCode', value);
            // Clear custom code if switching back to predefined codes
            if (value !== 'الكود غير موجود') {
              updateFormData('customFacilityCode', '');
            }
          }}
          type="select"
          options={['الكود غير موجود', 'F-001', 'F-002', 'F-003', 'F-004', 'F-005']}
          required
          error={!!validationErrors.facilityCode}
          errorMessage={validationErrors.facilityCode}
        />
        
        {/* Show custom code input when "الكود غير موجود" is selected */}
        {formData.facilityCode === 'الكود غير موجود' && (
          <FormField
            label="أدخل كود المنشأة"
            name="customFacilityCode"
            value={formData.customFacilityCode || ''}
            onChange={(value) => updateFormData('customFacilityCode', value)}
            type="text"
            placeholder="مثال: F-999"
            required
            error={!!validationErrors.customFacilityCode}
            errorMessage={validationErrors.customFacilityCode}
          />
        )}
        
        {/* Cascading Location Fields - Vertical Stack */}
        <Box gridColumn={{ base: '1', md: 'span 2' }}>
          <VStack spacing={6} align="stretch">
            <FormField
              label="الفرع"
              name="branch"
              value={formData.branch || ''}
              onChange={handleBranchChange}
              type="select"
              options={['الفرع الرئيسي', 'الفرع الشمالي', 'الفرع الجنوبي', 'الفرع الشرقي', 'الفرع الغربي']}
              required
              error={!!validationErrors.branch}
              errorMessage={validationErrors.branch}
            />
            
            <FormField
              label="المنطقة"
              name="region"
              value={formData.region || ''}
              onChange={handleRegionChange}
              type="select"
              options={getRegionsForBranch()}
              required
              disabled={!formData.branch}
              error={!!validationErrors.region}
              errorMessage={validationErrors.region}
            />
            
            <FormField
              label="المدينة"
              name="city"
              value={formData.city || ''}
              onChange={(value) => updateFormData('city', value)}
              type="select"
              options={getCitiesForRegion()}
              required
              disabled={!formData.region}
              error={!!validationErrors.city}
              errorMessage={validationErrors.city}
            />
          </VStack>
        </Box>
        
        <FormField
          label="نوع المنشأة"
          name="facilityType"
          value={formData.facilityType || ''}
          onChange={(value) => updateFormData('facilityType', value)}
          type="select"
          options={['مصنع', 'مستودع', 'محل تجاري', 'مكتب', 'ورشة']}
          required
          error={!!validationErrors.facilityType}
          errorMessage={validationErrors.facilityType}
        />
        
        <FormField
          label="نوع النشاط"
          name="activityType"
          value={formData.activityType || ''}
          onChange={(value) => updateFormData('activityType', value)}
          type="select"
          options={['صناعي', 'تجاري', 'خدمي', 'زراعي', 'صحي']}
          required
          error={!!validationErrors.activityType}
          errorMessage={validationErrors.activityType}
        />
        
        <FormField
          label="فئة النشاط"
          name="activityCategory"
          value={formData.activityCategory || ''}
          onChange={(value) => updateFormData('activityCategory', value)}
          type="select"
          options={['الفئة الأولى', 'الفئة الثانية', 'الفئة الثالثة', 'الفئة الرابعة']}
          required
          error={!!validationErrors.activityCategory}
          errorMessage={validationErrors.activityCategory}
        />
        
        <FormField
          label="حالة المنشأة"
          name="facilityStatus"
          value={formData.facilityStatus || ''}
          onChange={(value) => updateFormData('facilityStatus', value)}
          type="select"
          options={['نشطة', 'متوقفة مؤقتاً', 'متوقفة نهائياً', 'تحت الإنشاء']}
          required
          error={!!validationErrors.facilityStatus}
          errorMessage={validationErrors.facilityStatus}
        />
        
        <FormField
          label="هل تم تحديث بيانات المنشأة؟"
          name="dataUpdated"
          value={formData.dataUpdated || ''}
          onChange={(value) => updateFormData('dataUpdated', value)}
          type="select"
          options={['نعم', 'لا']}
          required
          error={!!validationErrors.dataUpdated}
          errorMessage={validationErrors.dataUpdated}
        />
        
        <FormField
          label="حالة الالتزام"
          name="complianceStatus"
          value={formData.complianceStatus || ''}
          onChange={(value) => updateFormData('complianceStatus', value)}
          type="select"
          options={['ملتزم', 'غير ملتزم', 'ملتزم جزئياً']}
          required
          error={!!validationErrors.complianceStatus}
          errorMessage={validationErrors.complianceStatus}
        />
        
        <FormField
          label="نوع الزيارة (مجدولة / معاودة / بلاغ)"
          name="visitCategory"
          value={formData.visitCategory || ''}
          onChange={(value) => updateFormData('visitCategory', value)}
          type="select"
          options={['مجدولة', 'معاودة', 'بلاغ']}
          required
          error={!!validationErrors.visitCategory}
          errorMessage={validationErrors.visitCategory}
        />
        
        <FormField
          label="هل قمت بإضافة المنشأة لقاعدة البيانات؟"
          name="addedToDatabase"
          value={formData.addedToDatabase || ''}
          onChange={(value) => updateFormData('addedToDatabase', value)}
          type="select"
          options={['نعم', 'لا']}
          required
          error={!!validationErrors.addedToDatabase}
          errorMessage={validationErrors.addedToDatabase}
        />
        
        <FormField
          label="القطاع"
          name="sector"
          value={formData.sector || ''}
          onChange={(value) => updateFormData('sector', value)}
          type="select"
          options={['القطاع الحكومي', 'القطاع الخاص', 'القطاع المختلط']}
          required
          error={!!validationErrors.sector}
          errorMessage={validationErrors.sector}
        />
        
        <FormField
          label="تاريخ ووقت الزيارة"
          name="visitDateTime"
          value={formData.visitDateTime || new Date().toISOString().slice(0, 16)}
          onChange={(value) => updateFormData('visitDateTime', value)}
          type="datetime-local"
          disabled
        />
      </SimpleGrid>

      {/* Image Upload Section */}
      <Box mt={8} p={6} bg="gray.50" borderRadius="lg" borderWidth="2px" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>
          صورة الزيارة التفتيشية
        </Text>
        
        <FormControl 
          isRequired 
          isInvalid={!!validationErrors.inspectionImage}
        >
          <FormLabel fontSize="sm" fontWeight="medium" color={validationErrors.inspectionImage ? 'red.500' : 'gray.700'}>
            صورة الزيارة التفتيشية <span style={{ color: 'red', marginRight: '4px' }}>*</span>
            {validationErrors.inspectionImage && (
              <Text as="span" fontSize="xs" color="red.500" mr={2} fontWeight="normal">
                ({validationErrors.inspectionImage})
              </Text>
            )}
          </FormLabel>
          
          {!formData.inspectionImage ? (
            <Box
              border="2px dashed"
              borderColor={validationErrors.inspectionImage ? errorBorderColor : borderColor}
              bg={validationErrors.inspectionImage ? errorBgColor : 'white'}
              borderRadius="lg"
              p={8}
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
              onClick={() => document.getElementById('imageUpload').click()}
              animation={validationErrors.inspectionImage ? "shake 0.3s" : "none"}
              sx={{
                '@keyframes shake': {
                  '0%, 100%': { transform: 'translateX(0)' },
                  '25%': { transform: 'translateX(-5px)' },
                  '75%': { transform: 'translateX(5px)' },
                },
              }}
            >
              <Icon as={AttachmentIcon} boxSize={12} color="gray.400" mb={4} />
              <Text fontSize="md" color="gray.600" mb={2}>
                اضغط لاختيار الصورة
              </Text>
              <Text fontSize="sm" color="gray.500">
                JPG، PNG، WEBP (أقصى حجم: 5MB)
              </Text>
              <Input
                id="imageUpload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageUpload}
                display="none"
              />
            </Box>
          ) : (
            <Box
              border="2px solid"
              borderColor="green.400"
              borderRadius="lg"
              p={4}
              bg="white"
              position="relative"
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="sm" fontWeight="semibold" color="green.600">
                  ✓ تم رفع الصورة بنجاح
                </Text>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={handleRemoveImage}
                  leftIcon={<CloseIcon w={2} h={2} />}
                >
                  حذف
                </Button>
              </Flex>
              <Box
                borderRadius="md"
                overflow="hidden"
                maxH="400px"
                display="flex"
                justifyContent="center"
                bg="gray.100"
              >
                <Image
                  src={formData.inspectionImage}
                  alt="Inspection Image"
                  objectFit="contain"
                  maxH="400px"
                />
              </Box>
            </Box>
          )}
        </FormControl>
      </Box>

      {/* Violation Section */}
      <Box mt={8} p={6} bg="gray.50" borderRadius="lg" borderWidth="2px" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>
          معلومات المخالفة
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormField
            label="هل يوجد مخالفة؟"
            name="hasViolation"
            value={formData.hasViolation || ''}
            onChange={(value) => {
              updateFormData('hasViolation', value);
              // Reset violation type if "لا" is selected
              if (value === 'لا') {
                updateFormData('violationType', '');
              }
            }}
            type="select"
            options={['نعم', 'لا']}
            required
            error={!!validationErrors.hasViolation}
            errorMessage={validationErrors.hasViolation}
          />
          
          {formData.hasViolation === 'نعم' && (
            <FormField
              label="نوع المخالفة"
              name="violationType"
              value={formData.violationType || ''}
              onChange={(value) => updateFormData('violationType', value)}
              type="select"
              options={['مخالفة إدارية', 'مخالفة فنية', 'مخالفة بيئية']}
              required
              error={!!validationErrors.violationType}
              errorMessage={validationErrors.violationType}
            />
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
