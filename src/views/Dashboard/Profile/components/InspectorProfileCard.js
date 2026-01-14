import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

const InspectorProfileCard = ({ inspector }) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.500', 'gray.400');

  const getRoleBadge = (role) => {
    return role === 'SystemAdmin' ? (
      <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
        مدير النظام
      </Badge>
    ) : (
      <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
        مفتش
      </Badge>
    );
  };

  const getVerifiedBadge = (isVerified) => {
    return isVerified ? (
      <Badge colorScheme="green" fontSize="md" px={3} py={1}>
        موثق ✓
      </Badge>
    ) : (
      <Badge colorScheme="gray" fontSize="md" px={3} py={1}>
        غير موثق
      </Badge>
    );
  };

  const getActiveBadge = (isActive) => {
    return isActive ? (
      <Badge colorScheme="green" fontSize="md" px={3} py={1}>
        نشط
      </Badge>
    ) : (
      <Badge colorScheme="red" fontSize="md" px={3} py={1}>
        غير نشط
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          الملف الشخصي
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          {/* Avatar and Name */}
          <Flex align="center" gap={4}>
            <Avatar
              size="xl"
              name={inspector.name}
              bg="#224D59"
              color="white"
            />
            <Box flex={1}>
              <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={2}>
                {inspector.name}
              </Text>
              <HStack spacing={2}>
                {getRoleBadge(inspector.role)}
                {getActiveBadge(inspector.isActive)}
                {getVerifiedBadge(inspector.isVerified)}
              </HStack>
            </Box>
          </Flex>

          <Divider borderColor={borderColor} />

          {/* Personal Information */}
          <VStack spacing={3} align="stretch">
            <Box>
              <Text fontSize="sm" color={labelColor} mb={1}>
                البريد الإلكتروني
              </Text>
              <Text fontSize="md" color={textColor} fontWeight="medium">
                {inspector.email}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor} mb={1}>
                رقم الهوية الوطنية
              </Text>
              <Text fontSize="md" color={textColor} fontWeight="medium">
                {inspector.nationalId}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor} mb={1}>
                رقم الموظف
              </Text>
              <Text fontSize="md" color={textColor} fontWeight="medium">
                {inspector.employeeId}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={labelColor} mb={1}>
                تاريخ الإنشاء
              </Text>
              <Text fontSize="md" color={textColor} fontWeight="medium">
                {new Date(inspector.createdAt).toLocaleDateString('ar-SA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </Box>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default InspectorProfileCard;
