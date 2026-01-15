// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useToast,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Pagination from "components/Pagination/Pagination";
import { TableSkeleton } from "components/Skeleton/SkeletonLoaders";
import InspectorsFilters from "./components/InspectorsFilters";
import InspectorsTable from "./components/InspectorsTable";
import inspectorService from "services/inspectorService";

export default function InspectorsList() {
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");
  
  // State
  const [inspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalInspectors, setTotalInspectors] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    search: '',
    region: 'All',
    specialization: 'All',
    status: 'All',
  });

  // Fetch inspectors
  const fetchInspectors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await inspectorService.getInspectors({
        ...filters,
        page: currentPage,
        pageSize,
      });
      setInspectors(response.data);
      setTotalInspectors(response.total);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل بيانات المفتشين',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, pageSize, toast]);

  // Load data on mount and when filters/pagination change
  useEffect(() => {
    fetchInspectors();
  }, [fetchInspectors]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(totalInspectors / pageSize);
  }, [totalInspectors, pageSize]);

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      {/* Page Header */}
      <Box mb="24px">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          إدارة المفتشين
        </Text>
        <Text fontSize="sm" color="gray.500">
          عرض وإدارة بيانات المفتشين وأدائهم
        </Text>
      </Box>

      {/* Filters Card */}
      <Card mb="24px">
        <CardBody>
          <InspectorsFilters onFilterChange={handleFilterChange} />
        </CardBody>
      </Card>

      {/* Inspectors Table Card */}
      <Card>
        <CardHeader p='12px 0px 28px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              قائمة المفتشين
            </Text>
            <Text fontSize='sm' color='gray.500'>
              إجمالي المفتشين: {totalInspectors}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody overflowX="auto" pb={0}>
          {loading ? (
            <Box minH="400px" py={4}>
              <TableSkeleton rows={pageSize} columns={6} />
            </Box>
          ) : inspectors.length > 0 ? (
            <InspectorsTable inspectors={inspectors} onRefresh={fetchInspectors} />
          ) : (
            <Center h="300px">
              <Text color="gray.500">لا توجد بيانات</Text>
            </Center>
          )}
        </CardBody>
        {!loading && inspectors.length > 0 && (
          <Box px={6} pb={4}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalInspectors}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </Box>
        )}
      </Card>
    </Flex>
  );
}
