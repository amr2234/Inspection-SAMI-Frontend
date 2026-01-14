// Logs Management API Service
// This is a mock service - replace with actual API calls

const API_BASE_URL = '/api/logs';

// Mock data for development
let mockLogs = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:25Z',
    type: 'UserCreated',
    severity: 'Info',
    user: {
      id: '1',
      name: 'أحمد محمد السالم',
      email: 'ahmed.salem@example.com'
    },
    message: 'تم إنشاء مستخدم جديد بنجاح',
    details: {
      userId: '1',
      role: 'Inspector',
      createdBy: 'admin@example.com',
      ipAddress: '192.168.1.10'
    }
  },
  {
    id: '2',
    timestamp: '2024-01-15T11:45:18Z',
    type: 'FormSubmitted',
    severity: 'Info',
    user: {
      id: '1',
      name: 'أحمد محمد السالم',
      email: 'ahmed.salem@example.com'
    },
    message: 'تم تقديم نموذج تفتيش للمنشأة رقم FAC-001',
    details: {
      formId: 'INS-2024-001',
      facilityCode: 'FAC-001',
      facilityName: 'مطعم النخيل',
      violationsCount: 2,
      totalFine: 5000
    }
  },
  {
    id: '3',
    timestamp: '2024-01-15T14:20:33Z',
    type: 'Error',
    severity: 'Error',
    errorType: 'Validation',
    user: {
      id: '2',
      name: 'فاطمة علي الأحمد',
      email: 'fatima.ahmed@example.com'
    },
    message: 'فشل التحقق من البيانات: رقم الهوية الوطنية غير صالح',
    details: {
      field: 'nationalId',
      value: '123',
      errorMessage: 'National ID must be between 10-14 digits',
      stackTrace: 'ValidationError: National ID must be between 10-14 digits\n    at validateNationalId (userService.js:45)\n    at createUser (userService.js:120)'
    }
  },
  {
    id: '4',
    timestamp: '2024-01-15T15:10:42Z',
    type: 'Error',
    severity: 'Warning',
    errorType: 'Network',
    message: 'فشل الاتصال بخادم البيانات - إعادة المحاولة',
    details: {
      url: '/api/inspections',
      method: 'GET',
      statusCode: 0,
      errorMessage: 'Network request failed',
      retryCount: 1,
      stackTrace: 'NetworkError: Failed to fetch\n    at fetchInspections (api.js:23)\n    at Dashboard.componentDidMount (Dashboard.js:67)'
    }
  },
  {
    id: '5',
    timestamp: '2024-01-16T09:15:50Z',
    type: 'UserCreated',
    severity: 'Info',
    user: {
      id: '3',
      name: 'محمد خالد العتيبي',
      email: 'mohammed.otaibi@example.com'
    },
    message: 'تم إنشاء حساب مفتش جديد',
    details: {
      userId: '3',
      role: 'Inspector',
      employeeId: 'EMP003',
      region: 'الرياض',
      createdBy: 'admin@example.com'
    }
  },
  {
    id: '6',
    timestamp: '2024-01-16T10:30:15Z',
    type: 'FormSubmitted',
    severity: 'Info',
    user: {
      id: '3',
      name: 'محمد خالد العتيبي',
      email: 'mohammed.otaibi@example.com'
    },
    message: 'تم تقديم نموذج تفتيش - منشأة متوافقة بدون مخالفات',
    details: {
      formId: 'INS-2024-002',
      facilityCode: 'FAC-002',
      facilityName: 'مخبز الأمل',
      violationsCount: 0,
      totalFine: 0,
      complianceStatus: 'Compliant'
    }
  },
  {
    id: '7',
    timestamp: '2024-01-16T14:55:22Z',
    type: 'Error',
    severity: 'Error',
    errorType: 'Server',
    message: 'خطأ في الخادم أثناء حفظ البيانات',
    details: {
      endpoint: '/api/users/4',
      method: 'PUT',
      statusCode: 500,
      errorMessage: 'Internal Server Error: Database connection timeout',
      stackTrace: 'Error: Database connection timeout\n    at Database.query (db.js:89)\n    at UserRepository.update (userRepository.js:45)\n    at UserService.updateUser (userService.js:156)'
    }
  },
  {
    id: '8',
    timestamp: '2024-01-16T16:22:10Z',
    type: 'FormSubmitted',
    severity: 'Warning',
    user: {
      id: '1',
      name: 'أحمد محمد السالم',
      email: 'ahmed.salem@example.com'
    },
    message: 'تم تقديم نموذج تفتيش مع مخالفات متعددة',
    details: {
      formId: 'INS-2024-003',
      facilityCode: 'FAC-003',
      facilityName: 'كافيه السعادة',
      violationsCount: 5,
      totalFine: 15000,
      complianceStatus: 'NonCompliant',
      criticalViolations: ['انتهاء صلاحية المواد الغذائية', 'عدم وجود شهادات صحية']
    }
  },
  {
    id: '9',
    timestamp: '2024-01-17T08:45:30Z',
    type: 'Error',
    severity: 'Warning',
    errorType: 'Validation',
    user: {
      id: '2',
      name: 'فاطمة علي الأحمد',
      email: 'fatima.ahmed@example.com'
    },
    message: 'تحذير: تم إدخال بريد إلكتروني مكرر',
    details: {
      field: 'email',
      value: 'ahmed.salem@example.com',
      errorMessage: 'Email already exists in the system',
      existingUserId: '1'
    }
  },
  {
    id: '10',
    timestamp: '2024-01-17T11:30:45Z',
    type: 'Error',
    severity: 'Error',
    errorType: 'Unknown',
    message: 'خطأ غير متوقع في التطبيق',
    details: {
      errorMessage: 'Cannot read property "map" of undefined',
      component: 'InspectionsTable',
      stackTrace: 'TypeError: Cannot read property "map" of undefined\n    at InspectionsTable.render (InspectionsTable.js:34)\n    at React.Component.render (react.js:1245)'
    }
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const logService = {
  // Get all logs with filters
  async getLogs(params = {}) {
    await delay(500);
    
    const { 
      type = '', 
      errorType = '', 
      from = '', 
      to = '', 
      search = '', 
      page = 1, 
      pageSize = 10 
    } = params;
    
    let filtered = [...mockLogs];
    
    // Apply type filter
    if (type && type !== 'All') {
      filtered = filtered.filter(log => log.type === type);
    }
    
    // Apply error type filter
    if (errorType && errorType !== 'All') {
      filtered = filtered.filter(log => log.errorType === errorType);
    }
    
    // Apply date range filter
    if (from) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(from));
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // Include the entire day
      filtered = filtered.filter(log => new Date(log.timestamp) <= toDate);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchLower) ||
        (log.user && (
          log.user.name.toLowerCase().includes(searchLower) ||
          log.user.email.toLowerCase().includes(searchLower)
        ))
      );
    }
    
    // Sort by timestamp descending (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Calculate pagination
    const total = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLogs = filtered.slice(startIndex, endIndex);
    
    return {
      data: paginatedLogs,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  },

  // Get log by ID
  async getLogById(id) {
    await delay(300);
    const log = mockLogs.find(l => l.id === id);
    if (!log) {
      throw new Error('Log not found');
    }
    return log;
  },

  // Add new log (for system use)
  async addLog(logData) {
    await delay(300);
    
    const newLog = {
      id: String(mockLogs.length + 1),
      timestamp: new Date().toISOString(),
      type: logData.type,
      severity: logData.severity,
      message: logData.message,
      ...(logData.user && { user: logData.user }),
      ...(logData.details && { details: logData.details }),
      ...(logData.errorType && { errorType: logData.errorType })
    };
    
    mockLogs.unshift(newLog); // Add to beginning (newest first)
    return newLog;
  },

  // Get log statistics
  async getLogStats() {
    await delay(300);
    
    const stats = {
      total: mockLogs.length,
      byType: {
        UserCreated: mockLogs.filter(l => l.type === 'UserCreated').length,
        FormSubmitted: mockLogs.filter(l => l.type === 'FormSubmitted').length,
        Error: mockLogs.filter(l => l.type === 'Error').length
      },
      bySeverity: {
        Info: mockLogs.filter(l => l.severity === 'Info').length,
        Warning: mockLogs.filter(l => l.severity === 'Warning').length,
        Error: mockLogs.filter(l => l.severity === 'Error').length
      },
      byErrorType: {
        Validation: mockLogs.filter(l => l.errorType === 'Validation').length,
        Network: mockLogs.filter(l => l.errorType === 'Network').length,
        Server: mockLogs.filter(l => l.errorType === 'Server').length,
        Unknown: mockLogs.filter(l => l.errorType === 'Unknown').length
      }
    };
    
    return stats;
  }
};

export default logService;
