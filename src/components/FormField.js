import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

export function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  options = [],
  required = false,
  disabled = false,
  placeholder = ''
}) {
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const focusBorderColor = useColorModeValue('#224D59', 'teal.400');
  const hoverBorderColor = useColorModeValue('gray.400', 'gray.500');
  const bgColor = useColorModeValue('white', 'gray.800');
  const disabledBgColor = useColorModeValue('gray.50', 'gray.700');
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');
  
  return (
    <FormControl isRequired={required} isDisabled={disabled} mb={6}>
      <FormLabel 
        htmlFor={name} 
        fontSize="sm" 
        fontWeight="600" 
        color={labelColor}
        mb={2}
        display="flex"
        alignItems="center"
      >
        {label}
      </FormLabel>
      {type === 'select' ? (
        <Select
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `اختر ${label}`}
          size="lg"
          borderRadius="10px"
          borderWidth="2px"
          borderColor={borderColor}
          bg={disabled ? disabledBgColor : bgColor}
          color={labelColor}
          fontWeight="500"
          transition="all 0.2s"
          dir="rtl"
          textAlign="right"
          paddingLeft="16px"
          paddingRight="16px"
          icon={<Box />}
          _hover={{
            borderColor: disabled ? borderColor : hoverBorderColor,
            boxShadow: disabled ? 'none' : '0 0 0 1px rgba(34, 77, 89, 0.1)',
          }}
          _focus={{
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 3px rgba(34, 77, 89, 0.1)`,
            outline: 'none',
          }}
          _placeholder={{
            color: placeholderColor,
            fontWeight: '400',
          }}
          sx={{
            '& option': {
              bg: bgColor,
              color: labelColor,
              padding: '8px',
              direction: 'rtl',
              textAlign: 'right',
            },
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
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
          borderColor={borderColor}
          bg={disabled ? disabledBgColor : bgColor}
          color={labelColor}
          fontWeight="500"
          transition="all 0.2s"
          _hover={{
            borderColor: disabled ? borderColor : hoverBorderColor,
            boxShadow: disabled ? 'none' : '0 0 0 1px rgba(34, 77, 89, 0.1)',
          }}
          _focus={{
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 3px rgba(34, 77, 89, 0.1)`,
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
