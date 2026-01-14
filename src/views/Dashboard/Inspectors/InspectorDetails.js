import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Grid,
  SimpleGrid,
  Badge,
  Button,
  Center,
  useToast,
  HStack,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import { DetailsSkeleton } from 'components/Skeleton/SkeletonLoaders';
import inspectorService from 'services/inspectorService';

export default function InspectorDetails() {
  const { id } = useParams();
  const history = useHistory();
  const toast = useToast();
  
  const [inspector, setInspector] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    const fetchInspector = async () => {
      try {
        const data = await inspectorService.getInspectorById(id);
        setInspector(data);
      } catch (error) {
        toast({
          title: 'خطأ',
          description: error.message,
          status: 'error',
          duration: 5000,
        });
        history.push('/admin/inspectors-list');
      } finally {
        setLoading(false);
      }
    };

    fetchInspector();
  }, [id, toast, history]);

  const handleBack = () => {
    history.push('/admin/inspectors');
  };

  const getComplianceColor = (rate) => {
    if (rate >= 80) return 'green';
    if (rate >= 60) return 'orange';
    return 'red';
  };

  if (loading) {
    return (
      <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
        <DetailsSkeleton />
      </Flex>
    );
  }

  if (!inspector) {
    return (
      <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
        <Center h='400px'>
          <Text color='gray.500'>المفتش غير موجود</Text>
        </Center>
      </Flex>
    );
  }

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      {/* Header */}
      <Flex justify='space-between' align='center' mb='24px'>
        <HStack spacing={4}>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant='ghost'
            onClick={handleBack}
          >
            رجوع
          </Button>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color={textColor}>
              تفاصيل المفتش
            </Text>
            <Text fontSize='sm' color='gray.500'>
              معلومات تفصيلية عن المفتش وأدائه
            </Text>
          </Box>
        </HStack>
      </Flex>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Main Info */}
        <VStack spacing={6} align='stretch'>
          {/* Basic Information */}
          <Card>
            <CardHeader p='20px'>
              <Flex justify='space-between' align='center'>
                <Text fontSize='lg' fontWeight='bold' color={textColor}>
                  المعلومات الأساسية
                </Text>
                <Badge colorScheme={inspector.isActive ? 'green' : 'gray'} fontSize='md'>
                  {inspector.status}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    رقم المفتش
                  </Text>
                  <Text fontSize='md' fontWeight='semibold' color={textColor}>
                    {inspector.id}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    الرقم الوظيفي
                  </Text>
                  <Text fontSize='md' fontWeight='semibold' color={textColor}>
                    {inspector.employeeId}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    الاسم الكامل
                  </Text>
                  <Text fontSize='md' fontWeight='semibold' color={textColor}>
                    {inspector.name}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    رقم الهوية الوطنية
                  </Text>
                  <Text fontSize='md' fontWeight='semibold' color={textColor}>
                    {inspector.nationalId}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    البريد الإلكتروني
                  </Text>
                  <Text fontSize='md' color={textColor}>
                    {inspector.email}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    رقم الجوال
                  </Text>
                  <Text fontSize='md' color={textColor}>
                    {inspector.phone}
                  </Text>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader p='20px'>
              <Text fontSize='lg' fontWeight='bold' color={textColor}>
                المعلومات المهنية
              </Text>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    المسمى الوظيفي
                  </Text>
                  <Text fontSize='md' fontWeight='semibold' color={textColor}>
                    {inspector.title}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    الإدارة
                  </Text>
                  <Text fontSize='md' color={textColor}>
                    {inspector.department}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    التخصص
                  </Text>
                  <Badge colorScheme='blue' fontSize='md'>
                    {inspector.specialization}
                  </Badge>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    المؤهلات
                  </Text>
                  <Text fontSize='md' color={textColor}>
                    {inspector.qualifications}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    المنطقة
                  </Text>
                  <Text fontSize='md' fontWeight='semibold' color={textColor}>
                    {inspector.region}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    المدينة
                  </Text>
                  <Text fontSize='md' color={textColor}>
                    {inspector.city}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    تاريخ الالتحاق
                  </Text>
                  <Text fontSize='md' color={textColor}>
                    {new Date(inspector.joinDate).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='sm' color='gray.500' mb={1}>
                    آخر زيارة
                  </Text>
                  <Text fontSize='md' color={textColor}>
                    {new Date(inspector.lastInspectionDate).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>

        {/* Performance Stats */}
        <VStack spacing={6} align='stretch'>
          {/* Performance KPIs */}
          <Card>
            <CardHeader p='20px'>
              <Text fontSize='lg' fontWeight='bold' color={textColor}>
                مؤشرات الأداء
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align='stretch'>
                <Box p={4} bg={bgColor} borderRadius='lg' borderWidth='1px' borderColor={borderColor}>
                  <Text fontSize='sm' color='gray.500' mb={2}>
                    إجمالي الزيارات
                  </Text>
                  <Text fontSize='3xl' fontWeight='bold' color={textColor}>
                    {inspector.totalInspections}
                  </Text>
                  <Text fontSize='xs' color='gray.500'>
                    زيارة تفتيشية
                  </Text>
                </Box>

                <Box p={4} bg={bgColor} borderRadius='lg' borderWidth='1px' borderColor={borderColor}>
                  <Text fontSize='sm' color='gray.500' mb={2}>
                    المخالفات المكتشفة
                  </Text>
                  <Text fontSize='3xl' fontWeight='bold' color='red.500'>
                    {inspector.totalViolations}
                  </Text>
                  <Text fontSize='xs' color='gray.500'>
                    مخالفة
                  </Text>
                </Box>

                <Box p={4} bg={bgColor} borderRadius='lg' borderWidth='1px' borderColor={borderColor}>
                  <Text fontSize='sm' color='gray.500' mb={2}>
                    الغرامات المحصلة
                  </Text>
                  <Text fontSize='2xl' fontWeight='bold' color='green.500'>
                    {inspector.totalFines.toLocaleString('ar-SA')}
                  </Text>
                  <Text fontSize='xs' color='gray.500'>
                    ريال سعودي
                  </Text>
                </Box>

                <Box p={4} bg={bgColor} borderRadius='lg' borderWidth='1px' borderColor={borderColor}>
                  <Text fontSize='sm' color='gray.500' mb={2}>
                    نسبة الالتزام
                  </Text>
                  <Badge
                    colorScheme={getComplianceColor(inspector.complianceRate)}
                    fontSize='2xl'
                    p={2}
                  >
                    {inspector.complianceRate}%
                  </Badge>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </Flex>
  );
}
