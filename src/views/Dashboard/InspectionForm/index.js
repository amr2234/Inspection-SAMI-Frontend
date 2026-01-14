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

  const steps = [
    "معلومات الزيارة",
    "الأجهزة البيئية",
    "تفاصيل العينات",
    "المخالفات والإجراءات",
    "الغرامات المالية",
    "معلومات المفتشين",
    "المراجعة والتأكيد",
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Step 1
        const step1Required = [
          'violationType', 'facilityName', 'facilityCode', 'branch',
          'facilityType', 'activityType', 'activityCategory', 'region',
          'city', 'facilityStatus', 'dataUpdated', 'complianceStatus',
          'visitType', 'addedToDatabase', 'sector'
        ];
        return step1Required.every(field => formData[field]);

      case 1: // Step 2
        if (!formData.deviceCount || parseInt(formData.deviceCount) === 0) {
          return false;
        }
        if (!formData.devices || formData.devices.length === 0) {
          return false;
        }
        return formData.devices.every(device => device.name && device.number);

      case 2: // Step 3
        const step3Required = [
          'samplesCollected', 'sampleType', 'sampleStorageLocation',
          'sampleNumber', 'sampleResult', 'totalSamples'
        ];
        return step3Required.every(field => formData[field]);

      case 3: // Step 4
        const step4Required = ['violation2Type', 'regulation1', 'regulation2'];
        return step4Required.every(field => formData[field]);

      case 4: // Step 5
        return formData.fine1 && formData.fine2;

      case 5: // Step 6
        return formData.mainInspectorName && formData.mainInspectorTitle;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      toast({
        title: "حقول مطلوبة",
        description: "يرجى ملء جميع الحقول المطلوبة قبل المتابعة",
        status: "error",
        duration: 3000,
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
    switch (currentStep) {
      case 0:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step3 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step4 formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step5 formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Step6 formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <StepConfirmation formData={formData} />;
      default:
        return null;
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
