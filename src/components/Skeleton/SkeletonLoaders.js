import React from 'react';
import { Box, Skeleton, Stack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

/**
 * Table Skeleton Loader
 * Shows skeleton rows for table loading state
 */
export const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <Stack spacing={4}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Stack key={rowIndex} direction="row" spacing={4} align="center">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="40px" flex={1} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

/**
 * Card Skeleton Loader
 * Shows skeleton for card content
 */
export const CardSkeleton = ({ lines = 4 }) => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" borderRadius="lg">
      <SkeletonText mt="4" noOfLines={lines} spacing="4" />
    </Box>
  );
};

/**
 * Stats Skeleton Loader
 * Shows skeleton for statistics cards
 */
export const StatsSkeleton = () => {
  return (
    <Box padding="6" boxShadow="md" bg="white" borderRadius="lg">
      <Stack spacing={3}>
        <Skeleton height="20px" width="60%" />
        <Skeleton height="40px" width="40%" />
        <Skeleton height="16px" width="50%" />
      </Stack>
    </Box>
  );
};

/**
 * Profile Skeleton Loader
 * Shows skeleton for profile/user cards
 */
export const ProfileSkeleton = () => {
  return (
    <Box padding="6" boxShadow="md" bg="white" borderRadius="lg">
      <Stack direction="row" spacing={4} align="center">
        <SkeletonCircle size="60px" />
        <Stack flex={1} spacing={2}>
          <Skeleton height="20px" width="70%" />
          <Skeleton height="16px" width="50%" />
          <Skeleton height="16px" width="60%" />
        </Stack>
      </Stack>
    </Box>
  );
};

/**
 * List Skeleton Loader
 * Shows skeleton for list items
 */
export const ListSkeleton = ({ items = 5 }) => {
  return (
    <Stack spacing={3}>
      {Array.from({ length: items }).map((_, index) => (
        <Box key={index} padding="4" borderWidth="1px" borderRadius="md">
          <Stack direction="row" spacing={4} align="center">
            <SkeletonCircle size="40px" />
            <Stack flex={1} spacing={2}>
              <Skeleton height="16px" width="60%" />
              <Skeleton height="14px" width="40%" />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

/**
 * Form Skeleton Loader
 * Shows skeleton for forms
 */
export const FormSkeleton = ({ fields = 6 }) => {
  return (
    <Stack spacing={4}>
      {Array.from({ length: fields }).map((_, index) => (
        <Box key={index}>
          <Skeleton height="12px" width="30%" mb={2} />
          <Skeleton height="40px" width="100%" />
        </Box>
      ))}
    </Stack>
  );
};

/**
 * Details Page Skeleton
 * Shows skeleton for detail pages
 */
export const DetailsSkeleton = () => {
  return (
    <Stack spacing={6}>
      {/* Header */}
      <Box>
        <Skeleton height="32px" width="50%" mb={2} />
        <Skeleton height="20px" width="70%" />
      </Box>
      
      {/* Content Cards */}
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={6}>
        <Box flex={2}>
          <CardSkeleton lines={8} />
        </Box>
        <Box flex={1}>
          <Stack spacing={4}>
            <StatsSkeleton />
            <StatsSkeleton />
            <StatsSkeleton />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default {
  TableSkeleton,
  CardSkeleton,
  StatsSkeleton,
  ProfileSkeleton,
  ListSkeleton,
  FormSkeleton,
  DetailsSkeleton,
};
