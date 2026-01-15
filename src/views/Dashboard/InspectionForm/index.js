// Chakra imports
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Stepper } from "components/Stepper";
import { Step1 } from "components/Step1";
import { Step2 } from "components/Step2";
import { Step3 } from "components/Step3";
import { Step4 } from "components/Step4";
import { Step5 } from "components/Step5";
import { Step6 } from "components/Step6";
import { StepConfirmation } from "components/StepConfirmation";

export default function InspectionForm() {
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.700");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    visitDateTime: new Date().toISOString().slice(0, 16),
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Get steps based on whether there's a violation
  const getAllSteps = () => [
    "معلومات الزيارة",
    "الأجهزة البيئية",
    "تفاصيل العينات",
    "المخالفات والإجراءات",
    "الغرامات المالية",
    "معلومات المفتشين",
    "المراجعة والتأكيد",
  ];

  const getStepsWithoutViolation = () => [
    "معلومات الزيارة",
    "الأجهزة البيئية",
    "تفاصيل العينات",
    "معلومات المفتشين",
    "المراجعة والتأكيد",
  ];

  // Dynamically select steps based on violation status
  const steps = formData.hasViolation === 'لا' ? getStepsWithoutViolation() : getAllSteps();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user updates it
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
    const hasViolation = formData.hasViolation === 'نعم';
    const errors = {};
  
    switch (currentStep) {
      case 0: // Step 1
        const step1Required = [
          { field: 'facilityName', label: 'اسم المنشأة' },
          { field: 'facilityCode', label: 'كود المنشأة' },
          { field: 'branch', label: 'الفرع' },
          { field: 'facilityType', label: 'نوع المنشأة' },
          { field: 'activityType', label: 'نوع النشاط' },
          { field: 'activityCategory', label: 'فئة النشاط' },
          { field: 'region', label: 'المنطقة' },
          { field: 'city', label: 'المدينة' },
          { field: 'facilityStatus', label: 'حالة المنشأة' },
          { field: 'dataUpdated', label: 'تحديث البيانات' },
          { field: 'complianceStatus', label: 'حالة الالتزام' },
          { field: 'visitCategory', label: 'نوع الزيارة' },
          { field: 'addedToDatabase', label: 'إضافة لقاعدة البيانات' },
          { field: 'sector', label: 'القطاع' },
          { field: 'inspectionImage', label: 'صورة الزيارة التفتيشية' },
          { field: 'hasViolation', label: 'هل يوجد مخالفة' },
        ];
          
        // If facilityCode is 'الكود غير موجود', also require customFacilityCode
        if (formData.facilityCode === 'الكود غير موجود') {
          step1Required.push({ field: 'customFacilityCode', label: 'كود المنشأة (مخصص)' });
        }
          
        // If hasViolation is 'نعم', also require violationType
        if (hasViolation) {
          step1Required.push({ field: 'violationType', label: 'نوع المخالفة' });
        }
          
        step1Required.forEach(({ field, label }) => {
          if (!formData[field]) {
            errors[field] = `${label} مطلوب`;
          }
        });
        break;
  
      case 1: // Step 2
        if (!formData.hasDevices) {
          errors.hasDevices = 'يجب الإجابة على هذا السؤال';
        }
          
        // Only validate devices if hasDevices is 'نعم'
        if (formData.hasDevices === 'نعم') {
          if (!formData.deviceCount || parseInt(formData.deviceCount) === 0) {
            errors.deviceCount = 'عدد الأجهزة مطلوب';
          }
          if (!formData.devices || formData.devices.length === 0) {
            errors.devices = 'يجب إضافة جهاز واحد على الأقل';
          } else {
            formData.devices.forEach((device, index) => {
              if (!device.name) errors[`device_${index}_name`] = `اسم الجهاز ${index + 1} مطلوب`;
              if (!device.number) errors[`device_${index}_number`] = `رقم الجهاز ${index + 1} مطلوب`;
            });
          }
        }
        break;
  
      case 2: // Step 3
        if (!formData.hasSamples) {
          errors.hasSamples = 'يجب الإجابة على هذا السؤال';
        }
          
        // Only validate samples if hasSamples is 'نعم'
        if (formData.hasSamples === 'نعم') {
          if (!formData.sampleCount || parseInt(formData.sampleCount) === 0) {
            errors.sampleCount = 'عدد العينات مطلوب';
          }
          if (!formData.samples || formData.samples.length === 0) {
            errors.samples = 'يجب إضافة عينة واحدة على الأقل';
          } else {
            formData.samples.forEach((sample, index) => {
              if (!sample.type) errors[`sample_${index}_type`] = `نوع العينة ${index + 1} مطلوب`;
              if (!sample.number) errors[`sample_${index}_number`] = `رقم العينة ${index + 1} مطلوب`;
            });
          }
        }
        break;
  
      case 3: // Step 4 - Violations (only if hasViolation)
        if (hasViolation) {
          const step4Required = [
            { field: 'violation2Type', label: 'نوع المخالفة' },
            { field: 'regulation1', label: 'اللائحة التنفيذية 1' },
            { field: 'regulation2', label: 'اللائحة التنفيذية 2' },
          ];
          step4Required.forEach(({ field, label }) => {
            if (!formData[field]) {
              errors[field] = `${label} مطلوب`;
            }
          });
        }
        break;
  
      case 4: // Step 5 - Fines (only if hasViolation)
        if (hasViolation) {
          if (!formData.fine1) errors.fine1 = 'الغرامة 1 مطلوبة';
          if (!formData.fine2) errors.fine2 = 'الغرامة 2 مطلوبة';
        }
        break;
  
      case 5: // Step 6 - Inspectors (or Step 4 without violations)
        if (!formData.mainInspectorName) errors.mainInspectorName = 'اسم المفتش الرئيسي مطلوب';
        if (!formData.mainInspectorTitle) errors.mainInspectorTitle = 'المسمى الوظيفي مطلوب';
        if (!formData.hasAssistantInspector) errors.hasAssistantInspector = 'يجب الإجابة على هذا السؤال';
        // If hasAssistantInspector is 'نعم', require assistantInspectorName
        if (formData.hasAssistantInspector === 'نعم' && !formData.assistantInspectorName) {
          errors.assistantInspectorName = 'اختيار المفتش المساعد مطلوب';
        }
        break;
  
      default:
        break;
    }
  
    setValidationErrors(errors);
      
    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      setTimeout(() => {
        const firstErrorField = document.querySelector('[data-invalid]');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
      
    // Return both validation result and errors object
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const handleNext = () => {
    const validation = validateCurrentStep();
    if (validation.isValid) {
      setValidationErrors({}); // Clear errors on successful validation
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const errorCount = Object.keys(validation.errors).length;
      toast({
        title: "حقول مطلوبة",
        description: `يرجى ملء جميع الحقول المطلوبة (${errorCount} حقل مفقود)`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    toast({
      title: "تم الإرسال بنجاح",
      description: "تم إرسال النموذج بنجاح",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    
    // Reset form
    setFormData({ visitDateTime: new Date().toISOString().slice(0, 16) });
    setCurrentStep(0);
  };

  const renderStep = () => {
    const hasViolation = formData.hasViolation === 'نعم';
    
    // Map actual step to component based on violation status
    if (!hasViolation) {
      // Without violations: 0=Step1, 1=Step2, 2=Step3, 3=Step6, 4=Confirmation
      switch (currentStep) {
        case 0:
          return <Step1 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 1:
          return <Step2 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 2:
          return <Step3 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 3:
          return <Step6 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 4:
          return <StepConfirmation formData={formData} />;
        default:
          return null;
      }
    } else {
      // With violations: All steps shown
      switch (currentStep) {
        case 0:
          return <Step1 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 1:
          return <Step2 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 2:
          return <Step3 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 3:
          return <Step4 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 4:
          return <Step5 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 5:
          return <Step6 formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />;
        case 6:
          return <StepConfirmation formData={formData} />;
        default:
          return null;
      }
    }
  };

  return (
    <Flex
      flexDirection="column"
      minH="100vh"
      py={{ base: "20px", md: "40px" }}
      px={{ base: "16px", md: "24px", lg: "40px" }}
      maxW="1200px"
      mx="auto"
      w="100%"
    >
      <Box
        bg={bgColor}
        borderRadius="15px"
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        mb="20px"
      >
        <Stepper steps={steps} currentStep={currentStep} />
      </Box>

      <Box
        bg={bgColor}
        borderRadius="15px"
        p={{ base: "20px", md: "40px" }}
        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        mb="20px"
      >
        {renderStep()}

        <Flex
          mt="40px"
          pt="20px"
          borderTop="1px solid"
          borderColor="gray.200"
          justifyContent="space-between"
          gap="16px"
        >
          <Button
            onClick={handlePrevious}
            isDisabled={currentStep === 0}
            variant="outline"
            colorScheme="gray"
            size="lg"
            minW="120px"
          >
            السابق
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              bg="#224D59"
              color="white"
              size="lg"
              minW="120px"
              _hover={{ bg: "#346860" }}
              _active={{ bg: "#224D59" }}
            >
              التالي
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              bg="#62AD45"
              color="white"
              size="lg"
              minW="120px"
              _hover={{ bg: "#4a8a34" }}
              _active={{ bg: "#62AD45" }}
            >
              إرسال
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
