// Chakra imports
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DateFilter } from "components/DateFilter";
import {
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useState, useEffect } from "react";
import {
  inspectionData,
  filterInspectionsByDateRange,
  getInspectorStats,
  getFacilityLocations,
} from "variables/inspectionData";
import MiniStatistics from "../Dashboard/components/MiniStatistics";
import InspectorPerformanceTable from "./components/InspectorPerformanceTable";
import FacilityMap from "components/Map/FacilityMap";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

export default function InspectorsDashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  
  // Date filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(inspectionData);
  const [inspectorStats, setInspectorStats] = useState([]);
  const [facilityLocations, setFacilityLocations] = useState([]);

  // Initialize with "This Month" filter
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  }, []);

  // Update filtered data when dates change
  useEffect(() => {
    const filtered = filterInspectionsByDateRange(inspectionData, startDate, endDate);
    setFilteredData(filtered);
    setInspectorStats(getInspectorStats(filtered));
    setFacilityLocations(getFacilityLocations(filtered));
  }, [startDate, endDate]);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Calculate total stats
  const totalInspectors = inspectorStats.length;
  const totalVisits = filteredData.length;
  const totalViolations = filteredData.length * 2;
  const totalFines = filteredData.reduce((sum, item) => sum + item.totalFine, 0);

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      {/* Date Filter */}
      <DateFilter onFilterChange={handleFilterChange} />
      
      {/* Statistics Row - Inspector KPIs */}
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='24px'>
        <MiniStatistics
          title="إجمالي المفتشين"
          amount={totalInspectors}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="إجمالي الزيارات"
          amount={totalVisits}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="إجمالي المخالفات المكتشفة"
          amount={totalViolations}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="إجمالي الغرامات المحصلة"
          amount={`${totalFines.toLocaleString('ar-SA')} ر.س`}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>

      {/* Interactive Map - Facility Locations and Inspector Visits */}
      <Card mb="24px">
        <CardHeader p='12px 0px 28px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' fontWeight='bold' pb='.5rem'>
              خريطة المنشآت والزيارات التفتيشية
            </Text>
            <Text fontSize='sm' color='gray.500'>
              عرض تفاعلي لمواقع المنشآت وتاريخ الزيارات التفتيشية - {facilityLocations.length} منشأة
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <FacilityMap data={facilityLocations} />
        </CardBody>
      </Card>

      {/* Inspector Performance Table */}
      <InspectorPerformanceTable 
        title="أداء المفتشين"
        data={inspectorStats}
      />
    </Flex>
  );
}
