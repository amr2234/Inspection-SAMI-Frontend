import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useDebounce from 'hooks/useDebounce';

const InspectorsFilters = React.memo(({ onFilterChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    region: 'All',
    specialization: 'All',
    status: 'All',
  });

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Debounce search input (500ms delay)
  const debouncedSearch = useDebounce(searchInput, 500);
  
  // Update filters when debounced search changes
  useEffect(() => {
    const newFilters = { ...filters, search: debouncedSearch };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [debouncedSearch]);

  const handleChange = useCallback((field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} w="100%">
      {/* Search */}
      <Box>
        <Text fontSize="sm" mb={2} color="gray.600">
          البحث
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="البحث بالاسم، الرقم الوظيفي، البريد..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
            dir="rtl"
          />
        </InputGroup>
      </Box>

      {/* Region */}
      <Box>
        <Text fontSize="sm" mb={2} color="gray.600">
          المنطقة
        </Text>
        <Select
          value={filters.region}
          onChange={(e) => handleChange('region', e.target.value)}
          bg={bgColor}
          borderColor={borderColor}
        >
          <option value="All">جميع المناطق</option>
          <option value="الرياض">الرياض</option>
          <option value="مكة المكرمة">مكة المكرمة</option>
          <option value="الشرقية">الشرقية</option>
          <option value="عسير">عسير</option>
          <option value="المدينة المنورة">المدينة المنورة</option>
          <option value="القصيم">القصيم</option>
          <option value="حائل">حائل</option>
          <option value="تبوك">تبوك</option>
          <option value="الجوف">الجوف</option>
          <option value="جازان">جازان</option>
          <option value="نجران">نجران</option>
          <option value="الباحة">الباحة</option>
          <option value="الحدود الشمالية">الحدود الشمالية</option>
        </Select>
      </Box>

      {/* Specialization */}
      <Box>
        <Text fontSize="sm" mb={2} color="gray.600">
          التخصص
        </Text>
        <Select
          value={filters.specialization}
          onChange={(e) => handleChange('specialization', e.target.value)}
          bg={bgColor}
          borderColor={borderColor}
        >
          <option value="All">جميع التخصصات</option>
          <option value="تفتيش بيئي">تفتيش بيئي</option>
          <option value="تفتيش فني">تفتيش فني</option>
          <option value="تفتيش إداري">تفتيش إداري</option>
        </Select>
      </Box>

      {/* Status */}
      <Box>
        <Text fontSize="sm" mb={2} color="gray.600">
          الحالة
        </Text>
        <Select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          bg={bgColor}
          borderColor={borderColor}
        >
          <option value="All">الكل</option>
          <option value="نشط">نشط</option>
          <option value="غير نشط">غير نشط</option>
        </Select>
      </Box>
    </SimpleGrid>
  );
});

InspectorsFilters.displayName = 'InspectorsFilters';

export default InspectorsFilters;
