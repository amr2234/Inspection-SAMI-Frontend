import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  Divider,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ViewIcon, CalendarIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt, FaBuilding, FaExclamationTriangle, FaMoneyBillWave } from 'react-icons/fa';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

const LatestVisitCard = ({ visit }) => {
  const history = useHistory();
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const getComplianceStatusBadge = (status) => {
    return status === 'Compliant' ? (
      <Badge colorScheme="green" fontSize="md" px={3} py={1}>
        متوافق
      </Badge>
    ) : (
      <Badge colorScheme="red" fontSize="md" px={3} py={1}>
        غير متوافق
      </Badge>
    );
  };

  if (!visit) {
    return (
      <Card>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            آخر زيارة تفتيشية
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column" align="center" justify="center" py={10}>
            <Icon as={CalendarIcon} w={12} h={12} color="gray.300" mb={4} />
            <Text color="gray.500" textAlign="center">
              لا توجد زيارات تفتيشية بعد
            </Text>
          </Flex>
        </CardBody>
      </Card>
    );
  }

  const handleViewDetails = () => {
    history.push(`/visits/${visit.id}`);
  };

  const handleViewAllVisits = () => {
    history.push('/visits?assignedTo=me');
  };

  return (
    <Card>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            آخر زيارة تفتيشية
          </Text>
          {getComplianceStatusBadge(visit.complianceStatus)}
        </Flex>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          {/* Visit Date & Time */}
          <Box bg={bgColor} p={3} borderRadius="md">
            <HStack spacing={2} mb={1}>
              <Icon as={CalendarIcon} color="#224D59" />
              <Text fontSize="sm" color={labelColor}>
                تاريخ ووقت الزيارة
              </Text>
            </HStack>
            <Text fontSize="md" fontWeight="semibold" color={textColor}>
              {new Date(visit.visitDateTime).toLocaleString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </Box>

          {/* Establishment Name */}
          <Box>
            <HStack spacing={2} mb={1}>
              <Icon as={FaBuilding} color="#224D59" />
              <Text fontSize="sm" color={labelColor}>
                اسم المنشأة
              </Text>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {visit.facilityName}
            </Text>
            <Text fontSize="sm" color={labelColor}>
              {visit.facilityCode}
            </Text>
          </Box>

          {/* Region / City */}
          <Box>
            <HStack spacing={2} mb={1}>
              <Icon as={FaMapMarkerAlt} color="#224D59" />
              <Text fontSize="sm" color={labelColor}>
                المنطقة / المدينة
              </Text>
            </HStack>
            <Text fontSize="md" fontWeight="medium" color={textColor}>
              {visit.region} / {visit.city}
            </Text>
          </Box>

          <Divider borderColor={borderColor} />

          {/* Statistics Grid */}
          <HStack spacing={4} justify="space-between">
            <Box flex={1} textAlign="center" p={3} bg={bgColor} borderRadius="md">
              <Icon as={FaExclamationTriangle} w={6} h={6} color="orange.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {visit.totalViolations || 0}
              </Text>
              <Text fontSize="xs" color={labelColor}>
                المخالفات
              </Text>
            </Box>

            <Box flex={1} textAlign="center" p={3} bg={bgColor} borderRadius="md">
              <Icon as={ViewIcon} w={6} h={6} color="blue.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {visit.totalSamples || 0}
              </Text>
              <Text fontSize="xs" color={labelColor}>
                العينات
              </Text>
            </Box>

            <Box flex={1} textAlign="center" p={3} bg={bgColor} borderRadius="md">
              <Icon as={FaMoneyBillWave} w={6} h={6} color="green.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {visit.totalFine?.toLocaleString('ar-SA') || 0}
              </Text>
              <Text fontSize="xs" color={labelColor}>
                الغرامات (ريال)
              </Text>
            </Box>
          </HStack>

          <Divider borderColor={borderColor} />

          {/* Action Buttons */}
          <VStack spacing={2}>
            <Button
              width="100%"
              bg="#224D59"
              color="white"
              _hover={{ bg: '#346860' }}
              onClick={handleViewDetails}
              leftIcon={<ViewIcon />}
            >
              عرض تفاصيل الزيارة
            </Button>
            <Button
              width="100%"
              variant="outline"
              borderColor="#224D59"
              color="#224D59"
              _hover={{ bg: 'gray.50' }}
              onClick={handleViewAllVisits}
            >
              عرض جميع زياراتي
            </Button>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default LatestVisitCard;
