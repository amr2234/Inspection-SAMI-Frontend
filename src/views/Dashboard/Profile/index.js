// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import InspectorProfileCard from "./components/InspectorProfileCard";
import LatestVisitCard from "./components/LatestVisitCard";
import { inspectionData } from "variables/inspectionData";

function Profile() {
  // Mock current user - Replace with actual auth context
  const [currentUser] = useState({
    id: '1',
    name: 'أحمد محمد السالم',
    email: 'ahmed.salem@example.com',
    nationalId: '1234567890',
    employeeId: 'EMP001',
    role: 'Inspector',
    isActive: true,
    isVerified: true,
    createdAt: '2024-01-15T10:30:00Z'
  });

  const [latestVisit, setLatestVisit] = useState(null);

  useEffect(() => {
    // Get inspector's latest visit
    const inspectorVisits = inspectionData.filter(
      visit => visit.mainInspectorName === currentUser.name
    );

    if (inspectorVisits.length > 0) {
      // Sort by date and get the latest
      const sortedVisits = inspectorVisits.sort(
        (a, b) => new Date(b.visitDateTime) - new Date(a.visitDateTime)
      );
      setLatestVisit(sortedVisits[0]);
    }
  }, [currentUser.name]);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
        gap="24px"
      >
        <InspectorProfileCard inspector={currentUser} />
        <LatestVisitCard visit={latestVisit} />
      </Grid>
    </Flex>
  );
}

export default Profile;
