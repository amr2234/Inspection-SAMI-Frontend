import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Select,
  Input,
  Text,
  useColorModeValue,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

export function DateFilter({ onFilterChange }) {
  const [filterType, setFilterType] = useState('thisMonth');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.700', 'gray.200');

  const quickFilters = [
    { value: 'thisMonth', label: 'هذا الشهر' },
    { value: 'lastMonth', label: 'الشهر الماضي' },
    { value: 'last3Months', label: 'آخر 3 أشهر' },
    { value: 'last6Months', label: 'آخر 6 أشهر' },
    { value: 'thisYear', label: 'هذا العام' },
    { value: 'customMonth', label: 'اختر شهر محدد' },
    { value: 'customRange', label: 'نطاق مخصص' }
  ];

  const months = [
    { value: '01', label: 'يناير' },
    { value: '02', label: 'فبراير' },
    { value: '03', label: 'مارس' },
    { value: '04', label: 'أبريل' },
    { value: '05', label: 'مايو' },
    { value: '06', label: 'يونيو' },
    { value: '07', label: 'يوليو' },
    { value: '08', label: 'أغسطس' },
    { value: '09', label: 'سبتمبر' },
    { value: '10', label: 'أكتوبر' },
    { value: '11', label: 'نوفمبر' },
    { value: '12', label: 'ديسمبر' }
  ];

  const years = [2026, 2025, 2024, 2023];

  const calculateDateRange = (type) => {
    const now = new Date();
    let start, end;

    switch (type) {
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'last3Months':
        start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        end = now;
        break;
      case 'last6Months':
        start = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        end = now;
        break;
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      default:
        return null;
    }

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  };

  const handleQuickFilter = (type) => {
    setFilterType(type);
    
    if (type === 'customRange' || type === 'customMonth') {
      // Wait for user to select dates
      return;
    }

    const range = calculateDateRange(type);
    if (range) {
      onFilterChange(range.startDate, range.endDate);
    }
  };

  const handleMonthSelect = (year, month) => {
    if (!year || !month) return;
    
    const start = new Date(year, parseInt(month) - 1, 1);
    const end = new Date(year, parseInt(month), 0);
    
    onFilterChange(
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0]
    );
  };

  const handleCustomRange = () => {
    if (startDate && endDate) {
      onFilterChange(startDate, endDate);
    }
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="15px"
      p={{ base: '20px', md: '24px' }}
      boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      mb="24px"
      border="1px solid"
      borderColor={borderColor}
    >
      <VStack spacing={4} align="stretch">
        {/* Quick Filters */}
        <Box>
          <Text fontSize="sm" fontWeight="600" color={labelColor} mb={2}>
            تصفية حسب الفترة
          </Text>
          <Select
            value={filterType}
            onChange={(e) => handleQuickFilter(e.target.value)}
            size="lg"
            borderRadius="10px"
            borderWidth="2px"
            dir="rtl"
            icon={<Box />}
          >
            {quickFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </Select>
        </Box>

        {/* Month Selector */}
        {filterType === 'customMonth' && (
          <HStack spacing={3} align="end">
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="600" color={labelColor} mb={2}>
                السنة
              </Text>
              <Select
                value={selectedMonth.split('-')[0] || ''}
                onChange={(e) => {
                  const year = e.target.value;
                  const month = selectedMonth.split('-')[1] || '01';
                  setSelectedMonth(`${year}-${month}`);
                  handleMonthSelect(year, month);
                }}
                size="lg"
                borderRadius="10px"
                borderWidth="2px"
                dir="rtl"
                placeholder="اختر السنة"
                icon={<Box />}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </Box>
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="600" color={labelColor} mb={2}>
                الشهر
              </Text>
              <Select
                value={selectedMonth.split('-')[1] || ''}
                onChange={(e) => {
                  const month = e.target.value;
                  const year = selectedMonth.split('-')[0] || new Date().getFullYear();
                  setSelectedMonth(`${year}-${month}`);
                  handleMonthSelect(year, month);
                }}
                size="lg"
                borderRadius="10px"
                borderWidth="2px"
                dir="rtl"
                placeholder="اختر الشهر"
                icon={<Box />}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Select>
            </Box>
          </HStack>
        )}

        {/* Custom Date Range */}
        {filterType === 'customRange' && (
          <HStack spacing={3} align="end">
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="600" color={labelColor} mb={2}>
                من تاريخ
              </Text>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="lg"
                borderRadius="10px"
                borderWidth="2px"
                dir="rtl"
              />
            </Box>
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="600" color={labelColor} mb={2}>
                إلى تاريخ
              </Text>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="lg"
                borderRadius="10px"
                borderWidth="2px"
                dir="rtl"
              />
            </Box>
            <Button
              onClick={handleCustomRange}
              bg="#224D59"
              color="white"
              size="lg"
              px={8}
              borderRadius="10px"
              _hover={{ bg: '#346860' }}
              _active={{ bg: '#224D59' }}
              leftIcon={<CalendarIcon />}
            >
              تطبيق
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
