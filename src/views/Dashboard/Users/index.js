import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Flex,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Pagination from 'components/Pagination/Pagination';
import { TableSkeleton } from 'components/Skeleton/SkeletonLoaders';
import useDebounce from 'hooks/useDebounce';
import UserForm from './components/UserForm';
import UsersTable from './components/UsersTable';
import userService from 'services/userService';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');

  // Debounce search with useDebounce hook
  const debouncedSearch = useDebounce(searchInput, 500);

  // Fetch users when debounced search changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search
  }, [debouncedSearch]);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, activeOnly, currentPage, pageSize]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers({
        search: debouncedSearch,
        activeOnly,
        page: currentPage,
        pageSize
      });
      setUsers(response.data);
      setTotalUsers(response.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, activeOnly, currentPage, pageSize]);

  const handleCreateUser = useCallback(() => {
    setSelectedUser(null);
    onOpen();
  }, [onOpen]);

  const handleEditUser = useCallback((user) => {
    setSelectedUser(user);
    onOpen();
  }, [onOpen]);

  const handleFormClose = useCallback(() => {
    setSelectedUser(null);
    onClose();
  }, [onClose]);

  const handleFormSuccess = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalUsers / pageSize);
  }, [totalUsers, pageSize]);

  return (
    <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
      {/* Header with Create Button */}
      <Flex mb="24px" justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          إدارة المستخدمين
        </Text>
        <Button
          leftIcon={<AddIcon />}
          bg="#224D59"
          color="white"
          _hover={{ bg: '#346860' }}
          onClick={handleCreateUser}
        >
          إضافة مستخدم
        </Button>
      </Flex>

      {/* Search and Filter Bar */}
      <Card mb="24px">
        <CardBody>
          <HStack spacing={4}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="البحث بالاسم، البريد الإلكتروني، رقم الهوية، أو رقم الموظف..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
                dir="rtl"
              />
            </InputGroup>
            <Checkbox
              isChecked={activeOnly}
              onChange={(e) => setActiveOnly(e.target.checked)}
              colorScheme="green"
            >
              النشطون فقط
            </Checkbox>
          </HStack>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader p="12px 0px 28px 0px">
          <Flex direction="column">
            <Text fontSize="lg" fontWeight="bold" pb=".5rem">
              قائمة المستخدمين
            </Text>
            <Text fontSize="sm" color="gray.500">
              إجمالي المستخدمين: {totalUsers}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody overflowX="auto" pb={0}>
          {loading ? (
            <Box minH="400px" py={4}>
              <TableSkeleton rows={pageSize} columns={8} />
            </Box>
          ) : users.length === 0 ? (
            <Center py={10}>
              <Text color="gray.500">لا توجد نتائج</Text>
            </Center>
          ) : (
            <UsersTable
              users={users}
              onEdit={handleEditUser}
              onRefresh={fetchUsers}
            />
          )}
        </CardBody>
        {!loading && users.length > 0 && (
          <Box px={6} pb={4}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalUsers}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </Box>
        )}
      </Card>

      {/* User Form Modal */}
      <UserForm
        isOpen={isOpen}
        onClose={handleFormClose}
        user={selectedUser}
        onSuccess={handleFormSuccess}
      />
    </Flex>
  );
}
