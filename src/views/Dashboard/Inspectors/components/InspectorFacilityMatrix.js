import React from "react";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

function InspectorFacilityMatrix({ title, data, inspectorStats }) {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  // Get unique facilities
  const facilities = {};
  Object.values(data).forEach(inspectorData => {
    Object.entries(inspectorData).forEach(([facilityCode, facilityInfo]) => {
      if (!facilities[facilityCode]) {
        facilities[facilityCode] = facilityInfo.facilityName;
      }
    });
  });

  const getVisitColor = (count) => {
    if (count >= 3) return "green";
    if (count >= 2) return "blue";
    return "gray";
  };

  return (
    <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='12px 0px 28px 0px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
            {title}
          </Text>
          <Text fontSize='sm' color='gray.500'>
            عدد زيارات كل مفتش لكل منشأة
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor} size='sm'>
          <Thead>
            <Tr>
              <Th
                pl='0px'
                color='gray.400'
                borderColor={borderColor}
                textAlign='right'
                position='sticky'
                right={0}
                bg={useColorModeValue("white", "gray.700")}
              >
                المفتش
              </Th>
              {Object.entries(facilities).map(([code, name]) => (
                <Th
                  key={code}
                  color='gray.400'
                  borderColor={borderColor}
                  textAlign='center'
                  minW='100px'
                >
                  <Text fontSize='xs'>{code}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {inspectorStats.map((inspector) => (
              <Tr key={inspector.name}>
                <Td
                  pl='0px'
                  borderColor={borderColor}
                  textAlign='right'
                  position='sticky'
                  right={0}
                  bg={useColorModeValue("white", "gray.700")}
                  minW='180px'
                >
                  <Text fontSize='sm' fontWeight='semibold'>
                    {inspector.name}
                  </Text>
                </Td>
                {Object.keys(facilities).map((facilityCode) => {
                  const visitData = data[inspector.name]?.[facilityCode];
                  const count = visitData?.count || 0;
                  
                  return (
                    <Td
                      key={facilityCode}
                      borderColor={borderColor}
                      textAlign='center'
                    >
                      {count > 0 ? (
                        <Badge
                          colorScheme={getVisitColor(count)}
                          fontSize='xs'
                          p='4px 8px'
                          borderRadius='full'
                        >
                          {count}
                        </Badge>
                      ) : (
                        <Text color='gray.300' fontSize='xs'>-</Text>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default InspectorFacilityMatrix;
