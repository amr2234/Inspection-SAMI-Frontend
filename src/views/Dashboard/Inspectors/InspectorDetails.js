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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBackIcon, EditIcon, ViewIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { FaClipboardList, FaExclamationTriangle, FaMoneyBillWave } from 'react-icons/fa';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import { DetailsSkeleton, TableSkeleton } from 'components/Skeleton/SkeletonLoaders';
import Pagination from 'components/Pagination/Pagination';
import inspectorService from 'services/inspectorService';
import visitService from 'services/visitService';

export default function InspectorDetails() {
  const { id } = useParams();
  const history = useHistory();
  const toast = useToast();
  
  const [inspector, setInspector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [visitsLoading, setVisitsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalVisits, setTotalVisits] = useState(0);
  
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

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

  useEffect(() => {
    const fetchVisits = async () => {
      if (!inspector) return;
      
      setVisitsLoading(true);
      try {
        const response = await visitService.getVisitsByInspector(inspector.id, {
          page: currentPage,
          pageSize,
        });
        setVisits(response.data);
        setTotalVisits(response.total);
      } catch (error) {
        console.error('Error fetching visits:', error);
      } finally {
        setVisitsLoading(false);
      }
    };

    fetchVisits();
  }, [inspector, currentPage, pageSize]);

  const handleBack = () => {
    history.push('/admin/inspectors-list');
  };

  const handleViewVisit = (visitId) => {
    history.push(`/admin/visits/${visitId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalVisits / pageSize);

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

      <Grid templateColumns={{ base: '1fr' }} gap={6}>
        {/* Main Info */}
        <VStack spacing={6} align='stretch'>
          {/* Personal Information Card */}
          <Card>
            <CardHeader p='20px'>
              <Flex justify='space-between' align='center'>
                <Text fontSize='lg' fontWeight='bold' color={textColor}>
                  البيانات الشخصية
                </Text>
                <Badge colorScheme={inspector.isActive ? 'green' : 'gray'} fontSize='md' px={3} py={1}>
                  {inspector.status}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody px={6} py={5}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    رقم المفتش
                  </Text>
                  <Text fontSize='md' fontWeight='600' color={textColor} whiteSpace='nowrap'>
                    {inspector.id}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    الرقم الوضيفي
                  </Text>
                  <Text fontSize='md' fontWeight='600' color={textColor} whiteSpace='nowrap'>
                    {inspector.employeeId}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    رقم الهوية الوطنية
                  </Text>
                  <Text fontSize='md' fontWeight='600' color={textColor} whiteSpace='nowrap'>
                    {inspector.nationalId}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    الاسم الكامل
                  </Text>
                  <Text fontSize='md' fontWeight='600' color={textColor} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                    {inspector.name}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    البريد الإلكتروني
                  </Text>
                  <Text fontSize='sm' color={textColor} dir='ltr' textAlign='right' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                    {inspector.email}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    رقم الجوال
                  </Text>
                  <Text fontSize='sm' color={textColor} dir='ltr' textAlign='right' whiteSpace='nowrap'>
                    {inspector.phone}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    المسمى الوظيفي
                  </Text>
                  <Text fontSize='md' fontWeight='600' color={textColor} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                    {inspector.title}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    الإدارة
                  </Text>
                  <Text fontSize='md' fontWeight='600' color={textColor} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                    {inspector.department}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='xs' color='gray.500' mb={1.5}>
                    المنطقة
                  </Text>
                  <Text fontSize='md' fontWeight='600' color={textColor} whiteSpace='nowrap'>
                    {inspector.region}
                  </Text>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Performance Indicators Card */}
          <Card>
            <CardHeader p='20px'>
              <Text fontSize='lg' fontWeight='bold' color={textColor}>
                مؤشرات الأداء
              </Text>
            </CardHeader>
            <CardBody px={6} py={5}>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                <Flex
                  align='center'
                  gap={3}
                  p={4}
                  bg='blue.50'
                  borderRadius='xl'
                  border='1px'
                  borderColor='blue.100'
                  transition='all 0.2s'
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <Box
                    bg='blue.500'
                    color='white'
                    p={3}
                    borderRadius='lg'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <FaClipboardList size={22} />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize='xs' color='blue.700' fontWeight='500' mb={1}>
                      إجمالي الزيارات
                    </Text>
                    <Text fontSize='2xl' fontWeight='bold' color='blue.600'>
                      {inspector.totalInspections}
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  align='center'
                  gap={3}
                  p={4}
                  bg='red.50'
                  borderRadius='xl'
                  border='1px'
                  borderColor='red.100'
                  transition='all 0.2s'
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <Box
                    bg='red.500'
                    color='white'
                    p={3}
                    borderRadius='lg'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <FaExclamationTriangle size={22} />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize='xs' color='red.700' fontWeight='500' mb={1}>
                      المخالفات
                    </Text>
                    <Text fontSize='2xl' fontWeight='bold' color='red.600'>
                      {inspector.totalViolations}
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  align='center'
                  gap={3}
                  p={4}
                  bg='green.50'
                  borderRadius='xl'
                  border='1px'
                  borderColor='green.100'
                  transition='all 0.2s'
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <Box
                    bg='green.500'
                    color='white'
                    p={3}
                    borderRadius='lg'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <FaMoneyBillWave size={22} />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize='xs' color='green.700' fontWeight='500' mb={1}>
                      الغرامات (ريال)
                    </Text>
                    <Text fontSize='2xl' fontWeight='bold' color='green.600'>
                      {inspector.totalFines.toLocaleString('ar-SA')}
                    </Text>
                  </Box>
                </Flex>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>
      </Grid>

      {/* Inspector Visits */}
      <Card mt={6}>
        <CardHeader p='20px'>
          <Flex justify='space-between' align='center'>
            <Box>
              <Text fontSize='lg' fontWeight='bold' color={textColor}>
                زيارات المفتش
              </Text>
              <Text fontSize='sm' color='gray.500'>
                إجمالي الزيارات: {totalVisits}
              </Text>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody overflowX='auto' pb={0}>
          {visitsLoading ? (
            <Box minH='400px' py={4}>
              <TableSkeleton rows={pageSize} columns={6} />
            </Box>
          ) : visits.length === 0 ? (
            <Center h='300px'>
              <Text color='gray.500'>لا توجد زيارات</Text>
            </Center>
          ) : (
            <Table variant='simple' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th textAlign='right' borderColor={borderColor}>رقم الزيارة</Th>
                  <Th textAlign='right' borderColor={borderColor}>التاريخ</Th>
                  <Th textAlign='right' borderColor={borderColor}>اسم المنشأة</Th>
                  <Th textAlign='right' borderColor={borderColor}>المنطقة</Th>
                  <Th textAlign='center' borderColor={borderColor}>المخالفات</Th>
                  <Th textAlign='center' borderColor={borderColor}>الإجراءات</Th>
                </Tr>
              </Thead>
              <Tbody>
                {visits.map((visit) => (
                  <Tr key={visit.id}>
                    <Td textAlign='right' borderColor={borderColor}>
                      <Text fontWeight='semibold' color={textColor} fontSize='sm'>
                        {visit.id}
                      </Text>
                    </Td>
                    <Td textAlign='right' borderColor={borderColor}>
                      <Text fontSize='sm' color={textColor}>
                        {new Date(visit.dateTime).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                      <Text fontSize='xs' color='gray.500'>
                        {new Date(visit.dateTime).toLocaleTimeString('ar-SA', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </Td>
                    <Td textAlign='right' borderColor={borderColor}>
                      <Text fontSize='sm' fontWeight='semibold' color={textColor}>
                        {visit.establishmentName}
                      </Text>
                      <Text fontSize='xs' color='gray.500'>
                        {visit.establishmentCode}
                      </Text>
                    </Td>
                    <Td textAlign='right' borderColor={borderColor}>
                      <Text fontSize='sm' color={textColor}>
                        {visit.region}
                      </Text>
                      <Text fontSize='xs' color='gray.500'>
                        {visit.city}
                      </Text>
                    </Td>
                    <Td textAlign='center' borderColor={borderColor}>
                      <Text fontSize='lg' fontWeight='bold' color='red.500'>
                        {visit.violationsCount}
                      </Text>
                    </Td>
                    <Td textAlign='center' borderColor={borderColor}>
                      <IconButton
                        icon={<ViewIcon />}
                        size='sm'
                        colorScheme='blue'
                        variant='ghost'
                        onClick={() => handleViewVisit(visit.id)}
                        aria-label='عرض'
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardBody>
        {!visitsLoading && visits.length > 0 && (
          <Box px={6} pb={4}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalVisits}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </Box>
        )}
      </Card>
    </Flex>
  );
}
