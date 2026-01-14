import React, { useState, useCallback } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Switch,
  IconButton,
  HStack,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import userService from 'services/userService';

const UsersTable = React.memo(({ users, onEdit, onRefresh }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = React.useRef();
  
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');

  const handleToggleActive = useCallback(async (user) => {
    setLoading(user.id);
    try {
      await userService.toggleUserActive(user.id);
      toast({
        title: 'تم التحديث',
        description: `تم ${user.isActive ? 'تعطيل' : 'تفعيل'} المستخدم بنجاح`,
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

  const handleDelete = useCallback(async () => {
    setLoading(deleteId);
    try {
      await userService.deleteUser(deleteId);
      toast({
        title: 'تم الحذف',
        description: 'تم حذف المستخدم بنجاح',
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
      setDeleteId(null);
      setLoading(null);
    }
  }, [deleteId, toast, onRefresh]);

  const getRoleBadge = (role) => {
    return role === 'SystemAdmin' ? (
      <Badge colorScheme="purple">مدير النظام</Badge>
    ) : (
      <Badge colorScheme="blue">مفتش</Badge>
    );
  };

  const getVerifiedBadge = (isVerified) => {
    return isVerified ? (
      <Badge colorScheme="green">موثق</Badge>
    ) : (
      <Badge colorScheme="gray">غير موثق</Badge>
    );
  };

  return (
    <>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="right" borderColor={borderColor}>الاسم</Th>
            <Th textAlign="right" borderColor={borderColor}>البريد الإلكتروني</Th>
            <Th textAlign="right" borderColor={borderColor}>رقم الهوية</Th>
            <Th textAlign="right" borderColor={borderColor}>رقم الموظف</Th>
            <Th textAlign="right" borderColor={borderColor}>الدور</Th>
            <Th textAlign="center" borderColor={borderColor}>نشط</Th>
            <Th textAlign="center" borderColor={borderColor}>موثق</Th>
            <Th textAlign="right" borderColor={borderColor}>تاريخ الإنشاء</Th>
            <Th textAlign="center" borderColor={borderColor}>الإجراءات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td textAlign="right" borderColor={borderColor}>
                <Text fontWeight="semibold" color={textColor}>{user.name}</Text>
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                <Text fontSize="sm" color="gray.500">{user.email}</Text>
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                {user.nationalId}
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                {user.employeeId}
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                {getRoleBadge(user.role)}
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                <Switch
                  isChecked={user.isActive}
                  onChange={() => handleToggleActive(user)}
                  colorScheme="green"
                  isDisabled={loading === user.id}
                />
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                {getVerifiedBadge(user.isVerified)}
              </Td>
              <Td textAlign="right" borderColor={borderColor}>
                <Text fontSize="sm" color="gray.500">
                  {new Date(user.createdAt).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
              </Td>
              <Td textAlign="center" borderColor={borderColor}>
                <HStack spacing={2} justify="center">
                  <IconButton
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => onEdit(user)}
                    aria-label="تعديل"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => setDeleteId(user.id)}
                    isLoading={loading === user.id}
                    aria-label="حذف"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={deleteId !== null}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteId(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              تأكيد الحذف
            </AlertDialogHeader>

            <AlertDialogBody>
              هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDeleteId(null)}>
                إلغاء
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={loading === deleteId}
              >
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
});

export default UsersTable;
