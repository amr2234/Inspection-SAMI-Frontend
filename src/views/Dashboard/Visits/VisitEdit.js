import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Center,
  HStack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import { FormField } from 'components/FormField';
import visitService from 'services/visitService';

export default function VisitEdit() {
  const { id } = useParams();
  const history = useHistory();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    violationType: '',
    establishmentName: '',
    establishmentCode: '',
    branch: '',
    establishmentType: '',
    activityType: '',
    activityCategory: '',
    region: '',
    city: '',
    establishmentStatus: '',
    dataUpdated: '',
    complianceStatus: '',
    visitCategory: '',
    addedToDatabase: '',
    sector: '',
    visitDateTime: '',
  });

  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    fetchVisitDetails();
  }, [id]);

  const fetchVisitDetails = async () => {
    setLoading(true);
    try {
      const data = await visitService.getVisitById(id);
      // Map API data to form data
      setFormData({
        violationType: data.violationType || '',
        establishmentName: data.establishmentName || '',
        establishmentCode: data.establishmentCode || '',
        branch: data.branch || '',
        establishmentType: data.establishmentType || '',
        activityType: data.activityType || '',
        activityCategory: data.activityCategory || '',
        region: data.region || '',
        city: data.city || '',
        establishmentStatus: data.establishmentStatus || '',
        dataUpdated: data.dataUpdated || '',
        complianceStatus: data.complianceStatus || '',
        visitCategory: data.visitCategory || '',
        addedToDatabase: data.addedToDatabase || '',
        sector: data.sector || '',
        visitDateTime: data.dateTime?.slice(0, 16) || '',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
      history.push('/admin/visits');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await visitService.updateVisit(id, formData);
      toast({
        title: 'تم التحديث',
        description: 'تم تحديث الزيارة بنجاح',
        status: 'success',
        duration: 3000,
      });
      history.push(`/admin/visits/${id}`);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    history.push(`/admin/visits/${id}`);
  };

  if (loading) {
    return (
      <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }} w="100%">
        <Center py={20}>
          <Spinner size="xl" color="#224D59" />
        </Center>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }} w="100%">
      {/* Header */}
      <Flex mb="24px" justify="space-between" align="center" w="100%">
        <HStack spacing={3}>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            onClick={handleCancel}
            isDisabled={saving}
          >
            العودة
          </Button>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              تعديل الزيارة التفتيشية
            </Text>
            <Text fontSize="sm" color="gray.500">
              رقم الزيارة: {id}
            </Text>
          </Box>
        </HStack>
        <HStack spacing={3}>
          <Button variant="outline" onClick={handleCancel} isDisabled={saving}>
            إلغاء
          </Button>
          <Button
            bg="#224D59"
            color="white"
            _hover={{ bg: '#1a3d47' }}
            onClick={handleSubmit}
            isLoading={saving}
            loadingText="جاري الحفظ..."
          >
            حفظ التغييرات
          </Button>
        </HStack>
      </Flex>

      <VStack spacing={6} align="stretch" w="100%">
        {/* معلومات الزيارة التفتيشية */}
        <Card>
          <CardHeader p="20px">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              معلومات الزيارة التفتيشية
            </Text>
          </CardHeader>
          <CardBody px={6} py={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormField
                label="نوع المخالفة"
                name="violationType"
                value={formData.violationType}
                onChange={(value) => updateFormData('violationType', value)}
                type="select"
                options={['مخالفة إدارية', 'مخالفة فنية', 'مخالفة بيئية']}
                required
              />
              
              <FormField
                label="اسم المنشأة"
                name="establishmentName"
                value={formData.establishmentName}
                onChange={(value) => updateFormData('establishmentName', value)}
                type="text"
                required
              />
              
              <FormField
                label="كود المنشأة"
                name="establishmentCode"
                value={formData.establishmentCode}
                onChange={(value) => updateFormData('establishmentCode', value)}
                type="select"
                options={['F-001', 'F-002', 'F-003', 'F-004', 'F-005']}
                required
              />
              
              <FormField
                label="الفرع"
                name="branch"
                value={formData.branch}
                onChange={(value) => updateFormData('branch', value)}
                type="select"
                options={['الفرع الرئيسي', 'الفرع الشمالي', 'الفرع الجنوبي', 'الفرع الشرقي', 'الفرع الغربي']}
                required
              />
              
              <FormField
                label="نوع المنشأة"
                name="establishmentType"
                value={formData.establishmentType}
                onChange={(value) => updateFormData('establishmentType', value)}
                type="select"
                options={['مصنع', 'مستودع', 'محل تجاري', 'مكتب', 'ورشة']}
                required
              />
              
              <FormField
                label="نوع النشاط"
                name="activityType"
                value={formData.activityType}
                onChange={(value) => updateFormData('activityType', value)}
                type="select"
                options={['صناعي', 'تجاري', 'خدمي', 'زراعي', 'صحي']}
                required
              />
              
              <FormField
                label="فئة النشاط"
                name="activityCategory"
                value={formData.activityCategory}
                onChange={(value) => updateFormData('activityCategory', value)}
                type="select"
                options={['الفئة الأولى', 'الفئة الثانية', 'الفئة الثالثة', 'الفئة الرابعة']}
                required
              />
              
              <FormField
                label="المنطقة"
                name="region"
                value={formData.region}
                onChange={(value) => updateFormData('region', value)}
                type="select"
                options={['الرياض', 'مكة المكرمة', 'المدينة المنورة', 'الشرقية', 'عسير', 'جازان', 'تبوك']}
                required
              />
              
              <FormField
                label="المدينة"
                name="city"
                value={formData.city}
                onChange={(value) => updateFormData('city', value)}
                type="select"
                options={['الرياض', 'جدة', 'مكة', 'المدينة', 'الدمام', 'أبها', 'تبوك']}
                required
              />
              
              <FormField
                label="حالة المنشأة"
                name="establishmentStatus"
                value={formData.establishmentStatus}
                onChange={(value) => updateFormData('establishmentStatus', value)}
                type="select"
                options={['نشطة', 'متوقفة مؤقتاً', 'متوقفة نهائياً', 'تحت الإنشاء']}
                required
              />
              
              <FormField
                label="هل تم تحديث بيانات المنشأة؟"
                name="dataUpdated"
                value={formData.dataUpdated}
                onChange={(value) => updateFormData('dataUpdated', value)}
                type="select"
                options={['نعم', 'لا']}
                required
              />
              
              <FormField
                label="حالة الالتزام"
                name="complianceStatus"
                value={formData.complianceStatus}
                onChange={(value) => updateFormData('complianceStatus', value)}
                type="select"
                options={['ملتزم', 'غير ملتزم', 'ملتزم جزئياً']}
                required
              />
              
              <FormField
                label="نوع الزيارة (مجدولة / معاودة / بلاغ)"
                name="visitCategory"
                value={formData.visitCategory}
                onChange={(value) => updateFormData('visitCategory', value)}
                type="select"
                options={['مجدولة', 'معاودة', 'بلاغ']}
                required
              />
              
              <FormField
                label="هل قمت بإضافة المنشأة لقاعدة البيانات؟"
                name="addedToDatabase"
                value={formData.addedToDatabase}
                onChange={(value) => updateFormData('addedToDatabase', value)}
                type="select"
                options={['نعم', 'لا']}
                required
              />
              
              <FormField
                label="القطاع"
                name="sector"
                value={formData.sector}
                onChange={(value) => updateFormData('sector', value)}
                type="select"
                options={['القطاع الحكومي', 'القطاع الخاص', 'القطاع المختلط']}
                required
              />
              
              <FormField
                label="تاريخ ووقت الزيارة"
                name="visitDateTime"
                value={formData.visitDateTime}
                onChange={(value) => updateFormData('visitDateTime', value)}
                type="datetime-local"
                required
              />
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Flex>
  );
}
