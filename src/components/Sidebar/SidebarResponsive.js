/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Link,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { Separator } from "components/Separator/Separator";
import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarResponsive = React.memo((props) => {
    // to check for active links and opened collapses
    let location = useLocation();
    // this is for the rest of the collapses
    const [state, setState] = React.useState({});
    const mainPanel = React.useRef();
    
    // Chakra Color Mode - MUST be at top level
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
      return location.pathname === routeName ? "active" : "";
    };
  
    const createLinks = (routes) => {
      return routes.map((prop, key) => {
        if (prop.redirect) {
          return null;
        }
        // Skip invisible routes
        if (prop.invisible) {
          return null;
        }
        if (prop.category) {
          // Skip invisible categories
          if (prop.invisible) {
            return null;
          }
          var st = {};
          st[prop["state"]] = !state[prop.state];
          return (
            <div key={prop.name}>
              <Text
                color={activeColor}
                fontWeight="bold"
                mb={{
                  xl: "12px",
                }}
                mx="auto"
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                py="12px"
              >
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
              {createLinks(prop.views)}
            </div>
          );
        }
        
        const isActive = activeRoute(prop.layout + prop.path) === "active";
        
        return (
          <NavLink to={prop.layout + prop.path} key={prop.name}>
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={isActive ? activeBg : "transparent"}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              _hover={{ bg: isActive ? activeBg : "gray.50" }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={isActive ? "teal.300" : inactiveBg}
                    color={isActive ? "white" : "teal.300"}
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={isActive ? activeColor : inactiveColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          </NavLink>
        );
      });
    };
    
    const { logoText, routes, ...rest } = props;
  
    // Memoize links to avoid re-rendering on every location change
    const links = useMemo(() => createLinks(routes), [routes, location.pathname, activeBg, inactiveBg, activeColor, inactiveColor]);
    
    //  BRAND
    //  Chakra Color Mode
    let hamburgerColor = useColorModeValue("gray.500", "gray.200");
    if (props.secondary === true) {
      hamburgerColor = "white";
    }
    var brand = (
      <Box pt={"35px"} mb="8px">
        <Link
          href={`${process.env.PUBLIC_URL}/#/`}
          target="_blank"
          display="flex"
          lineHeight="100%"
          mb="30px"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          fontSize="11px"
        >
          <img 
            src={`${process.env.PUBLIC_URL}/sami-logo.png`} 
            alt="SAMI Logo" 
            style={{ width: '120px', height: '35px', objectFit: 'contain' }}
          />
        </Link>
        <Separator></Separator>
      </Box>
    );
  
    // SIDEBAR
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    // Color variables
    return (
      <Flex
        display={{ sm: "flex", xl: "none" }}
        ref={mainPanel}
        alignItems="center"
      >
        <HamburgerIcon
          color={hamburgerColor}
          w="18px"
          h="18px"
          ref={btnRef}
          onClick={onOpen}
        />
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement={document.documentElement.dir === "rtl" ? "right" : "left"}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent
            w="250px"
            maxW="250px"
            ms={{
              sm: "16px",
            }}
            my={{
              sm: "16px",
            }}
            borderRadius="16px"
          >
            <DrawerCloseButton
              _focus={{ boxShadow: "none" }}
              _hover={{ boxShadow: "none" }}
            />
            <DrawerBody maxW="250px" px="1rem">
              <Box maxW="100%" h="100vh">
                <Box>{brand}</Box>
                <Stack direction="column" mb="40px">
                  <Box>{links}</Box>
                </Stack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  });

  export default SidebarResponsive