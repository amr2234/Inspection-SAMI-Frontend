import React from "react";
import { useTranslation } from 'react-i18next';
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/siginIn.png";

function SignIn() {
  const { t } = useTranslation();
  // Chakra color mode
  const titleColor = useColorModeValue("#224D59", "#62AD45");
  const textColor = useColorModeValue("gray.500", "white");
  const bgColor = useColorModeValue("#224D59", "#132A30");
  return (
    <Flex position='relative' mb='0px' dir='rtl' minH='100vh'>
      <Flex
        h='100vh'
        w='100%'
        maxW='100%'
        mx='auto'
        justifyContent='space-between'
        mb='0px'
        pt='0px'
        dir='rtl'
        flexDirection={{ base: 'column', md: 'row' }}>
        {/* Form Box - Right side in RTL */}
        <Flex
          alignItems='center'
          justifyContent='center'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%" }}
          px={{ base: "20px", md: "0px" }}>
          <Flex
            direction='column'
            w='100%'
            maxW='450px'
            background='transparent'
            p='48px'
            mt='0px'>
            <Heading color={titleColor} fontSize='32px' mb='10px' textAlign='right'>
              {t('auth.welcomeBack')}
            </Heading>
            <Text
              mb='36px'
              me='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'
              textAlign='right'>
              {t('auth.enterCredentials')}
            </Text>
            <FormControl dir='rtl'>
              <FormLabel me='4px' fontSize='sm' fontWeight='normal' htmlFor='email' textAlign='right'>
                {t('auth.email')}
              </FormLabel>
              <Input
                id='email'
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                placeholder={t('auth.emailPlaceholder')}
                size='lg'
                textAlign='right'
              />
              <FormLabel me='4px' fontSize='sm' fontWeight='normal' htmlFor='password' textAlign='right'>
                {t('auth.password')}
              </FormLabel>
              <Input
                id='password'
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder={t('auth.passwordPlaceholder')}
                size='lg'
                textAlign='right'
              />
              <FormControl display='flex' alignItems='center' justifyContent='flex-end' dir='rtl'>
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  me='10px'
                  fontWeight='normal'>
                  {t('auth.rememberMe')}
                </FormLabel>
                <Switch id='remember-login' colorScheme='green' />
              </FormControl>
              <Button
                fontSize='10px'
                type='submit'
                bg='#224D59'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "#346860",
                }}
                _active={{
                  bg: "#224D59",
                }}>
                {t('auth.signIn')}
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        {/* Image Box - Left side in RTL */}
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100vh'
          w={{ base: "100%", md: "50%" }}
          position='relative'>
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='right'
            borderBottomRightRadius='0px'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
