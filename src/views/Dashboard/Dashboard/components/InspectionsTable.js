import React from "react";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Td,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

function InspectionsTable({ title, data }) {
  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleSeeMore = () => {
    history.push('/admin/visits');
  };

  const getComplianceColor = (status) => {
    switch (status) {
      case "ملتزم":
        return "green";
      case "غير ملتزم":
        return "red";
      case "ملتزم جزئياً":
        return "orange";
      default:
        return "gray";
    }
  };

  const getViolationColor = (type) => {
    switch (type) {
      case "مخالفة بيئية":
        return "red";
      case "مخالفة فنية":
        return "orange";
      case "مخالفة إدارية":
        return "blue";
      default:
        return "gray";
    }
  };

  // Show only the most recent 10 inspections
  const recentInspections = data.slice(0, 10);

  return (
    <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='12px 0px 28px 0px'>
        <Flex direction='row' justify='space-between' align='center' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button
            leftIcon={<ViewIcon />}
            size='sm'
            variant='outline'
            colorScheme='teal'
            onClick={handleSeeMore}
          >
            عرض المزيد
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' pl='0px'>
              <Th
                pl='0px'
                color='gray.400'
                borderColor={borderColor}
                textAlign='right'
              >
                اسم المنشأة
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                الكود
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                نوع المخالفة
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                حالة الالتزام
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                الغرامة
              </Th>
              <Th color='gray.400' borderColor={borderColor} textAlign='right'>
                التاريخ
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentInspections.map((inspection) => (
              <Tr key={inspection.id}>
                <Td
                  pl='0px'
                  borderColor={borderColor}
                  textAlign='right'
                  minW='200px'
                >
                  <Text fontSize='sm' fontWeight='bold'>
                    {inspection.facilityName}
                  </Text>
                  <Text fontSize='xs' color='gray.500' mt='1'>
                    {inspection.facilityType} - {inspection.region}
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='sm' fontWeight='semibold'>
                    {inspection.facilityCode}
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Badge
                    colorScheme={getViolationColor(inspection.violationType)}
                    fontSize='xs'
                    p='3px 10px'
                    borderRadius='8px'
                  >
                    {inspection.violationType}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Badge
                    colorScheme={getComplianceColor(inspection.complianceStatus)}
                    fontSize='xs'
                    p='3px 10px'
                    borderRadius='8px'
                  >
                    {inspection.complianceStatus}
                  </Badge>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='sm' fontWeight='bold' color='green.500'>
                    {inspection.totalFine.toLocaleString('ar-SA')} ر.س
                  </Text>
                </Td>
                <Td borderColor={borderColor} textAlign='right'>
                  <Text fontSize='xs' color='gray.500'>
                    {new Date(inspection.visitDateTime).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default InspectionsTable;
