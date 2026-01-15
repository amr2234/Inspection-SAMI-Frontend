import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  Badge,
  SimpleGrid,
  Divider,
  HStack,
  VStack,
  useColorModeValue,
  Spinner,
  Center,
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaExclamationTriangle, FaFlask, FaMoneyBillWave, FaCog, FaUserTie } from 'react-icons/fa';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import visitService from 'services/visitService';

export default function VisitDetails() {
  const { id } = useParams();
  const history = useHistory();
  const toast = useToast();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const currentUserRole = 'Inspector'; // Mock - replace with actual auth context

  useEffect(() => {
    fetchVisitDetails();
  }, [id]);

  const fetchVisitDetails = async () => {
    setLoading(true);
    try {
      const data = await visitService.getVisitById(id);
      setVisit(data);
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

  const getComplianceStatusBadge = (status) => {
    const statusConfig = {
      Compliant: { colorScheme: 'green', label: 'متوافق' },
      NonCompliant: { colorScheme: 'red', label: 'غير متوافق' },
      UnderReview: { colorScheme: 'orange', label: 'قيد المراجعة' },
    };
    const config = statusConfig[status] || statusConfig.UnderReview;
    return <Badge colorScheme={config.colorScheme} fontSize="md" px={3} py={1}>{config.label}</Badge>;
  };

  const canEdit = () => {
    if (!visit) return false;
    if (currentUserRole === 'SystemAdmin') return true;
    return visit.canEdit && !visit.isArchived;
  };

  const handleEdit = () => {
    history.push(`/admin/visits/${id}/edit`);
  };

  const openSectionModal = (section) => {
    setSelectedSection(section);
    onOpen();
  };

  const renderModalContent = () => {
    if (!selectedSection || !visit) return null;

    switch (selectedSection) {
      case 'violations':
        return (
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
              تفاصيل المخالفات والإجراءات
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>عدد المخالفات</Text>
                <Text fontSize="lg" fontWeight="600" color="red.500">     
                  {visit.violationsCount}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>نوع المخالفة الرئيسية</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.violationType || 'مخالفة إدارية'}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>المخالفة رقم 2</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.violationType2 || 'غير محدد'}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>اللائحة التنفيذية - رقم 1</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.executiveRegulation1 || 'غير محدد'}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>اللائحة التنفيذية - رقم 2</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.executiveRegulation2 || 'غير محدد'}
                </Text>
              </Box>
            </SimpleGrid>
            <Divider my={2} />
            <Text fontSize="sm" color="gray.600">
              تم رصد {visit.violationsCount} مخالفة خلال هذه الزيارة التفتيشية
            </Text>
          </VStack>
        );

      case 'samples':
        return (
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
              تفاصيل العينات
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>إجمالي العينات</Text>
                <Text fontSize="lg" fontWeight="600" color="#224D59">
                  {visit.samplesCount}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>هل تم سحب العينات؟</Text>
                <Badge colorScheme={visit.samplesTaken === 'نعم' ? 'green' : 'gray'}>
                  {visit.samplesTaken || 'غير محدد'}
                </Badge>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>نوع العينة</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.sampleType || 'غير محدد'}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>موقع حفظ العينة</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.sampleStorageLocation || 'غير محدد'}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>رقم العينة</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.sampleNumber || 'غير محدد'}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>نتيجة العينة</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.sampleResult || 'قيد الفحص'}
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 'fines':
        return (
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
              تفاصيل الغرامات المالية
            </Text>
            <Box bg="orange.50" p={4} borderRadius="lg" borderWidth="2px" borderColor="orange.200">
              <Text fontSize="xs" color="gray.600" mb={1}>إجمالي الغرامات</Text>
              <Text fontSize="3xl" fontWeight="bold" color="orange.600">
                {visit.finesTotal.toLocaleString('ar-SA')} ريال
              </Text>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>المخالفة رقم 1</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.violation1 || 'غير محدد'}
                </Text>
                <Text fontSize="sm" color="orange.600" fontWeight="600" mt={1}>
                  القيمة المقترحة: {visit.proposedFine1?.toLocaleString('ar-SA') || '0'} ريال
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>المخالفة رقم 2</Text>
                <Text fontSize="md" fontWeight="600">
                  {visit.violation2 || 'غير محدد'}
                </Text>
                <Text fontSize="sm" color="orange.600" fontWeight="600" mt={1}>
                  القيمة المقترحة: {visit.proposedFine2?.toLocaleString('ar-SA') || '0'} ريال
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        );

      case 'devices':
        return (
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
              الأجهزة البيئية المستخدمة
            </Text>
            <Box>
              <Text fontSize="sm" color="gray.600" mb={3}>
                عدد الأجهزة: {visit.devicesCount || 0}
              </Text>
            </Box>
            {visit.devices && visit.devices.length > 0 ? (
              <VStack spacing={3} align="stretch">
                {visit.devices.map((device, index) => (
                  <Box key={index} p={4} bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                    <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>
                      الجهاز رقم {index + 1}
                    </Text>
                    <SimpleGrid columns={2} spacing={3}>
                      <Box>
                        <Text fontSize="xs" color="gray.500">اسم الجهاز</Text>
                        <Text fontSize="sm" fontWeight="600">{device.deviceName || 'غير محدد'}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="gray.500">رقم الجهاز</Text>
                        <Text fontSize="sm" fontWeight="600">{device.deviceNumber || 'غير محدد'}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text fontSize="sm" color="gray.500" textAlign="center" py={4}>
                لم يتم استخدام أجهزة بيئية في هذه الزيارة
              </Text>
            )}
          </VStack>
        );

      case 'inspectors':
        return (
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
              معلومات المفتشين
            </Text>
            <Box p={4} bg="blue.50" borderRadius="lg" borderWidth="1px" borderColor="blue.200">
              <HStack spacing={3} mb={2}>
                <Icon as={FaUserTie} color="blue.600" boxSize={5} />
                <Text fontSize="sm" fontWeight="bold" color="blue.800">المفتش الرئيسي</Text>
              </HStack>
              <Text fontSize="md" fontWeight="600" color={textColor}>
                {visit.mainInspectorName || visit.inspectorName || 'غير محدد'}
              </Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                {visit.mainInspectorTitle || 'مفتش'}
              </Text>
            </Box>
            {visit.assistantInspectorName && (
              <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <HStack spacing={3} mb={2}>
                  <Icon as={FaUserTie} color="gray.600" boxSize={5} />
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">المفتش المساعد</Text>
                </HStack>
                <Text fontSize="md" fontWeight="600" color={textColor}>
                  {visit.assistantInspectorName}
                </Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {visit.assistantInspectorTitle || 'مفتش مساعد'}
                </Text>
              </Box>
            )}
          </VStack>
        );

      default:
        return null;
    }
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
            onClick={() => history.push('/admin/visits')}
          >
            العودة
          </Button>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            تفاصيل الزيارة
          </Text>
        </HStack>
        {canEdit() && (
          <Button
            leftIcon={<EditIcon />}
            bg="#224D59"
            color="white"
            _hover={{ bg: '#1a3d47' }}
            onClick={handleEdit}
          >
            تعديل الزيارة
          </Button>
        )}
      </Flex>

      {/* Visit ID and Status */}
      <Card mb="24px" w="100%">
        <CardBody>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.500">رقم الزيارة</Text>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {visit.id}
              </Text>
            </VStack>
            <HStack spacing={3}>
              {getComplianceStatusBadge(visit.complianceStatus)}
              <Badge colorScheme={visit.isArchived ? 'gray' : 'green'} fontSize="md" px={3} py={1}>
                {visit.isArchived ? 'مؤرشف' : 'نشط'}
              </Badge>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Main Information */}
      <Card mb="24px" w="100%">
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">المعلومات الأساسية</Text>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Box>
              <HStack spacing={2} mb={2}>
                <Icon as={FaCalendarAlt} color="#224D59" />
                <Text fontSize="sm" color="gray.500">تاريخ ووقت الزيارة</Text>
              </HStack>
              <Text fontWeight="semibold" color={textColor}>
                {new Date(visit.dateTime).toLocaleString('ar-SA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </Box>

            <Box>
              <HStack spacing={2} mb={2}>
                <Icon as={FaBuilding} color="#224D59" />
                <Text fontSize="sm" color="gray.500">اسم المنشأة</Text>
              </HStack>
              <Text fontWeight="semibold" color={textColor}>{visit.establishmentName}</Text>
              <Text fontSize="sm" color="gray.500">{visit.establishmentCode}</Text>
            </Box>

            <Box>
              <HStack spacing={2} mb={2}>
                <Icon as={FaMapMarkerAlt} color="#224D59" />
                <Text fontSize="sm" color="gray.500">الموقع</Text>
              </HStack>
              <Text fontWeight="semibold" color={textColor}>{visit.region}</Text>
              <Text fontSize="sm" color="gray.500">{visit.city}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>الفرع</Text>
              <Text fontWeight="semibold" color={textColor}>{visit.branch}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>القطاع</Text>
              <Text fontWeight="semibold" color={textColor}>{visit.sector}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>نوع الزيارة</Text>
              <Badge 
                colorScheme={
                  visit.visitCategory === 'مجدولة' ? 'blue' : 
                  visit.visitCategory === 'معاودة' ? 'orange' : 
                  'purple'
                } 
                fontSize="sm" 
                px={3} 
                py={1}
              >
                {visit.visitCategory || 'غير محدد'}
              </Badge>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>المفتش</Text>
              <Text fontWeight="semibold" color={textColor}>{visit.inspectorName}</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Statistics */}
      <Card mb="24px" w="100%">
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">الإحصائيات</Text>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={visit.violationsCount > 0 ? 'red.300' : borderColor}
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg', borderColor: 'red.400' }}
              onClick={() => openSectionModal('violations')}
            >
              <Icon as={FaExclamationTriangle} w={10} h={10} color={visit.violationsCount > 0 ? 'red.500' : 'gray.400'} mb={3} />
              <Text fontSize="3xl" fontWeight="bold" color={visit.violationsCount > 0 ? 'red.500' : textColor} mb={1}>
                {visit.violationsCount}
              </Text>
              <Text fontSize="sm" color="gray.500">المخالفات</Text>
              <Text fontSize="xs" color="gray.400" mt={2}>اضغط للتفاصيل</Text>
            </Box>

            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg', borderColor: '#224D59' }}
              onClick={() => openSectionModal('samples')}
            >
              <Icon as={FaFlask} w={10} h={10} color="#224D59" mb={3} />
              <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={1}>
                {visit.samplesCount}
              </Text>
              <Text fontSize="sm" color="gray.500">العينات</Text>
              <Text fontSize="xs" color="gray.400" mt={2}>اضغط للتفاصيل</Text>
            </Box>

            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={visit.finesTotal > 0 ? 'orange.300' : borderColor}
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg', borderColor: 'orange.400' }}
              onClick={() => openSectionModal('fines')}
            >
              <Icon as={FaMoneyBillWave} w={10} h={10} color={visit.finesTotal > 0 ? 'orange.500' : 'gray.400'} mb={3} />
              <Text fontSize="3xl" fontWeight="bold" color={visit.finesTotal > 0 ? 'orange.500' : textColor} mb={1}>
                {visit.finesTotal.toLocaleString('ar-SA')}
              </Text>
              <Text fontSize="sm" color="gray.500">الغرامات (ريال)</Text>
              <Text fontSize="xs" color="gray.400" mt={2}>اضغط للتفاصيل</Text>
            </Box>

            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              textAlign="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg', borderColor: 'purple.400' }}
              onClick={() => openSectionModal('devices')}
            >
              <Icon as={FaCog} w={10} h={10} color="purple.500" mb={3} />
              <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={1}>
                {visit.devicesCount || 0}
              </Text>
              <Text fontSize="sm" color="gray.500">الأجهزة البيئية</Text>
              <Text fontSize="xs" color="gray.400" mt={2}>اضغط للتفاصيل</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>تفاصيل القسم</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {renderModalContent()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
