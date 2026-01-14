import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Select,
  Checkbox,
  Text,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import { SearchIcon, CalendarIcon } from '@chakra-ui/icons';
import useDebounce from 'hooks/useDebounce';
import visitService from 'services/visitService';

const VisitsFilters = ({ onFilterChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    from: '',
    to: '',
    region: '',
    city: '',
    sector: '',
    compliance: '',
    visitType: '',
    archived: false
  });

  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    cities: [],
    sectors: [],
    visitTypes: []
  });

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Debounce search
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  // Update filters when debounced search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const loadFilterOptions = async () => {
    try {
      const options = await visitService.getFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <VStack spacing={4} align="stretch" w="100%">
      {/* Search - Full Width */}
      <Box w="100%">
        <Text fontSize="sm" mb={2} color="gray.600">
          البحث
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="البحث بالمنشأة، الكود، الفرع، أو رقم الزيارة..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
            dir="rtl"
          />
        </InputGroup>
      </Box>

      {/* Grid Layout for Filters */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w="100%">
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
              value={filters.from}
              onChange={(e) => handleChange('from', e.target.value)}
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
              value={filters.to}
              onChange={(e) => handleChange('to', e.target.value)}
              bg={bgColor}
              borderColor={borderColor}
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
            placeholder="جميع المناطق"
          >
            {filterOptions.regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </Select>
        </Box>

        {/* City */}
        <Box>
          <Text fontSize="sm" mb={2} color="gray.600">
            المدينة
          </Text>
          <Select
            value={filters.city}
            onChange={(e) => handleChange('city', e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
            placeholder="جميع المدن"
          >
            {filterOptions.cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Select>
        </Box>

        {/* Sector */}
        <Box>
          <Text fontSize="sm" mb={2} color="gray.600">
            القطاع
          </Text>
          <Select
            value={filters.sector}
            onChange={(e) => handleChange('sector', e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
            placeholder="جميع القطاعات"
          >
            {filterOptions.sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </Select>
        </Box>

        {/* Visit Type */}
        <Box>
          <Text fontSize="sm" mb={2} color="gray.600">
            نوع الزيارة
          </Text>
          <Select
            value={filters.visitType}
            onChange={(e) => handleChange('visitType', e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
            placeholder="جميع الأنواع"
          >
            {filterOptions.visitTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </Box>

        {/* Compliance Status */}
        <Box>
          <Text fontSize="sm" mb={2} color="gray.600">
            حالة الامتثال
          </Text>
          <Select
            value={filters.compliance}
            onChange={(e) => handleChange('compliance', e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
            placeholder="جميع الحالات"
          >
            <option value="Compliant">متوافق</option>
            <option value="NonCompliant">غير متوافق</option>
            <option value="UnderReview">قيد المراجعة</option>
          </Select>
        </Box>
      </SimpleGrid>

      {/* Archived Toggle */}
      <Box>
        <Checkbox
          isChecked={filters.archived}
          onChange={(e) => handleChange('archived', e.target.checked)}
          colorScheme="blue"
        >
          عرض الزيارات المؤرشفة
        </Checkbox>
      </Box>
    </VStack>
  );
};

export default VisitsFilters;
