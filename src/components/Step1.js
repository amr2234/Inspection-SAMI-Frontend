import React from 'react';
import { FormField } from './FormField';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

export function Step1({ formData, updateFormData }) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={6}>معلومات الزيارة</Text>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormField
          label="نوع المخالفة"
          name="violationType"
          value={formData.violationType || ''}
          onChange={(value) => updateFormData('violationType', value)}
          type="select"
          options={['مخالفة إدارية', 'مخالفة فنية', 'مخالفة بيئية']}
          required
        />
        
        <FormField
          label="اسم المنشأة"
          name="facilityName"
          value={formData.facilityName || ''}
          onChange={(value) => updateFormData('facilityName', value)}
          type="text"
          required
        />
        
        <FormField
          label="كود المنشأة"
          name="facilityCode"
          value={formData.facilityCode || ''}
          onChange={(value) => updateFormData('facilityCode', value)}
          type="select"
          options={['F-001', 'F-002', 'F-003', 'F-004', 'F-005']}
          required
        />
        
        <FormField
          label="الفرع"
          name="branch"
          value={formData.branch || ''}
          onChange={(value) => updateFormData('branch', value)}
          type="select"
          options={['الفرع الرئيسي', 'الفرع الشمالي', 'الفرع الجنوبي', 'الفرع الشرقي', 'الفرع الغربي']}
          required
        />
        
        <FormField
          label="نوع المنشأة"
          name="facilityType"
          value={formData.facilityType || ''}
          onChange={(value) => updateFormData('facilityType', value)}
          type="select"
          options={['مصنع', 'مستودع', 'محل تجاري', 'مكتب', 'ورشة']}
          required
        />
        
        <FormField
          label="نوع النشاط"
          name="activityType"
          value={formData.activityType || ''}
          onChange={(value) => updateFormData('activityType', value)}
          type="select"
          options={['صناعي', 'تجاري', 'خدمي', 'زراعي', 'صحي']}
          required
        />
        
        <FormField
          label="فئة النشاط"
          name="activityCategory"
          value={formData.activityCategory || ''}
          onChange={(value) => updateFormData('activityCategory', value)}
          type="select"
          options={['الفئة الأولى', 'الفئة الثانية', 'الفئة الثالثة', 'الفئة الرابعة']}
          required
        />
        
        <FormField
          label="المنطقة"
          name="region"
          value={formData.region || ''}
          onChange={(value) => updateFormData('region', value)}
          type="select"
          options={['الرياض', 'مكة المكرمة', 'المدينة المنورة', 'الشرقية', 'عسير', 'جازان', 'تبوك']}
          required
        />
        
        <FormField
          label="المدينة"
          name="city"
          value={formData.city || ''}
          onChange={(value) => updateFormData('city', value)}
          type="select"
          options={['الرياض', 'جدة', 'مكة', 'المدينة', 'الدمام', 'أبها', 'تبوك']}
          required
        />
        
        <FormField
          label="حالة المنشأة"
          name="facilityStatus"
          value={formData.facilityStatus || ''}
          onChange={(value) => updateFormData('facilityStatus', value)}
          type="select"
          options={['نشطة', 'متوقفة مؤقتاً', 'متوقفة نهائياً', 'تحت الإنشاء']}
          required
        />
        
        <FormField
          label="هل تم تحديث بيانات المنشأة؟"
          name="dataUpdated"
          value={formData.dataUpdated || ''}
          onChange={(value) => updateFormData('dataUpdated', value)}
          type="select"
          options={['نعم', 'لا']}
          required
        />
        
        <FormField
          label="حالة الالتزام"
          name="complianceStatus"
          value={formData.complianceStatus || ''}
          onChange={(value) => updateFormData('complianceStatus', value)}
          type="select"
          options={['ملتزم', 'غير ملتزم', 'ملتزم جزئياً']}
          required
        />
        
        <FormField
          label="نوع الزيارة"
          name="visitType"
          value={formData.visitType || ''}
          onChange={(value) => updateFormData('visitType', value)}
          type="select"
          options={['زيارة دورية', 'زيارة طارئة', 'زيارة متابعة', 'زيارة استقصائية']}
          required
        />
        
        <FormField
          label="هل قمت بإضافة المنشأة لقاعدة البيانات؟"
          name="addedToDatabase"
          value={formData.addedToDatabase || ''}
          onChange={(value) => updateFormData('addedToDatabase', value)}
          type="select"
          options={['نعم', 'لا']}
          required
        />
        
        <FormField
          label="القطاع"
          name="sector"
          value={formData.sector || ''}
          onChange={(value) => updateFormData('sector', value)}
          type="select"
          options={['القطاع الحكومي', 'القطاع الخاص', 'القطاع المختلط']}
          required
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
    </Box>
  );
}
