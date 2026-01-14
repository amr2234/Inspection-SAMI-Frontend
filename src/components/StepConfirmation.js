import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export function StepConfirmation({ formData }) {
  const renderField = (label, value) => {
    if (value === null || value === undefined || value === '') return null;
    
    return (
      <Flex justify="space-between" py={2} borderBottom="1px" borderColor="gray.100">
        <Text color="gray.600" fontWeight="medium">{label}:</Text>
        <Text color="gray.900">{value}</Text>
      </Flex>
    );
  };

  return (
    <Box>
      <Box textAlign="center" mb={8}>
        <Flex justify="center" mb={4}>
          <CheckCircleIcon w="64px" h="64px" color="green.600" />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>مراجعة البيانات</Text>
        <Text color="gray.600">يرجى مراجعة جميع البيانات المدخلة قبل الإرسال النهائي</Text>
      </Box>

      {/* Step 1 Summary */}
      <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" mb={6}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottom="2px" borderColor="green.600">
          معلومات الزيارة
        </Text>
        <Box>
          {renderField('نوع المخالفة', formData.violationType)}
          {renderField('اسم المنشأة', formData.facilityName)}
          {renderField('كود المنشأة', formData.facilityCode)}
          {renderField('الفرع', formData.branch)}
          {renderField('نوع المنشأة', formData.facilityType)}
          {renderField('نوع النشاط', formData.activityType)}
          {renderField('فئة النشاط', formData.activityCategory)}
          {renderField('المنطقة', formData.region)}
          {renderField('المدينة', formData.city)}
          {renderField('حالة المنشأة', formData.facilityStatus)}
          {renderField('تحديث البيانات', formData.dataUpdated)}
          {renderField('حالة الالتزام', formData.complianceStatus)}
          {renderField('نوع الزيارة', formData.visitType)}
          {renderField('إضافة لقاعدة البيانات', formData.addedToDatabase)}
          {renderField('القطاع', formData.sector)}
          {renderField('تاريخ ووقت الزيارة', formData.visitDateTime ? new Date(formData.visitDateTime).toLocaleString('ar-SA') : '')}
        </Box>
      </Box>

      {/* Step 2 Summary */}
      {formData.devices && formData.devices.length > 0 && (
        <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" mb={6}>
          <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottom="2px" borderColor="green.600">
            الأجهزة البيئية المستخدمة
          </Text>
          <Box>
            {renderField('عدد الأجهزة', formData.deviceCount)}
            {formData.devices.map((device, index) => (
              <Box key={index} mt={3} bg="gray.50" p={3} borderRadius="md">
                <Text fontWeight="semibold" color="gray.700" mb={2}>الجهاز {index + 1}:</Text>
                <Text fontSize="sm" color="gray.600">الاسم: {device.name}</Text>
                <Text fontSize="sm" color="gray.600">الرقم: {device.number}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Step 3 Summary */}
      <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" mb={6}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottom="2px" borderColor="green.600">
          تفاصيل العينات
        </Text>
        <Box>
          {renderField('سحب العينات', formData.samplesCollected)}
          {renderField('نوع العينة', formData.sampleType)}
          {renderField('موقع حفظ العينة', formData.sampleStorageLocation)}
          {renderField('رقم العينة', formData.sampleNumber)}
          {renderField('نتيجة العينة', formData.sampleResult)}
          {renderField('إجمالي العينات', formData.totalSamples)}
        </Box>
      </Box>

      {/* Step 4 Summary */}
      <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" mb={6}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottom="2px" borderColor="green.600">
          المخالفات والإجراءات
        </Text>
        <Box>
          {renderField('المخالفة رقم 2 - نوع', formData.violation2Type)}
          {renderField('اللائحة التنفيذية - رقم 1', formData.regulation1)}
          {renderField('اللائحة التنفيذية - رقم 2', formData.regulation2)}
        </Box>
      </Box>

      {/* Step 5 Summary */}
      <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" mb={6}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottom="2px" borderColor="green.600">
          الغرامات المالية
        </Text>
        <Box>
          {renderField('قيمة المخالفة رقم 1', formData.fine1 ? `${formData.fine1} ر.س` : '')}
          {renderField('قيمة المخالفة رقم 2', formData.fine2 ? `${formData.fine2} ر.س` : '')}
          <Flex justify="space-between" py={3} mt={3} bg="green.50" px={3} borderRadius="md" fontWeight="bold" fontSize="lg" borderTop="2px" borderColor="green.600">
            <Text color="gray.800">إجمالي الغرامات:</Text>
            <Text color="green.700">
              {(parseFloat(formData.fine1 || 0) + parseFloat(formData.fine2 || 0)).toFixed(2)} ر.س
            </Text>
          </Flex>
        </Box>
      </Box>

      {/* Step 6 Summary */}
      <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white">
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottom="2px" borderColor="green.600">
          معلومات المفتشين
        </Text>
        <Box>
          {renderField('المفتش الرئيسي', formData.mainInspectorName)}
          {renderField('المسمى الوظيفي للمفتش الرئيسي', formData.mainInspectorTitle)}
          {renderField('المفتش المساعد', formData.assistantInspectorName)}
          {renderField('المسمى الوظيفي للمفتش المساعد', formData.assistantInspectorTitle)}
        </Box>
      </Box>
    </Box>
  );
}
