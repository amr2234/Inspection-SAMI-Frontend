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
} from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaExclamationTriangle, FaFlask, FaMoneyBillWave } from 'react-icons/fa';
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
              <Text fontWeight="semibold" color={textColor}>{visit.visitType}</Text>
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
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={visit.violationsCount > 0 ? 'red.300' : borderColor}
              textAlign="center"
            >
              <Icon as={FaExclamationTriangle} w={10} h={10} color={visit.violationsCount > 0 ? 'red.500' : 'gray.400'} mb={3} />
              <Text fontSize="3xl" fontWeight="bold" color={visit.violationsCount > 0 ? 'red.500' : textColor} mb={1}>
                {visit.violationsCount}
              </Text>
              <Text fontSize="sm" color="gray.500">المخالفات</Text>
            </Box>

            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              textAlign="center"
            >
              <Icon as={FaFlask} w={10} h={10} color="#224D59" mb={3} />
              <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={1}>
                {visit.samplesCount}
              </Text>
              <Text fontSize="sm" color="gray.500">العينات</Text>
            </Box>

            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={visit.finesTotal > 0 ? 'orange.300' : borderColor}
              textAlign="center"
            >
              <Icon as={FaMoneyBillWave} w={10} h={10} color={visit.finesTotal > 0 ? 'orange.500' : 'gray.400'} mb={3} />
              <Text fontSize="3xl" fontWeight="bold" color={visit.finesTotal > 0 ? 'orange.500' : textColor} mb={1}>
                {visit.finesTotal.toLocaleString('ar-SA')}
              </Text>
              <Text fontSize="sm" color="gray.500">إجمالي الغرامات (ريال)</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Flex>
  );
}
