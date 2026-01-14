import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Center,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import visitService from 'services/visitService';

export default function VisitEdit() {
  const { id } = useParams();
  const history = useHistory();
  const toast = useToast();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const currentUserRole = 'Inspector'; // Mock - replace with actual auth context

  useEffect(() => {
    fetchVisitDetails();
  }, [id]);

  const fetchVisitDetails = async () => {
    setLoading(true);
    try {
      const data = await visitService.getVisitById(id);
      
      // Check if user can edit
      if (currentUserRole !== 'SystemAdmin' && (!data.canEdit || data.isArchived)) {
        toast({
          title: 'غير مصرح',
          description: 'ليس لديك صلاحية لتعديل هذه الزيارة',
          status: 'error',
          duration: 5000,
        });
        history.push(`/admin/visits/${id}`);
        return;
      }

      setVisit(data);
      setFormData({
        dateTime: data.dateTime.slice(0, 16), // Format for datetime-local input
        establishmentName: data.establishmentName,
        establishmentCode: data.establishmentCode,
        branch: data.branch,
        region: data.region,
        city: data.city,
        sector: data.sector,
        visitType: data.visitType,
        complianceStatus: data.complianceStatus,
        violationsCount: data.violationsCount,
        samplesCount: data.samplesCount,
        finesTotal: data.finesTotal,
        notes: data.notes || '',
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

  const handleChange = (field, value) => {
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

  if (!visit) {
    return (
      <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }} w="100%">
        <Center py={20}>
          <Text color="gray.500">الزيارة غير موجودة</Text>
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
          >
            العودة
          </Button>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            تعديل الزيارة - {visit.id}
          </Text>
        </HStack>
      </Flex>

      {/* Edit Form */}
      <Card mb="24px" w="100%">
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">معلومات الزيارة</Text>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Date and Time */}
            <FormControl isRequired>
              <FormLabel>تاريخ ووقت الزيارة</FormLabel>
              <Input
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => handleChange('dateTime', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
              />
            </FormControl>

            {/* Establishment Name */}
            <FormControl isRequired>
              <FormLabel>اسم المنشأة</FormLabel>
              <Input
                value={formData.establishmentName}
                onChange={(e) => handleChange('establishmentName', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </FormControl>

            {/* Establishment Code */}
            <FormControl isRequired>
              <FormLabel>كود المنشأة</FormLabel>
              <Input
                value={formData.establishmentCode}
                onChange={(e) => handleChange('establishmentCode', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
              />
            </FormControl>

            {/* Branch */}
            <FormControl isRequired>
              <FormLabel>الفرع</FormLabel>
              <Input
                value={formData.branch}
                onChange={(e) => handleChange('branch', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </FormControl>

            {/* Region */}
            <FormControl isRequired>
              <FormLabel>المنطقة</FormLabel>
              <Input
                value={formData.region}
                onChange={(e) => handleChange('region', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </FormControl>

            {/* City */}
            <FormControl isRequired>
              <FormLabel>المدينة</FormLabel>
              <Input
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </FormControl>

            {/* Sector */}
            <FormControl isRequired>
              <FormLabel>القطاع</FormLabel>
              <Input
                value={formData.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </FormControl>

            {/* Visit Type */}
            <FormControl isRequired>
              <FormLabel>نوع الزيارة</FormLabel>
              <Input
                value={formData.visitType}
                onChange={(e) => handleChange('visitType', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </FormControl>

            {/* Compliance Status */}
            <FormControl isRequired>
              <FormLabel>حالة الامتثال</FormLabel>
              <Select
                value={formData.complianceStatus}
                onChange={(e) => handleChange('complianceStatus', e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
              >
                <option value="Compliant">متوافق</option>
                <option value="NonCompliant">غير متوافق</option>
                <option value="UnderReview">قيد المراجعة</option>
              </Select>
            </FormControl>

            {/* Violations Count */}
            <FormControl isRequired>
              <FormLabel>عدد المخالفات</FormLabel>
              <Input
                type="number"
                min="0"
                value={formData.violationsCount}
                onChange={(e) => handleChange('violationsCount', parseInt(e.target.value) || 0)}
                bg={bgColor}
                borderColor={borderColor}
              />
            </FormControl>

            {/* Samples Count */}
            <FormControl isRequired>
              <FormLabel>عدد العينات</FormLabel>
              <Input
                type="number"
                min="0"
                value={formData.samplesCount}
                onChange={(e) => handleChange('samplesCount', parseInt(e.target.value) || 0)}
                bg={bgColor}
                borderColor={borderColor}
              />
            </FormControl>

            {/* Fines Total */}
            <FormControl isRequired>
              <FormLabel>إجمالي الغرامات (ريال)</FormLabel>
              <Input
                type="number"
                min="0"
                value={formData.finesTotal}
                onChange={(e) => handleChange('finesTotal', parseFloat(e.target.value) || 0)}
                bg={bgColor}
                borderColor={borderColor}
              />
            </FormControl>
          </SimpleGrid>

          {/* Notes */}
          <FormControl mt={6}>
            <FormLabel>ملاحظات</FormLabel>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              bg={bgColor}
              borderColor={borderColor}
              dir="rtl"
              rows={4}
              placeholder="أضف ملاحظات إضافية..."
            />
          </FormControl>

          {/* Action Buttons */}
          <Flex mt={8} gap={4} justify="flex-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              isDisabled={saving}
            >
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
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
