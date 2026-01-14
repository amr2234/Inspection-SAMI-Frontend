import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Text,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

const LogsTable = React.memo(({ logs, onViewDetails }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Info':
        return 'blue';
      case 'Warning':
        return 'orange';
      case 'Error':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'UserCreated':
        return 'إنشاء مستخدم';
      case 'FormSubmitted':
        return 'تقديم نموذج';
      case 'Error':
        return 'خطأ';
      default:
        return type;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'UserCreated':
        return 'green';
      case 'FormSubmitted':
        return 'purple';
      case 'Error':
        return 'red';
      default:
        return 'gray';
    }
  };

  const truncateMessage = (message, maxLength = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <Table variant="simple" colorScheme="gray">
      <Thead>
        <Tr>
          <Th textAlign="right" borderColor={borderColor}>التوقيت</Th>
          <Th textAlign="right" borderColor={borderColor}>النوع</Th>
          <Th textAlign="center" borderColor={borderColor}>الخطورة</Th>
          <Th textAlign="right" borderColor={borderColor}>المستخدم</Th>
          <Th textAlign="right" borderColor={borderColor}>الرسالة</Th>
          <Th textAlign="center" borderColor={borderColor}>الإجراءات</Th>
        </Tr>
      </Thead>
      <Tbody>
        {logs.map((log) => (
          <Tr key={log.id}>
            <Td textAlign="right" borderColor={borderColor}>
              <Text fontSize="sm" color={textColor}>
                {new Date(log.timestamp).toLocaleString('ar-SA', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </Td>
            <Td textAlign="right" borderColor={borderColor}>
              <Badge colorScheme={getTypeColor(log.type)} fontSize="sm">
                {getTypeLabel(log.type)}
              </Badge>
            </Td>
            <Td textAlign="center" borderColor={borderColor}>
              <Badge colorScheme={getSeverityColor(log.severity)} fontSize="sm">
                {log.severity}
              </Badge>
            </Td>
            <Td textAlign="right" borderColor={borderColor}>
              {log.user ? (
                <div>
                  <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                    {log.user.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {log.user.email}
                  </Text>
                </div>
              ) : (
                <Text fontSize="sm" color="gray.400">
                  -
                </Text>
              )}
            </Td>
            <Td textAlign="right" borderColor={borderColor}>
              <Tooltip label={log.message} placement="top">
                <Text fontSize="sm" color={textColor}>
                  {truncateMessage(log.message)}
                </Text>
              </Tooltip>
            </Td>
            <Td textAlign="center" borderColor={borderColor}>
              <IconButton
                icon={<ViewIcon />}
                size="sm"
                colorScheme="blue"
                variant="ghost"
                onClick={() => onViewDetails(log)}
                aria-label="عرض التفاصيل"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});

export default LogsTable;
