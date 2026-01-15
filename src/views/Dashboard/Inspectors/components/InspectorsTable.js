import React, { useState, useCallback } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  HStack,
  Switch,
  Text,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';
import inspectorService from 'services/inspectorService';

const InspectorsTable = React.memo(({ inspectors, onRefresh }) => {
  const history = useHistory();
  const toast = useToast();
  const [loading, setLoading] = useState(null);
  const cancelRef = React.useRef();
  
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <Badge colorScheme="green" fontSize="sm">نشط</Badge>
    ) : (
      <Badge colorScheme="gray" fontSize="sm">غير نشط</Badge>
    );
  };

  const handleView = useCallback((inspectorId) => {
    history.push(`/admin/inspectors-list/${inspectorId}`);
  }, [history]);

  const handleToggleActive = useCallback(async (inspector) => {
    setLoading(inspector.id);
    try {
      await inspectorService.toggleInspectorActive(inspector.id);
      toast({
        title: 'تم التحديث',
        description: `تم ${inspector.isActive ? 'تعطيل' : 'تفعيل'} المفتش بنجاح`,
        status: 'success',
        duration: 3000,
      });
      onRefresh();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(null);
    }
  }, [toast, onRefresh]);

  return (
    <Table variant="simple" colorScheme="gray">
      <Thead>
        <Tr>
          <Th textAlign="right" borderColor={borderColor}>رقم المفتش</Th>
          <Th textAlign="right" borderColor={borderColor}>الاسم</Th>
          <Th textAlign="right" borderColor={borderColor}>المنطقة</Th>
          <Th textAlign="center" borderColor={borderColor}>الزيارات</Th>
          <Th textAlign="center" borderColor={borderColor}>الحالة</Th>
          <Th textAlign="center" borderColor={borderColor}>الإجراءات</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inspectors.map((inspector) => (
          <Tr key={inspector.id}>
            <Td textAlign="right" borderColor={borderColor}>
              <Text fontWeight="semibold" color={textColor} fontSize="sm">
                {inspector.id}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {inspector.employeeId}
              </Text>
            </Td>
            <Td textAlign="right" borderColor={borderColor}>
              <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                {inspector.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {inspector.email}
              </Text>
            </Td>
            <Td textAlign="right" borderColor={borderColor}>
              <Text fontSize="sm" color={textColor}>
                {inspector.region}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {inspector.city}
              </Text>
            </Td>
            <Td textAlign="center" borderColor={borderColor}>
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                {inspector.totalInspections}
              </Text>
              <Text fontSize="xs" color="gray.500">
                زيارة
              </Text>
            </Td>
            <Td textAlign="center" borderColor={borderColor}>
              {getStatusBadge(inspector.isActive)}
            </Td>
            <Td textAlign="center" borderColor={borderColor}>
              <HStack spacing={1} justify="center">
                <IconButton
                  icon={<ViewIcon />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => handleView(inspector.id)}
                  aria-label="عرض"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});

InspectorsTable.displayName = 'InspectorsTable';

export default InspectorsTable;
