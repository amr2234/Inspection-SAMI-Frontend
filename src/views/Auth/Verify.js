import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  VStack,
  Icon,
  Progress,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { ViewIcon, ViewOffIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import authService from 'services/authService';

export default function Verify() {
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();

  // Get email from URL params or location state
  const searchParams = new URLSearchParams(location.search);
  const emailFromUrl = searchParams.get('email');
  const emailFromState = location.state?.email;
  const userEmail = emailFromUrl || emailFromState;

  // Step control
  const [step, setStep] = useState(1); // 1: OTP, 2: Password

  // OTP State
  const [otp, setOtp] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  // Password State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [settingPassword, setSettingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  // Colors
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Redirect if no email
  useEffect(() => {
    if (!userEmail) {
      toast({
        title: 'خطأ',
        description: 'البريد الإلكتروني مفقود. يرجى المحاولة مرة أخرى.',
        status: 'error',
        duration: 5000,
      });
      history.push('/auth/signin');
    }
  }, [userEmail, history, toast]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Password validation
  const validatePassword = (pass) => {
    const errors = [];
    if (pass.length < 8) {
      errors.push('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
    }
    if (!/[A-Z]/.test(pass)) {
      errors.push('يجب أن تحتوي على حرف كبير واحد على الأقل');
    }
    if (!/[a-z]/.test(pass)) {
      errors.push('يجب أن تحتوي على حرف صغير واحد على الأقل');
    }
    if (!/[0-9]/.test(pass)) {
      errors.push('يجب أن تحتوي على رقم واحد على الأقل');
    }
    return errors;
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'خطأ',
        description: 'يرجى إدخال رمز التحقق المكون من 6 أرقام',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setVerifyingOtp(true);
    try {
      await authService.verifyEmail({ email: userEmail, otp });
      toast({
        title: 'تم التحقق بنجاح',
        description: 'تم التحقق من بريدك الإلكتروني. يرجى إنشاء كلمة مرور.',
        status: 'success',
        duration: 3000,
      });
      setStep(2);
    } catch (error) {
      toast({
        title: 'فشل التحقق',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setResending(true);
    try {
      await authService.resendOtp({ email: userEmail });
      toast({
        title: 'تم الإرسال',
        description: 'تم إرسال رمز التحقق الجديد إلى بريدك الإلكتروني',
        status: 'success',
        duration: 3000,
      });
      setResendCooldown(60);
      setOtp('');
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setResending(false);
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
  };

  // Handle set password
  const handleSetPassword = async () => {
    // Validate password
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      toast({
        title: 'خطأ',
        description: 'كلمات المرور غير متطابقة',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setSettingPassword(true);
    try {
      await authService.setPassword({ email: userEmail, password });
      toast({
        title: 'تم بنجاح',
        description: 'تم إنشاء كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.',
        status: 'success',
        duration: 5000,
      });
      setTimeout(() => {
        history.push('/auth/signin');
      }, 2000);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setSettingPassword(false);
    }
  };

  // Get password strength
  const getPasswordStrength = () => {
    if (!password) return { value: 0, color: 'gray', label: '' };
    const errors = validatePassword(password);
    if (errors.length === 0) return { value: 100, color: 'green', label: 'قوية' };
    if (errors.length <= 2) return { value: 60, color: 'orange', label: 'متوسطة' };
    return { value: 30, color: 'red', label: 'ضعيفة' };
  };

  const passwordStrength = getPasswordStrength();

  if (!userEmail) {
    return null;
  }

  return (
    <Flex position="relative" mb="40px">
      <Flex
        minH={{ base: '75vh', md: '85vh' }}
        h={{ base: 'initial', md: '75vh' }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ base: '100px', md: '0px' }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{ userSelect: 'none' }}
          w={{ base: '100%', md: '50%', lg: '42%' }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: '150px', lg: '80px' }}
          >
            <Box mb="40px" textAlign="center">
              <Icon as={step === 1 ? FaEnvelope : FaLock} w={16} h={16} color={titleColor} mb={4} />
              <Text fontSize="xl" color={textColor} fontWeight="bold" mb={2}>
                {step === 1 ? 'التحقق من البريد الإلكتروني' : 'إنشاء كلمة المرور'}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {userEmail}
              </Text>
            </Box>

            {/* Step 1: OTP Verification */}
            {step === 1 && (
              <VStack spacing={6} align="stretch">
                <Text fontSize="sm" color={textColor} textAlign="center" mb={2}>
                  أدخل رمز التحقق المكون من 6 أرقام المرسل إلى بريدك الإلكتروني
                </Text>

                <FormControl>
                  <HStack justify="center" spacing={2}>
                    <PinInput
                      size="lg"
                      value={otp}
                      onChange={setOtp}
                      otp
                      placeholder=""
                      manageFocus
                    >
                      <PinInputField bg={bgColor} borderColor={borderColor} />
                      <PinInputField bg={bgColor} borderColor={borderColor} />
                      <PinInputField bg={bgColor} borderColor={borderColor} />
                      <PinInputField bg={bgColor} borderColor={borderColor} />
                      <PinInputField bg={bgColor} borderColor={borderColor} />
                      <PinInputField bg={bgColor} borderColor={borderColor} />
                    </PinInput>
                  </HStack>
                </FormControl>

                <Button
                  fontSize="md"
                  bg="#224D59"
                  w="100%"
                  h="45"
                  mb={4}
                  color="white"
                  _hover={{ bg: '#1a3d47' }}
                  _active={{ bg: '#152e36' }}
                  onClick={handleVerifyOtp}
                  isLoading={verifyingOtp}
                  loadingText="جاري التحقق..."
                  isDisabled={otp.length !== 6}
                >
                  التحقق من الرمز
                </Button>

                <Flex justify="center" align="center">
                  <Text fontSize="sm" color={textColor} mr={2}>
                    لم تستلم الرمز؟
                  </Text>
                  <Button
                    variant="link"
                    color={titleColor}
                    fontSize="sm"
                    onClick={handleResendOtp}
                    isLoading={resending}
                    isDisabled={resendCooldown > 0}
                  >
                    {resendCooldown > 0 ? `إعادة الإرسال (${resendCooldown}s)` : 'إعادة الإرسال'}
                  </Button>
                </Flex>
              </VStack>
            )}

            {/* Step 2: Create Password */}
            {step === 2 && (
              <VStack spacing={6} align="stretch">
                {/* Success Alert */}
                <Alert status="success" borderRadius="md">
                  <AlertIcon as={CheckCircleIcon} />
                  <AlertDescription fontSize="sm">
                    تم التحقق من بريدك الإلكتروني بنجاح
                  </AlertDescription>
                </Alert>

                {/* Password Field */}
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold" color={textColor}>
                    كلمة المرور
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={handlePasswordChange}
                      bg={bgColor}
                      borderColor={borderColor}
                      fontSize="sm"
                      dir="ltr"
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {password && (
                    <Box mt={2}>
                      <Flex justify="space-between" mb={1}>
                        <Text fontSize="xs" color="gray.500">
                          قوة كلمة المرور
                        </Text>
                        <Text fontSize="xs" color={`${passwordStrength.color}.500`} fontWeight="bold">
                          {passwordStrength.label}
                        </Text>
                      </Flex>
                      <Progress
                        value={passwordStrength.value}
                        size="sm"
                        colorScheme={passwordStrength.color}
                        borderRadius="md"
                      />
                    </Box>
                  )}
                </FormControl>

                {/* Confirm Password Field */}
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold" color={textColor}>
                    تأكيد كلمة المرور
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="أعد إدخال كلمة المرور"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      bg={bgColor}
                      borderColor={borderColor}
                      fontSize="sm"
                      dir="ltr"
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {confirmPassword && password !== confirmPassword && (
                    <Text fontSize="xs" color="red.500" mt={1}>
                      كلمات المرور غير متطابقة
                    </Text>
                  )}
                </FormControl>

                {/* Password Requirements */}
                <Box
                  bg={bgColor}
                  p={4}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>
                    متطلبات كلمة المرور:
                  </Text>
                  <VStack align="start" spacing={1}>
                    <Text
                      fontSize="xs"
                      color={password.length >= 8 ? 'green.500' : 'gray.500'}
                    >
                      ✓ 8 أحرف على الأقل
                    </Text>
                    <Text
                      fontSize="xs"
                      color={/[A-Z]/.test(password) ? 'green.500' : 'gray.500'}
                    >
                      ✓ حرف كبير واحد على الأقل
                    </Text>
                    <Text
                      fontSize="xs"
                      color={/[a-z]/.test(password) ? 'green.500' : 'gray.500'}
                    >
                      ✓ حرف صغير واحد على الأقل
                    </Text>
                    <Text
                      fontSize="xs"
                      color={/[0-9]/.test(password) ? 'green.500' : 'gray.500'}
                    >
                      ✓ رقم واحد على الأقل
                    </Text>
                  </VStack>
                </Box>

                <Button
                  fontSize="md"
                  bg="#224D59"
                  w="100%"
                  h="45"
                  color="white"
                  _hover={{ bg: '#1a3d47' }}
                  _active={{ bg: '#152e36' }}
                  onClick={handleSetPassword}
                  isLoading={settingPassword}
                  loadingText="جاري الحفظ..."
                  isDisabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword ||
                    passwordErrors.length > 0
                  }
                >
                  إنشاء كلمة المرور
                </Button>
              </VStack>
            )}
          </Flex>
        </Flex>

        {/* Right side decoration */}
        <Box
          display={{ base: 'none', md: 'block' }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          left="0px"
        >
          <Box
            bgGradient="linear(to-br, #224D59, #1a3d47)"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
