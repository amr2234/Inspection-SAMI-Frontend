// User Management API Service
// This is a mock service - replace with actual API calls

const API_BASE_URL = '/api/users';

// Mock data for development
let mockUsers = [
  {
    id: '1',
    name: 'أحمد محمد السالم',
    email: 'ahmed.salem@example.com',
    nationalId: '1234567890',
    employeeId: 'EMP001',
    role: 'Inspector',
    isActive: true,
    isVerified: true,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'فاطمة علي الأحمد',
    email: 'fatima.ahmed@example.com',
    nationalId: '0987654321',
    employeeId: 'EMP002',
    role: 'SystemAdmin',
    isActive: true,
    isVerified: true,
    createdAt: '2024-02-20T14:20:00Z'
  },
  {
    id: '3',
    name: 'محمد خالد العتيبي',
    email: 'mohammed.otaibi@example.com',
    nationalId: '1122334455',
    employeeId: 'EMP003',
    role: 'Inspector',
    isActive: false,
    isVerified: false,
    createdAt: '2024-03-10T09:15:00Z'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  // Get all users with optional filters
  async getUsers(params = {}) {
    await delay(500);
    
    const { search = '', activeOnly = false, page = 1, pageSize = 10 } = params;
    
    let filtered = [...mockUsers];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.nationalId.includes(search) ||
        user.employeeId.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply active filter
    if (activeOnly) {
      filtered = filtered.filter(user => user.isActive);
    }
    
    // Calculate pagination
    const total = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = filtered.slice(startIndex, endIndex);
    
    return {
      data: paginatedUsers,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  },

  // Get user by ID
  async getUserById(id) {
    await delay(300);
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  // Create new user
  async createUser(userData) {
    await delay(500);
    
    // Validate required fields
    if (!userData.name || userData.name.length < 3) {
      throw new Error('Name must be at least 3 characters');
    }
    if (!userData.email || !userData.email.includes('@')) {
      throw new Error('Valid email is required');
    }
    if (!userData.nationalId || userData.nationalId.length < 10 || userData.nationalId.length > 14) {
      throw new Error('National ID must be between 10-14 digits');
    }
    if (!userData.employeeId) {
      throw new Error('Employee ID is required');
    }
    if (!userData.role || !['Inspector', 'SystemAdmin'].includes(userData.role)) {
      throw new Error('Invalid role');
    }
    
    const newUser = {
      id: String(mockUsers.length + 1),
      name: userData.name,
      email: userData.email,
      nationalId: userData.nationalId,
      employeeId: userData.employeeId,
      role: userData.role,
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      isVerified: false, // New users are not verified by default
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    return newUser;
  },

  // Update user
  async updateUser(id, userData) {
    await delay(500);
    
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    // Validate fields if provided
    if (userData.name && userData.name.length < 3) {
      throw new Error('Name must be at least 3 characters');
    }
    if (userData.nationalId && (userData.nationalId.length < 10 || userData.nationalId.length > 14)) {
      throw new Error('National ID must be between 10-14 digits');
    }
    if (userData.role && !['Inspector', 'SystemAdmin'].includes(userData.role)) {
      throw new Error('Invalid role');
    }
    
    const updatedUser = {
      ...mockUsers[index],
      ...(userData.name && { name: userData.name }),
      ...(userData.nationalId && { nationalId: userData.nationalId }),
      ...(userData.employeeId && { employeeId: userData.employeeId }),
      ...(userData.role && { role: userData.role }),
      ...(userData.isActive !== undefined && { isActive: userData.isActive })
      // email and isVerified cannot be updated
    };
    
    mockUsers[index] = updatedUser;
    return updatedUser;
  },

  // Delete user
  async deleteUser(id) {
    await delay(500);
    
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(index, 1);
    return { success: true };
  },

  // Toggle user active status
  async toggleUserActive(id) {
    await delay(300);
    
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    mockUsers[index].isActive = !mockUsers[index].isActive;
    return mockUsers[index];
  }
};

export default userService;
