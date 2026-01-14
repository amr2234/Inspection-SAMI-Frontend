import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { SearchIcon, CalendarIcon } from '@chakra-ui/icons';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Pagination from 'components/Pagination/Pagination';
import { TableSkeleton } from 'components/Skeleton/SkeletonLoaders';
import useDebounce from 'hooks/useDebounce';
import LogDetailsModal from './components/LogDetailsModal';
import LogsTable from './components/LogsTable';
import logService from 'services/logService';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [logType, setLogType] = useState('All');
  const [errorType, setErrorType] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');

  // Debounce search with useDebounce hook
  const debouncedSearch = useDebounce(searchInput, 500);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Fetch logs
  useEffect(() => {
    fetchLogs();
  }, [debouncedSearch, logType, errorType, fromDate, toDate, currentPage, pageSize]);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await logService.getLogs({
        search: debouncedSearch,
        type: logType,
        errorType: errorType,
        from: fromDate,
        to: toDate,
        page: currentPage,
        pageSize
      });
      setLogs(response.data);
      setTotalLogs(response.total);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, logType, errorType, fromDate, toDate, currentPage, pageSize]);

  const handleViewDetails = useCallback((log) => {
    setSelectedLog(log);
    onOpen();
  }, [onOpen]);

  const handleModalClose = useCallback(() => {
    setSelectedLog(null);
    onClose();
  }, [onClose]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalLogs / pageSize);
  }, [totalLogs, pageSize]);

  return (
    <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
      {/* Header */}
      <Flex mb="24px" justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          سجلات النظام
        </Text>
      </Flex>

      {/* Filters Section */}
      <Card mb="24px">
        <CardBody>
          {/* Search - Full Width First Row */}
          <Box mb={4}>
            <Text fontSize="sm" mb={2} color="gray.600">
              البحث
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="البحث في الرسائل، الأسماء، أو البريد الإلكتروني..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </InputGroup>
          </Box>

          {/* Filters Grid - Second Row */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} w="100%">
            {/* From Date */}
            <Box>
              <Text fontSize="sm" mb={2} color="gray.600">
                من تاريخ
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CalendarIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  bg={bgColor}
                  borderColor={borderColor}
                />
              </InputGroup>
            </Box>

            {/* To Date */}
            <Box>
              <Text fontSize="sm" mb={2} color="gray.600">
                إلى تاريخ
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CalendarIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  bg={bgColor}
                  borderColor={borderColor}
                />
              </InputGroup>
            </Box>

            {/* Log Type */}
            <Box>
              <Text fontSize="sm" mb={2} color="gray.600">
                نوع السجل
              </Text>
              <Select
                value={logType}
                onChange={(e) => {
                  setLogType(e.target.value);
                  // Reset error type if not Error
                  if (e.target.value !== 'Error') {
                    setErrorType('All');
                  }
                }}
                bg={bgColor}
                borderColor={borderColor}
              >
                <option value="All">الكل</option>
                <option value="UserCreated">إنشاء مستخدم</option>
                <option value="FormSubmitted">تقديم نموذج</option>
                <option value="Error">خطأ</option>
              </Select>
            </Box>

            {/* Error Type */}
            <Box>
              <Text fontSize="sm" mb={2} color="gray.600">
                نوع الخطأ
              </Text>
              <Select
                value={errorType}
                onChange={(e) => setErrorType(e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                isDisabled={logType !== 'Error'}
              >
                <option value="All">الكل</option>
                <option value="Validation">خطأ تحقق</option>
                <option value="Network">خطأ شبكة</option>
                <option value="Server">خطأ خادم</option>
                <option value="Unknown">غير معروف</option>
              </Select>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader p="12px 0px 28px 0px">
          <Flex direction="column">
            <Text fontSize="lg" fontWeight="bold" pb=".5rem">
              السجلات
            </Text>
            <Text fontSize="sm" color="gray.500">
              إجمالي السجلات: {totalLogs}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody overflowX="auto" pb={0}>
          {loading ? (
            <Box minH="400px" py={4}>
              <TableSkeleton rows={pageSize} columns={7} />
            </Box>
          ) : logs.length === 0 ? (
            <Center py={10}>
              <Text color="gray.500">لا توجد سجلات</Text>
            </Center>
          ) : (
            <LogsTable logs={logs} onViewDetails={handleViewDetails} />
          )}
        </CardBody>
        {!loading && logs.length > 0 && (
          <Box px={6} pb={4}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalLogs}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </Box>
        )}
      </Card>

      {/* Log Details Modal */}
      <LogDetailsModal
        isOpen={isOpen}
        onClose={handleModalClose}
        log={selectedLog}
      />
    </Flex>
  );
}
