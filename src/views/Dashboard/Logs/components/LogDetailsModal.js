import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Box,
  Text,
  Badge,
  Divider,
  Code,
  useColorModeValue,
} from '@chakra-ui/react';

const LogDetailsModal = ({ isOpen, onClose, log }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const codeColor = useColorModeValue('gray.800', 'gray.100');

  if (!log) return null;

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

  const getErrorTypeLabel = (errorType) => {
    switch (errorType) {
      case 'Validation':
        return 'خطأ تحقق';
      case 'Network':
        return 'خطأ شبكة';
      case 'Server':
        return 'خطأ خادم';
      case 'Unknown':
        return 'خطأ غير معروف';
      default:
        return errorType;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent dir="rtl">
        <ModalHeader>تفاصيل السجل</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Basic Info */}
            <Box>
              <Text fontSize="sm" color="gray.500" mb={1}>
                التوقيت
              </Text>
              <Text fontWeight="semibold">
                {new Date(log.timestamp).toLocaleString('ar-SA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </Text>
            </Box>

            <Divider />

            {/* Type and Severity */}
            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>
                النوع والخطورة
              </Text>
              <Box display="flex" gap={2}>
                <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                  {getTypeLabel(log.type)}
                </Badge>
                <Badge colorScheme={getSeverityColor(log.severity)} fontSize="md" px={3} py={1}>
                  {log.severity}
                </Badge>
                {log.errorType && (
                  <Badge colorScheme="red" fontSize="md" px={3} py={1}>
                    {getErrorTypeLabel(log.errorType)}
                  </Badge>
                )}
              </Box>
            </Box>

            <Divider />

            {/* User Info */}
            {log.user && (
              <>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    المستخدم
                  </Text>
                  <VStack align="stretch" spacing={1}>
                    <Text fontWeight="semibold">{log.user.name}</Text>
                    <Text fontSize="sm" color="gray.600">{log.user.email}</Text>
                    <Text fontSize="xs" color="gray.500">ID: {log.user.id}</Text>
                  </VStack>
                </Box>
                <Divider />
              </>
            )}

            {/* Message */}
            <Box>
              <Text fontSize="sm" color="gray.500" mb={2}>
                الرسالة
              </Text>
              <Text>{log.message}</Text>
            </Box>

            <Divider />

            {/* Details/Payload */}
            {log.details && (
              <Box>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  التفاصيل الكاملة
                </Text>
                <Box
                  bg={bgColor}
                  p={4}
                  borderRadius="md"
                  border="1px"
                  borderColor={borderColor}
                  maxH="300px"
                  overflowY="auto"
                >
                  <Code
                    display="block"
                    whiteSpace="pre-wrap"
                    children={JSON.stringify(log.details, null, 2)}
                    fontSize="sm"
                    color={codeColor}
                    bg="transparent"
                    p={0}
                  />
                </Box>
              </Box>
            )}

            {/* Stack Trace (if error) */}
            {log.details?.stackTrace && (
              <>
                <Divider />
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    تتبع الخطأ (Stack Trace)
                  </Text>
                  <Box
                    bg={bgColor}
                    p={4}
                    borderRadius="md"
                    border="1px"
                    borderColor={borderColor}
                    maxH="200px"
                    overflowY="auto"
                  >
                    <Code
                      display="block"
                      whiteSpace="pre-wrap"
                      children={log.details.stackTrace}
                      fontSize="xs"
                      color="red.600"
                      bg="transparent"
                      p={0}
                      fontFamily="monospace"
                    />
                  </Box>
                </Box>
              </>
            )}

            {/* Log ID */}
            <Box>
              <Text fontSize="xs" color="gray.400">
                معرف السجل: {log.id}
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>إغلاق</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogDetailsModal;
