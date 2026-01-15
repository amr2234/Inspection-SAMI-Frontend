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
  Button,
  Text,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ViewIcon, EditIcon } from '@chakra-ui/icons';
import { FaArchive } from 'react-icons/fa';
import visitService from 'services/visitService';

const VisitsTable = React.memo(({ visits, onRefresh, currentUserRole = 'Inspector' }) => {
  const history = useHistory();
  const toast = useToast();
  const [loading, setLoading] = useState(null);
  const [archiveId, setArchiveId] = useState(null);
  const cancelRef = React.useRef();
  
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');

  const getComplianceStatusBadge = (status) => {
    switch (status) {
      case 'Compliant':
        return <Badge colorScheme="green" fontSize="sm">متوافق</Badge>;
      case 'NonCompliant':
        return <Badge colorScheme="red" fontSize="sm">غير متوافق</Badge>;
      case 'UnderReview':
        return <Badge colorScheme="orange" fontSize="sm">قيد المراجعة</Badge>;
      default:
        return <Badge colorScheme="gray" fontSize="sm">{status}</Badge>;
    }
  };

  const getStatusBadge = (isArchived) => {
    return isArchived ? (
      <Badge colorScheme="gray" fontSize="sm">مؤرشف</Badge>
    ) : (
      <Badge colorScheme="green" fontSize="sm">نشط</Badge>
    );
  };

  const getVisitCategoryBadge = (category) => {
    switch (category) {
      case 'مجدولة':
        return <Badge colorScheme="blue" fontSize="sm">مجدولة</Badge>;
      case 'معاودة':
        return <Badge colorScheme="orange" fontSize="sm">معاودة</Badge>;
      case 'بلاغ':
        return <Badge colorScheme="purple" fontSize="sm">بلاغ</Badge>;
      default:
        return <Badge colorScheme="gray" fontSize="sm">{category || 'غير محدد'}</Badge>;
    }
  };

  const handleView = useCallback((visitId) => {
    history.push(`/admin/visits/${visitId}`);
  }, [history]);

  const handleEdit = useCallback((visitId) => {
    history.push(`/admin/visits/${visitId}/edit`);
  }, [history]);

  const handleArchive = useCallback(async () => {
    setLoading(archiveId);
    try {
      await visitService.archiveVisit(archiveId);
      toast({
        title: 'تم الأرشفة',
        description: 'تم أرشفة الزيارة بنجاح',
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
      setArchiveId(null);
      setLoading(null);
    }
  }, [archiveId, toast, onRefresh]);

  const canEditVisit = (visit) => {
    // SystemAdmin can edit any visit
    if (currentUserRole === 'SystemAdmin') return true;
    // Inspector can edit only if backend says canEdit=true
    return visit.canEdit;
  };

  return (
    <>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="right" borderColor={borderColor}>رقم الزيارة</Th>
            <Th textAlign="right" borderColor={borderColor}>التاريخ والوقت</Th>
            <Th textAlign="right" borderColor={borderColor}>اسم المنشأة</Th>
            <Th textAlign="right" borderColor={borderColor}>المنطقة/المدينة</Th>
            <Th textAlign="center" borderColor={borderColor}>نوع الزيارة</Th>
            <Th textAlign="center" borderColor={borderColor}>حالة الامتثال</Th>
            <Th textAlign="center" borderColor={borderColor}>المخالفات</Th>
            <Th textAlign="center" borderColor={borderColor}>العينات</Th>
            <Th textAlign="center" borderColor={borderColor}>الغرامات</Th>
            <Th textAlign="center" borderColor={borderColor}>الحالة</Th>
            <Th textAlign="center" borderColor={borderColor}>الإجراءات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {visits.map((visit) => (
            <Tr key={visit.id}>
              <Td textAlign="right" borderColor={borderColor}>
                <Text fontWeight="semibold" color={textColor} fontSize="sm">
                  {visit.id}
                </Text>
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                <Text fontSize="sm" color={textColor}>
                  {new Date(visit.dateTime).toLocaleString('ar-SA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  {visit.establishmentName}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {visit.establishmentCode}
                </Text>
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                <Text fontSize="sm" color={textColor}>
                  {visit.region}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {visit.city}
                </Text>
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                {getVisitCategoryBadge(visit.visitCategory)}
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                {getComplianceStatusBadge(visit.complianceStatus)}
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                <Text fontSize="lg" fontWeight="bold" color={visit.violationsCount > 0 ? 'red.500' : textColor}>
                  {visit.violationsCount}
                </Text>
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  {visit.samplesCount}
                </Text>
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                <Text fontSize="sm" fontWeight="bold" color={visit.finesTotal > 0 ? 'orange.500' : textColor}>
                  {visit.finesTotal.toLocaleString('ar-SA')}
                </Text>
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                {getStatusBadge(visit.isArchived)}
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                <HStack spacing={1} justify="center">
                  <IconButton
                    icon={<ViewIcon />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => handleView(visit.id)}
                    aria-label="عرض"
                  />
                  {canEditVisit(visit) && !visit.isArchived && (
                    <IconButton
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="teal"
                      variant="ghost"
                      onClick={() => handleEdit(visit.id)}
                      aria-label="تعديل"
                    />
                  )}
                  {!visit.isArchived && (
                    <IconButton
                      icon={<FaArchive />}
                      size="sm"
                      colorScheme="orange"
                      variant="ghost"
                      onClick={() => setArchiveId(visit.id)}
                      isLoading={loading === visit.id}
                      aria-label="أرشفة"
                    />
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Archive Confirmation Dialog */}
      <AlertDialog
        isOpen={archiveId !== null}
        leastDestructiveRef={cancelRef}
        onClose={() => setArchiveId(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              تأكيد الأرشفة
            </AlertDialogHeader>

            <AlertDialogBody>
              هل أنت متأكد من أرشفة هذه الزيارة؟ يمكنك استعادتها لاحقاً من الزيارات المؤرشفة.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setArchiveId(null)}>
                إلغاء
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleArchive}
                ml={3}
                isLoading={loading === archiveId}
              >
                أرشفة
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
});

export default VisitsTable;
