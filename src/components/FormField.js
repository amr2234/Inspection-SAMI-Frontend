import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchableSelect } from './SearchableSelect';

export function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  options = [],
  required = false,
  disabled = false,
  placeholder = '',
  size = 'lg',
  error = false,
  errorMessage = ''
}) {
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const focusBorderColor = useColorModeValue('#224D59', 'teal.400');
  const hoverBorderColor = useColorModeValue('gray.400', 'gray.500');
  const bgColor = useColorModeValue('white', 'gray.800');
  const disabledBgColor = useColorModeValue('gray.50', 'gray.700');
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');
  const errorBorderColor = useColorModeValue('red.500', 'red.400');
  const errorBgColor = useColorModeValue('red.50', 'red.900');
  
  return (
    <FormControl isRequired={required} isDisabled={disabled} isInvalid={error} mb={6}>
      <FormLabel 
        htmlFor={name} 
        fontSize="sm" 
        fontWeight="600" 
        color={error ? 'red.500' : labelColor}
        mb={2}
        display="flex"
        alignItems="center"
      >
        {label}
        {error && errorMessage && (
          <Text as="span" fontSize="xs" color="red.500" mr={2} fontWeight="normal">
            ({errorMessage})
          </Text>
        )}
      </FormLabel>
      {type === 'select' ? (
        <Box
          borderRadius="10px"
          borderWidth={error ? "3px" : "0px"}
          borderColor={error ? errorBorderColor : "transparent"}
          bg={error ? errorBgColor : "transparent"}
          animation={error ? "shake 0.3s" : "none"}
          sx={{
            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0)' },
              '25%': { transform: 'translateX(-5px)' },
              '75%': { transform: 'translateX(5px)' },
            },
          }}
        >
          <SearchableSelect
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder || `اختر ${label}`}
            isDisabled={disabled}
            size={size}
          />
        </Box>
      ) : (
        <Input
          id={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          size="lg"
          borderRadius="10px"
          borderWidth="2px"
          borderColor={error ? errorBorderColor : borderColor}
          bg={error ? errorBgColor : (disabled ? disabledBgColor : bgColor)}
          color={labelColor}
          fontWeight="500"
          transition="all 0.2s"
          animation={error ? "shake 0.3s" : "none"}
          sx={{
            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0)' },
              '25%': { transform: 'translateX(-5px)' },
              '75%': { transform: 'translateX(5px)' },
            },
          }}
          _hover={{
            borderColor: error ? errorBorderColor : (disabled ? borderColor : hoverBorderColor),
            boxShadow: disabled ? 'none' : (error ? '0 0 0 1px rgba(245, 101, 101, 0.3)' : '0 0 0 1px rgba(34, 77, 89, 0.1)'),
          }}
          _focus={{
            borderColor: error ? errorBorderColor : focusBorderColor,
            boxShadow: error ? `0 0 0 3px rgba(245, 101, 101, 0.2)` : `0 0 0 3px rgba(34, 77, 89, 0.1)`,
            outline: 'none',
          }}
          _placeholder={{
            color: placeholderColor,
            fontWeight: '400',
          }}
        />
      )}
    </FormControl>
  );
}
