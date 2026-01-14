import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Pagination from 'components/Pagination/Pagination';
import { TableSkeleton } from 'components/Skeleton/SkeletonLoaders';
import VisitsFilters from './components/VisitsFilters';
import VisitsTable from './components/VisitsTable';
import visitService from 'services/visitService';

export default function Visits() {
  const location = useLocation();
  const [visits, setVisits] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const textColor = useColorModeValue('gray.700', 'white');
  const currentUserRole = 'Inspector'; // Mock - replace with actual auth context

  useEffect(() => {
    // Check for query parameters (e.g., assignedTo=me)
    const params = new URLSearchParams(location.search);
    const assignedTo = params.get('assignedTo');
    
    if (assignedTo) {
      setFilters(prev => ({ ...prev, assignedTo }));
    }
  }, [location.search]);

  useEffect(() => {
    fetchVisits();
  }, [filters, currentPage, pageSize]);

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await visitService.getVisits({
        ...filters,
        page: currentPage,
        pageSize
      });
      setVisits(response.data);
      setTotalVisits(response.total);
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, pageSize]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleRefresh = useCallback(() => {
    fetchVisits();
  }, [fetchVisits]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalVisits / pageSize);
  }, [totalVisits, pageSize]);

  return (
    <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }} w="100%">
      {/* Header */}
      <Flex mb="24px" justify="space-between" align="center" w="100%">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          الزيارات التفتيشية
        </Text>
      </Flex>

      {/* Filters Section */}
      <Card mb="24px" w="100%">
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">
            البحث والتصفية
          </Text>
        </CardHeader>
        <CardBody w="100%">
          <VisitsFilters onFilterChange={handleFilterChange} />
        </CardBody>
      </Card>

      {/* Visits Table */}
      <Card w="100%">
        <CardHeader p="12px 0px 28px 0px">
          <Flex direction="column">
            <Text fontSize="lg" fontWeight="bold" pb=".5rem">
              قائمة الزيارات
            </Text>
            <Text fontSize="sm" color="gray.500">
              إجمالي الزيارات: {totalVisits}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody overflowX="auto" w="100%" pb={0}>
          {loading ? (
            <Box minH="400px" py={4}>
              <TableSkeleton rows={pageSize} columns={10} />
            </Box>
          ) : visits.length === 0 ? (
            <Center py={10}>
              <Text color="gray.500">لا توجد زيارات</Text>
            </Center>
          ) : (
            <VisitsTable
              visits={visits}
              onRefresh={handleRefresh}
              currentUserRole={currentUserRole}
            />
          )}
        </CardBody>
        {!loading && visits.length > 0 && (
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
