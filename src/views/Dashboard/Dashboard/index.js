// Chakra imports
import {
  Flex,
  Grid,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import { ViolationsChart } from "components/Charts/ViolationsChart";
import { RegionalChart } from "components/Charts/RegionalChart";
import { FacilityTypesChart } from "components/Charts/FacilityTypesChart";
import { DateFilter } from "components/DateFilter";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { dashboardTableData, timelineData } from "variables/general";
import { 
  inspectionData, 
  getInspectionStats, 
  filterInspectionsByDateRange 
} from "variables/inspectionData";
import ActiveUsers from "./components/ActiveUsers";
import MiniStatistics from "./components/MiniStatistics";
import Projects from "./components/Projects";
import InspectionsTable from "./components/InspectionsTable";
import SalesOverview from "./components/SalesOverview";

export default function Dashboard() {
  const { t } = useTranslation();
  const iconBoxInside = useColorModeValue("white", "white");
  
  // Date filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(inspectionData);
  const [stats, setStats] = useState(getInspectionStats(inspectionData));

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
    setStats(getInspectionStats(filtered));
  }, [startDate, endDate]);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      {/* Date Filter */}
      <DateFilter onFilterChange={handleFilterChange} />
      
      {/* Statistics Row 1 - Inspection KPIs */}
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='24px'>
        <MiniStatistics
          title="إجمالي الزيارات"
          amount={stats.totalInspections}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="إجمالي المخالفات"
          amount={stats.totalViolations}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="المنشآت النشطة"
          amount={stats.activeFacilities}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="إجمالي الغرامات"
          amount={`${stats.totalFines.toLocaleString('ar-SA')} ر.س`}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      
      {/* Statistics Row 2 - Additional KPIs */}
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='24px'>
        <MiniStatistics
          title="نسبة الالتزام"
          amount={`${stats.complianceRate}%`}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="العينات المسحوبة"
          amount={stats.totalSamples}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="الأجهزة المستخدمة"
          amount={stats.totalDevices}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title="زيارات المتابعة المعلقة"
          amount={stats.pendingFollowups}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>

      {/* Charts Grid */}
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb='24px'>
        <ActiveUsers
          title="توزيع المخالفات"
          chart={<ViolationsChart data={filteredData} />}
        />
        <SalesOverview
          title="توزيع أنواع المنشآت"
          percentage={5}
          chart={<FacilityTypesChart data={filteredData} />}
        />
      </Grid>
      
      {/* Regional Distribution Chart */}
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr" }}
        gap='24px'
        mb='24px'>
        <SalesOverview
          title="توزيع الزيارات حسب المنطقة"
          percentage={18}
          chart={<RegionalChart data={filteredData} />}
        />
      </Grid>

      {/* Inspections Table and Timeline */}
      <InspectionsTable
        title="آخر الزيارات التفتيشية"
        data={filteredData}
      />
    </Flex>
  );
}
