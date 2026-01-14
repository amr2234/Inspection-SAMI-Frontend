import React, { useState, useMemo, useCallback } from "react";
import {
  Flex,
  Box,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Td,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Pagination from "components/Pagination/Pagination";

const InspectorPerformanceTable = React.memo(({ title, data }) => {
  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSeeMore = () => {
    history.push('/admin/inspectors-list');
  };

  const getComplianceColor = (rate) => {
    const numRate = parseFloat(rate);
    if (numRate >= 70) return "green";
    if (numRate >= 40) return "orange";
    return "red";
  };

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data.length, pageSize]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  return (
    <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='12px 0px 28px 0px'>
        <Flex direction='row' justify='space-between' align='center' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button
            leftIcon={<ViewIcon />}
            size='sm'
            variant='outline'
            colorScheme='teal'
            onClick={handleSeeMore}
          >
            عرض المزيد
          </Button>
        </Flex>
      </CardHeader>
      <CardBody pb={0}>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' pl='0px'>
              <Th
                pl='0px'
                color='gray.400'
                borderColor={borderColor}
                textAlign='right'
              >
                اسم المفتش
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                المسمى الوظيفي
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                إجمالي الزيارات
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                المخالفات
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                الغرامات المحصلة
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                نسبة الالتزام
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                آخر زيارة
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((inspector, index) => (
              <Tr key={index}>
                <Td
                  pl='0px'
                  borderColor={borderColor}
                  textAlign='right'
                  minW='180px'
                >
                  <Text fontSize='sm' fontWeight='bold'>
                    {inspector.name}
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='sm' color='gray.600'>
                    {inspector.title}
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='sm' fontWeight='semibold'>
                    {inspector.totalInspections}
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='sm' fontWeight='semibold' color='red.500'>
                    {inspector.totalViolations}
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='sm' fontWeight='bold' color='green.500'>
                    {inspector.totalFines.toLocaleString('ar-SA')} ر.س
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Badge
                    colorScheme={getComplianceColor(inspector.complianceRate)}
                    fontSize='xs'
                    p='3px 10px'
                    borderRadius='8px'
                  >
                    {inspector.complianceRate}%
                  </Badge>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='xs' color='gray.500'>
                    {new Date(inspector.lastInspectionDate).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
      {data.length > 0 && (
        <Box px={6} pb={4}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={data.length}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      )}
    </Card>
  );
});

export default InspectorPerformanceTable;
