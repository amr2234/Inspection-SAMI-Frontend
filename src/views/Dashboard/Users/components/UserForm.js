import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  VStack,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import userService from 'services/userService';

const UserForm = ({ isOpen, onClose, user, onSuccess }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nationalId: '',
    employeeId: '',
    role: 'Inspector',
    branch: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  const isEditMode = !!user;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        nationalId: user.nationalId,
        employeeId: user.employeeId,
        role: user.role,
        branch: user.branch || '',
        isActive: user.isActive
      });
    } else {
      setFormData({
        name: '',
        email: '',
        nationalId: '',
        employeeId: '',
        role: 'Inspector',
        branch: '',
        isActive: true
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }
    
    if (!formData.nationalId || formData.nationalId.length < 10 || formData.nationalId.length > 14) {
      newErrors.nationalId = 'رقم الهوية يجب أن يكون بين 10-14 رقم';
    }
    
    if (!/^\d+$/.test(formData.nationalId)) {
      newErrors.nationalId = 'رقم الهوية يجب أن يحتوي على أرقام فقط';
    }
    
    if (!formData.employeeId) {
      newErrors.employeeId = 'رقم الموظف مطلوب';
    }
    
    // Validate branch if role is BranchManager
    if (formData.role === 'BranchManager' && !formData.branch) {
      newErrors.branch = 'يجب اختيار الفرع';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        await userService.updateUser(user.id, formData);
        toast({
          title: 'تم التحديث بنجاح',
          description: 'تم تحديث بيانات المستخدم',
          status: 'success',
          duration: 3000,
        });
      } else {
        await userService.createUser(formData);
        toast({
          title: 'تم الإنشاء بنجاح',
          description: 'تم إنشاء مستخدم جديد',
          status: 'success',
          duration: 3000,
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent dir="rtl">
        <ModalHeader>{isEditMode ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel>الاسم</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل الاسم الكامل"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.email} isDisabled={isEditMode}>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@domain.com"
                bg={isEditMode ? 'gray.100' : 'white'}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.nationalId}>
              <FormLabel>رقم الهوية الوطنية</FormLabel>
              <Input
                value={formData.nationalId}
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                placeholder="1234567890"
                maxLength={14}
              />
              <FormErrorMessage>{errors.nationalId}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.employeeId}>
              <FormLabel>رقم الموظف</FormLabel>
              <Input
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                placeholder="EMP001"
              />
              <FormErrorMessage>{errors.employeeId}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>الدور الوظيفي</FormLabel>
              <Select
                value={formData.role}
                onChange={(e) => {
                  const newRole = e.target.value;
                  setFormData({ 
                    ...formData, 
                    role: newRole,
                    // Clear branch if not BranchManager
                    branch: newRole === 'BranchManager' ? formData.branch : ''
                  });
                }}
              >
                <option value="Inspector">مفتش</option>
                <option value="BranchManager">مدير فرع</option>
                <option value="SystemAdmin">مدير النظام</option>
              </Select>
            </FormControl>

            {/* Show branch dropdown only if role is BranchManager */}
            {formData.role === 'BranchManager' && (
              <FormControl isRequired isInvalid={errors.branch}>
                <FormLabel>الفرع</FormLabel>
                <Select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="اختر الفرع"
                >
                  <option value="الفرع الرئيسي">الفرع الرئيسي</option>
                  <option value="الفرع الشمالي">الفرع الشمالي</option>
                  <option value="الفرع الجنوبي">الفرع الجنوبي</option>
                  <option value="الفرع الشرقي">الفرع الشرقي</option>
                  <option value="الفرع الغربي">الفرع الغربي</option>
                </Select>
                <FormErrorMessage>{errors.branch}</FormErrorMessage>
              </FormControl>
            )}

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">نشط</FormLabel>
              <Switch
                isChecked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                colorScheme="green"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" ml={3} onClick={onClose}>
            إلغاء
          </Button>
          <Button
            bg="#224D59"
            color="white"
            onClick={handleSubmit}
            isLoading={loading}
            _hover={{ bg: '#346860' }}
          >
            {isEditMode ? 'تحديث' : 'إضافة'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserForm;
