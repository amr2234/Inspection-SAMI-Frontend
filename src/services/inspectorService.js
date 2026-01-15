// Mock Inspector Service
// This will be replaced with real API calls

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock inspectors data
const mockInspectors = [
  {
    id: '1',
    name: 'أحمد محمد السعيد',
    employeeId: 'EMP-2024-001',
    nationalId: '1234567890',
    email: 'ahmed.saeed@sami.gov.sa',
    phone: '+966501234567',
    title: 'مفتش أول',
    department: 'إدارة التفتيش البيئي',
    region: 'الرياض',
    city: 'الرياض',
    specialization: 'تفتيش بيئي',
    qualifications: 'بكالوريوس هندسة بيئية',
    totalInspections: 145,
    totalViolations: 32,
    totalFines: 156000,
    complianceRate: 78,
    lastInspectionDate: '2024-01-15',
    joinDate: '2020-03-15',
    isActive: true,
    status: 'نشط',
  },
  {
    id: 'INS002',
    name: 'فاطمة عبدالله الزهراني',
    employeeId: 'EMP-2024-002',
    nationalId: '0987654321',
    email: 'fatima.zahrani@sami.gov.sa',
    phone: '+966502345678',
    title: 'مفتش',
    department: 'إدارة التفتيش الفني',
    region: 'مكة المكرمة',
    city: 'جدة',
    specialization: 'تفتيش فني',
    qualifications: 'ماجستير إدارة جودة',
    totalInspections: 128,
    totalViolations: 28,
    totalFines: 142000,
    complianceRate: 82,
    lastInspectionDate: '2024-01-14',
    joinDate: '2019-06-20',
    isActive: true,
    status: 'نشط',
  },
  {
    id: 'INS003',
    name: 'خالد سعود المطيري',
    employeeId: 'EMP-2024-003',
    nationalId: '1122334455',
    email: 'khaled.mutairi@sami.gov.sa',
    phone: '+966503456789',
    title: 'مفتش',
    department: 'إدارة التفتيش الإداري',
    region: 'الشرقية',
    city: 'الدمام',
    specialization: 'تفتيش إداري',
    qualifications: 'بكالوريوس إدارة أعمال',
    totalInspections: 112,
    totalViolations: 25,
    totalFines: 128000,
    complianceRate: 75,
    lastInspectionDate: '2024-01-13',
    joinDate: '2021-01-10',
    isActive: true,
    status: 'نشط',
  },
  {
    id: 'INS004',
    name: 'نورة حسن القحطاني',
    employeeId: 'EMP-2024-004',
    nationalId: '2233445566',
    email: 'noura.qahtani@sami.gov.sa',
    phone: '+966504567890',
    title: 'مفتش أول',
    department: 'إدارة التفتيش البيئي',
    region: 'عسير',
    city: 'أبها',
    specialization: 'تفتيش بيئي',
    qualifications: 'دكتوراه علوم بيئية',
    totalInspections: 156,
    totalViolations: 18,
    totalFines: 98000,
    complianceRate: 88,
    lastInspectionDate: '2024-01-16',
    joinDate: '2018-09-01',
    isActive: true,
    status: 'نشط',
  },
  {
    id: 'INS005',
    name: 'محمد علي الشهري',
    employeeId: 'EMP-2024-005',
    nationalId: '3344556677',
    email: 'mohamed.shehri@sami.gov.sa',
    phone: '+966505678901',
    title: 'مفتش متدرب',
    department: 'إدارة التفتيش الفني',
    region: 'الرياض',
    city: 'الرياض',
    specialization: 'تفتيش فني',
    qualifications: 'بكالوريوس هندسة ميكانيكية',
    totalInspections: 45,
    totalViolations: 12,
    totalFines: 52000,
    complianceRate: 65,
    lastInspectionDate: '2024-01-12',
    joinDate: '2023-05-01',
    isActive: true,
    status: 'نشط',
  },
];

const inspectorService = {
  // Get all inspectors with filters and pagination
  async getInspectors({ search = '', region = 'All', specialization = 'All', status = 'All', page = 1, pageSize = 10 }) {
    await delay(800);
    
    let filtered = [...mockInspectors];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(inspector =>
        inspector.name.toLowerCase().includes(searchLower) ||
        inspector.employeeId.toLowerCase().includes(searchLower) ||
        inspector.email.toLowerCase().includes(searchLower) ||
        inspector.phone.includes(search) ||
        inspector.id.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply region filter
    if (region !== 'All') {
      filtered = filtered.filter(inspector => inspector.region === region);
    }
    
    // Apply specialization filter
    if (specialization !== 'All') {
      filtered = filtered.filter(inspector => inspector.specialization === specialization);
    }
    
    // Apply status filter
    if (status !== 'All') {
      const isActive = status === 'نشط';
      filtered = filtered.filter(inspector => inspector.isActive === isActive);
    }
    
    // Pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  // Get inspector by ID
  async getInspectorById(id) {
    await delay(600);
    
    const inspector = mockInspectors.find(i => i.id === id);
    
    if (!inspector) {
      throw new Error('المفتش غير موجود');
    }
    
    return inspector;
  },

  // Update inspector
  async updateInspector(id, data) {
    await delay(1000);
    
    const inspector = mockInspectors.find(i => i.id === id);
    
    if (!inspector) {
      throw new Error('المفتش غير موجود');
    }
    
    // Mock update
    console.log('تحديث المفتش:', id, data);
    
    return { success: true, message: 'تم تحديث بيانات المفتش بنجاح' };
  },

  // Toggle inspector active status
  async toggleInspectorActive(id) {
    await delay(800);
    
    const inspector = mockInspectors.find(i => i.id === id);
    
    if (!inspector) {
      throw new Error('المفتش غير موجود');
    }
    
    inspector.isActive = !inspector.isActive;
    inspector.status = inspector.isActive ? 'نشط' : 'غير نشط';
    
    return { success: true, message: `تم ${inspector.isActive ? 'تفعيل' : 'تعطيل'} المفتش بنجاح` };
  },
};

export default inspectorService;
