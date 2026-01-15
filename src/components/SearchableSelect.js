import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  useColorModeValue,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export function SearchableSelect({
  value,
  onChange,
  options = [],
  placeholder = 'اختر...',
  isDisabled = false,
  size = 'lg',
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const focusBorderColor = useColorModeValue('#224D59', 'teal.400');
  const hoverBorderColor = useColorModeValue('gray.400', 'gray.500');
  const bgColor = useColorModeValue('white', 'gray.800');
  const disabledBgColor = useColorModeValue('gray.50', 'gray.700');
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const listBgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');
  const selectedBgColor = useColorModeValue('blue.50', 'blue.900');

  // Filter options based on search term - works with Arabic
  const filteredOptions = options.filter(option => {
    const searchLower = searchTerm.trim();
    const optionText = option.trim();
    // Simple includes check that works with Arabic
    return optionText.includes(searchLower) || 
           optionText.toLowerCase().includes(searchLower.toLowerCase());
  });

  // Get display value
  const displayValue = value || '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (isDisabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleInputClick = () => {
    if (!isDisabled && !isOpen) {
      setIsOpen(true);
      setSearchTerm('');
      // Auto-focus input after opening
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleInputFocus = () => {
    if (!isDisabled && !isOpen) {
      setIsOpen(true);
      setSearchTerm('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <Box ref={wrapperRef} position="relative" {...rest}>
      <Flex
        align="center"
        position="relative"
        borderRadius="10px"
        borderWidth="2px"
        borderColor={isOpen ? focusBorderColor : borderColor}
        bg={isDisabled ? disabledBgColor : bgColor}
        transition="all 0.2s"
        _hover={{
          borderColor: isDisabled ? borderColor : hoverBorderColor,
          boxShadow: isDisabled ? 'none' : '0 0 0 1px rgba(34, 77, 89, 0.1)',
        }}
      >
        <Input
          ref={inputRef}
          value={isOpen ? searchTerm : displayValue}
          onChange={handleSearchChange}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={!isOpen && displayValue ? '' : placeholder}
          size={size}
          border="none"
          bg="transparent"
          color={labelColor}
          fontWeight="500"
          isDisabled={isDisabled}
          dir="rtl"
          textAlign="right"
          cursor={isDisabled ? 'not-allowed' : 'text'}
          _focus={{
            outline: 'none',
            boxShadow: 'none',
          }}
          _placeholder={{
            color: 'gray.400',
            fontWeight: '400',
          }}
        />
        <Icon
          as={isOpen ? ChevronUpIcon : ChevronDownIcon}
          position="absolute"
          left="12px"
          color={labelColor}
          boxSize={5}
          pointerEvents="none"
        />
      </Flex>

      {isOpen && !isDisabled && (
        <List
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={1}
          maxH="250px"
          overflowY="auto"
          bg={listBgColor}
          borderRadius="10px"
          borderWidth="2px"
          borderColor={focusBorderColor}
          boxShadow="lg"
          zIndex={1000}
          py={2}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <ListItem
                key={option}
                px={4}
                py={3}
                cursor="pointer"
                bg={
                  value === option
                    ? selectedBgColor
                    : highlightedIndex === index
                    ? hoverBgColor
                    : 'transparent'
                }
                _hover={{ bg: hoverBgColor }}
                onClick={() => handleSelect(option)}
                dir="rtl"
                textAlign="right"
                transition="background 0.15s"
              >
                <Text
                  fontWeight={value === option ? '600' : '500'}
                  color={labelColor}
                >
                  {option}
                </Text>
              </ListItem>
            ))
          ) : (
            <ListItem px={4} py={3} dir="rtl" textAlign="right">
              <Text color="gray.500" fontSize="sm">
                لا توجد نتائج
              </Text>
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
}
