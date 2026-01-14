import React from 'react';
import {
  Flex,
  Button,
  Text,
  Select,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = React.memo(({ 
  currentPage, 
  totalPages, 
  pageSize, 
  totalItems,
  onPageChange, 
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100]
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const activeButtonBg = useColorModeValue('#224D59', '#224D59');
  const inactiveButtonBg = useColorModeValue('white', 'gray.700');

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        endPage = 4;
      }
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <Flex 
      justify="space-between" 
      align="center" 
      mt={4} 
      wrap="wrap" 
      gap={4}
    >
      {/* Items count */}
      <Text fontSize="sm" color={textColor}>
        عرض {startItem} إلى {endItem} من {totalItems} عنصر
      </Text>

      {/* Page size selector */}
      <HStack spacing={2}>
        <Text fontSize="sm" color={textColor}>عرض:</Text>
        <Select
          size="sm"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          width="auto"
          borderColor={borderColor}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </Select>
      </HStack>

      {/* Page numbers */}
      <HStack spacing={1}>
        <IconButton
          icon={<ChevronRightIcon />}
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          variant="ghost"
          aria-label="الصفحة السابقة"
        />
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <Text key={`ellipsis-${index}`} px={2} color={textColor}>...</Text>
          ) : (
            <Button
              key={page}
              size="sm"
              onClick={() => onPageChange(page)}
              bg={currentPage === page ? activeButtonBg : inactiveButtonBg}
              color={currentPage === page ? 'white' : textColor}
              _hover={{
                bg: currentPage === page ? activeButtonBg : 'gray.100'
              }}
              minW="32px"
            >
              {page}
            </Button>
          )
        ))}
        
        <IconButton
          icon={<ChevronLeftIcon />}
          size="sm"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          variant="ghost"
          aria-label="الصفحة التالية"
        />
      </HStack>
    </Flex>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
