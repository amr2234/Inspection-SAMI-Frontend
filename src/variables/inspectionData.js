// Mock Inspection Data based on the form structure
export const inspectionData = [
  {
    id: 1,
    visitDateTime: '2026-01-15T10:30',
    violationType: 'مخالفة بيئية',
    facilityName: 'مصنع الأمل للصناعات الغذائية',
    facilityCode: 'F-001',
    branch: 'الفرع الرئيسي',
    facilityType: 'مصنع',
    activityType: 'صناعي',
    activityCategory: 'الفئة الأولى',
    region: 'الرياض',
    city: 'الرياض',
    latitude: 24.7136,
    longitude: 46.6753,
    facilityStatus: 'نشطة',
    dataUpdated: 'نعم',
    complianceStatus: 'غير ملتزم',
    visitType: 'زيارة دورية',
    addedToDatabase: 'نعم',
    sector: 'القطاع الخاص',
    deviceCount: 3,
    devices: [
      { name: 'جهاز قياس الانبعاثات', number: 'D-001' },
      { name: 'جهاز قياس الضوضاء', number: 'D-002' },
      { name: 'جهاز تحليل الهواء', number: 'D-003' }
    ],
    samplesCollected: 'نعم',
    sampleType: 'عينة هواء',
    sampleStorageLocation: 'المختبر المركزي - الرياض',
    sampleNumber: 'S-2026-001',
    sampleResult: 'غير مطابق',
    totalSamples: 5,
    violation2Type: 'تلوث بيئي',
    regulation1: 'المادة 5 - الفقرة 1',
    regulation2: 'المادة 7 - الفقرة 3',
    fine1: 15000,
    fine2: 8000,
    totalFine: 23000,
    mainInspectorName: 'أحمد محمد السالم',
    mainInspectorTitle: 'مفتش بيئي أول',
    assistantInspectorName: 'خالد عبدالله النمر',
    assistantInspectorTitle: 'مفتش بيئي'
  },
  {
    id: 2,
    visitDateTime: '2026-01-12T14:15',
    violationType: 'مخالفة إدارية',
    facilityName: 'شركة النور للتجارة والمقاولات',
    facilityCode: 'F-002',
    branch: 'الفرع الشمالي',
    facilityType: 'مكتب',
    activityType: 'تجاري',
    activityCategory: 'الفئة الثانية',
    region: 'مكة المكرمة',
    city: 'جدة',
    latitude: 21.4858,
    longitude: 39.1925,
    facilityStatus: 'نشطة',
    dataUpdated: 'نعم',
    complianceStatus: 'ملتزم جزئياً',
    visitType: 'زيارة متابعة',
    addedToDatabase: 'نعم',
    sector: 'القطاع الخاص',
    deviceCount: 1,
    devices: [
      { name: 'جهاز قياس جودة الهواء', number: 'D-010' }
    ],
    samplesCollected: 'لا',
    sampleType: 'عينة أخرى',
    sampleStorageLocation: 'لا يوجد',
    sampleNumber: 'N/A',
    sampleResult: 'غير متوفر',
    totalSamples: 0,
    violation2Type: 'عدم وجود تراخيص',
    regulation1: 'المادة 10 - الفقرة 1',
    regulation2: 'المادة 12 - الفقرة 2',
    fine1: 5000,
    fine2: 3000,
    totalFine: 8000,
    mainInspectorName: 'فهد سعد الغامدي',
    mainInspectorTitle: 'مفتش إداري',
    assistantInspectorName: '',
    assistantInspectorTitle: ''
  },
  {
    id: 3,
    visitDateTime: '2026-01-10T09:00',
    violationType: 'مخالفة فنية',
    facilityName: 'مستودعات الخليج الحديثة',
    facilityCode: 'F-003',
    branch: 'الفرع الشرقي',
    facilityType: 'مستودع',
    activityType: 'خدمي',
    activityCategory: 'الفئة الثالثة',
    region: 'الشرقية',
    city: 'الدمام',
    latitude: 26.4207,
    longitude: 50.0888,
    facilityStatus: 'نشطة',
    dataUpdated: 'لا',
    complianceStatus: 'ملتزم',
    visitType: 'زيارة دورية',
    addedToDatabase: 'لا',
    sector: 'القطاع المختلط',
    deviceCount: 2,
    devices: [
      { name: 'جهاز كشف التسربات', number: 'D-025' },
      { name: 'جهاز قياس الحرارة', number: 'D-026' }
    ],
    samplesCollected: 'نعم',
    sampleType: 'عينة منتج',
    sampleStorageLocation: 'مختبر الدمام',
    sampleNumber: 'S-2026-002',
    sampleResult: 'مطابق',
    totalSamples: 3,
    violation2Type: 'عدم الالتزام بالاشتراطات البيئية',
    regulation1: 'المادة 7 - الفقرة 1',
    regulation2: 'المادة 15 - الفقرة 1',
    fine1: 12000,
    fine2: 7000,
    totalFine: 19000,
    mainInspectorName: 'محمد إبراهيم القحطاني',
    mainInspectorTitle: 'مفتش فني أول',
    assistantInspectorName: 'عبدالرحمن فيصل',
    assistantInspectorTitle: 'مفتش فني مساعد'
  },
  {
    id: 4,
    visitDateTime: '2026-01-08T11:45',
    violationType: 'مخالفة بيئية',
    facilityName: 'ورشة البناء المتطورة',
    facilityCode: 'F-004',
    branch: 'الفرع الغربي',
    facilityType: 'ورشة',
    activityType: 'صناعي',
    activityCategory: 'الفئة الرابعة',
    region: 'مكة المكرمة',
    city: 'مكة',
    latitude: 21.3891,
    longitude: 39.8579,
    facilityStatus: 'متوقفة مؤقتاً',
    dataUpdated: 'نعم',
    complianceStatus: 'غير ملتزم',
    visitType: 'زيارة طارئة',
    addedToDatabase: 'نعم',
    sector: 'القطاع الخاص',
    deviceCount: 4,
    devices: [
      { name: 'جهاز قياس الانبعاثات', number: 'D-030' },
      { name: 'جهاز قياس الضوضاء', number: 'D-031' },
      { name: 'جهاز تحليل المياه', number: 'D-032' },
      { name: 'جهاز قياس الإشعاع', number: 'D-033' }
    ],
    samplesCollected: 'نعم',
    sampleType: 'عينة مياه',
    sampleStorageLocation: 'مختبر مكة',
    sampleNumber: 'S-2026-003',
    sampleResult: 'غير مطابق',
    totalSamples: 8,
    violation2Type: 'تصريف غير قانوني',
    regulation1: 'المادة 5 - الفقرة 2',
    regulation2: 'المادة 7 - الفقرة 3',
    fine1: 25000,
    fine2: 15000,
    totalFine: 40000,
    mainInspectorName: 'سعد عبدالعزيز الدوسري',
    mainInspectorTitle: 'مفتش بيئي أول',
    assistantInspectorName: 'يوسف حسن',
    assistantInspectorTitle: 'مفتش بيئي'
  },
  {
    id: 5,
    visitDateTime: '2026-01-05T13:20',
    violationType: 'مخالفة إدارية',
    facilityName: 'محل الصفوة للمواد الغذائية',
    facilityCode: 'F-005',
    branch: 'الفرع الجنوبي',
    facilityType: 'محل تجاري',
    activityType: 'تجاري',
    activityCategory: 'الفئة الثانية',
    region: 'عسير',
    city: 'أبها',
    latitude: 18.2164,
    longitude: 42.5053,
    facilityStatus: 'نشطة',
    dataUpdated: 'نعم',
    complianceStatus: 'ملتزم',
    visitType: 'زيارة استقصائية',
    addedToDatabase: 'نعم',
    sector: 'القطاع الخاص',
    deviceCount: 1,
    devices: [
      { name: 'جهاز قياس الحرارة والرطوبة', number: 'D-040' }
    ],
    samplesCollected: 'نعم',
    sampleType: 'عينة منتج',
    sampleStorageLocation: 'مختبر أبها',
    sampleNumber: 'S-2026-004',
    sampleResult: 'مطابق',
    totalSamples: 2,
    violation2Type: 'عدم الالتزام بالاشتراطات البيئية',
    regulation1: 'المادة 10 - الفقرة 1',
    regulation2: 'المادة 15 - الفقرة 1',
    fine1: 3000,
    fine2: 2000,
    totalFine: 5000,
    mainInspectorName: 'علي حسين العمري',
    mainInspectorTitle: 'مفتش إداري',
    assistantInspectorName: '',
    assistantInspectorTitle: ''
  },
  {
    id: 6,
    visitDateTime: '2025-12-28T10:00',
    violationType: 'مخالفة بيئية',
    facilityName: 'مصنع الرياض للبلاستيك',
    facilityCode: 'F-001',
    branch: 'الفرع الرئيسي',
    facilityType: 'مصنع',
    activityType: 'صناعي',
    activityCategory: 'الفئة الأولى',
    region: 'الرياض',
    city: 'الرياض',
    latitude: 24.7136,
    longitude: 46.6753,
    facilityStatus: 'نشطة',
    dataUpdated: 'نعم',
    complianceStatus: 'غير ملتزم',
    visitType: 'زيارة دورية',
    addedToDatabase: 'نعم',
    sector: 'القطاع الخاص',
    deviceCount: 5,
    devices: [
      { name: 'جهاز قياس الانبعاثات', number: 'D-050' },
      { name: 'جهاز قياس جودة الهواء', number: 'D-051' },
      { name: 'جهاز تحليل الغازات', number: 'D-052' },
      { name: 'جهاز قياس الضوضاء', number: 'D-053' },
      { name: 'جهاز قياس الاهتزازات', number: 'D-054' }
    ],
    samplesCollected: 'نعم',
    sampleType: 'عينة هواء',
    sampleStorageLocation: 'المختبر المركزي',
    sampleNumber: 'S-2025-099',
    sampleResult: 'غير مطابق',
    totalSamples: 10,
    violation2Type: 'تلوث بيئي',
    regulation1: 'المادة 5 - الفقرة 1',
    regulation2: 'المادة 5 - الفقرة 2',
    fine1: 30000,
    fine2: 20000,
    totalFine: 50000,
    mainInspectorName: 'أحمد محمد السالم',
    mainInspectorTitle: 'مفتش بيئي أول',
    assistantInspectorName: 'خالد عبدالله النمر',
    assistantInspectorTitle: 'مفتش بيئي'
  },
  {
    id: 7,
    visitDateTime: '2025-12-20T15:30',
    violationType: 'مخالفة فنية',
    facilityName: 'شركة الخليج للخدمات اللوجستية',
    facilityCode: 'F-002',
    branch: 'الفرع الشرقي',
    facilityType: 'مستودع',
    activityType: 'خدمي',
    activityCategory: 'الفئة الثانية',
    region: 'الشرقية',
    city: 'الدمام',
    latitude: 26.4207,
    longitude: 50.0888,
    facilityStatus: 'نشطة',
    dataUpdated: 'نعم',
    complianceStatus: 'ملتزم جزئياً',
    visitType: 'زيارة متابعة',
    addedToDatabase: 'نعم',
    sector: 'القطاع المختلط',
    deviceCount: 2,
    devices: [
      { name: 'جهاز كشف التسربات', number: 'D-060' },
      { name: 'جهاز قياس الحرارة', number: 'D-061' }
    ],
    samplesCollected: 'لا',
    sampleType: 'عينة أخرى',
    sampleStorageLocation: 'لا يوجد',
    sampleNumber: 'N/A',
    sampleResult: 'غير متوفر',
    totalSamples: 0,
    violation2Type: 'مخالفة بناء',
    regulation1: 'المادة 12 - الفقرة 2',
    regulation2: 'المادة 15 - الفقرة 1',
    fine1: 10000,
    fine2: 6000,
    totalFine: 16000,
    mainInspectorName: 'محمد إبراهيم القحطاني',
    mainInspectorTitle: 'مفتش فني أول',
    assistantInspectorName: 'عبدالرحمن فيصل',
    assistantInspectorTitle: 'مفتش فني مساعد'
  },
  {
    id: 8,
    visitDateTime: '2025-12-15T09:15',
    violationType: 'مخالفة إدارية',
    facilityName: 'مكتب الهندسة الاستشارية المتقدمة',
    facilityCode: 'F-003',
    branch: 'الفرع الرئيسي',
    facilityType: 'مكتب',
    activityType: 'خدمي',
    activityCategory: 'الفئة الثالثة',
    region: 'الرياض',
    city: 'الرياض',
    latitude: 24.7741,
    longitude: 46.7380,
    facilityStatus: 'نشطة',
    dataUpdated: 'لا',
    complianceStatus: 'ملتزم',
    visitType: 'زيارة دورية',
    addedToDatabase: 'لا',
    sector: 'القطاع الخاص',
    deviceCount: 0,
    devices: [],
    samplesCollected: 'لا',
    sampleType: 'عينة أخرى',
    sampleStorageLocation: 'لا يوجد',
    sampleNumber: 'N/A',
    sampleResult: 'غير متوفر',
    totalSamples: 0,
    violation2Type: 'عدم وجود تراخيص',
    regulation1: 'المادة 10 - الفقرة 1',
    regulation2: 'المادة 10 - الفقرة 1',
    fine1: 4000,
    fine2: 2000,
    totalFine: 6000,
    mainInspectorName: 'فهد سعد الغامدي',
    mainInspectorTitle: 'مفتش إداري',
    assistantInspectorName: '',
    assistantInspectorTitle: ''
  }
];

// Helper functions for data analysis
export const getInspectionStats = (data) => {
  return {
    totalInspections: data.length,
    totalViolations: data.length * 2, // Each inspection has 2 violations
    totalFines: data.reduce((sum, item) => sum + item.totalFine, 0),
    activeFacilities: new Set(data.map(item => item.facilityCode)).size,
    complianceRate: ((data.filter(item => item.complianceStatus === 'ملتزم').length / data.length) * 100).toFixed(1),
    totalSamples: data.reduce((sum, item) => sum + item.totalSamples, 0),
    totalDevices: data.reduce((sum, item) => sum + item.deviceCount, 0),
    pendingFollowups: data.filter(item => item.visitType === 'زيارة متابعة').length
  };
};

export const getViolationsByType = (data) => {
  const violations = {};
  data.forEach(item => {
    violations[item.violationType] = (violations[item.violationType] || 0) + 1;
  });
  return violations;
};

export const getInspectionsByRegion = (data) => {
  const regions = {};
  data.forEach(item => {
    regions[item.region] = (regions[item.region] || 0) + 1;
  });
  return regions;
};

export const getFacilityTypeDistribution = (data) => {
  const types = {};
  data.forEach(item => {
    types[item.facilityType] = (types[item.facilityType] || 0) + 1;
  });
  return types;
};

export const getActivityTypeDistribution = (data) => {
  const activities = {};
  data.forEach(item => {
    activities[item.activityType] = (activities[item.activityType] || 0) + 1;
  });
  return activities;
};

export const getComplianceByMonth = (data) => {
  const monthlyData = {};
  data.forEach(item => {
    const month = item.visitDateTime.substring(0, 7); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = { compliant: 0, nonCompliant: 0, partial: 0 };
    }
    if (item.complianceStatus === 'ملتزم') monthlyData[month].compliant++;
    else if (item.complianceStatus === 'غير ملتزم') monthlyData[month].nonCompliant++;
    else monthlyData[month].partial++;
  });
  return monthlyData;
};

export const filterInspectionsByDateRange = (data, startDate, endDate) => {
  if (!startDate && !endDate) return data;
  
  return data.filter(item => {
    const visitDate = new Date(item.visitDateTime);
    const start = startDate ? new Date(startDate) : new Date('2000-01-01');
    const end = endDate ? new Date(endDate) : new Date('2099-12-31');
    return visitDate >= start && visitDate <= end;
  });
};

export const filterInspectionsByMonth = (data, year, month) => {
  const yearMonth = `${year}-${String(month).padStart(2, '0')}`;
  return data.filter(item => item.visitDateTime.startsWith(yearMonth));
};

// Inspector-specific helper functions
export const getInspectorStats = (data) => {
  const inspectors = {};
  
  data.forEach(inspection => {
    const name = inspection.mainInspectorName;
    if (!inspectors[name]) {
      inspectors[name] = {
        name: name,
        title: inspection.mainInspectorTitle,
        totalInspections: 0,
        totalViolations: 0,
        totalFines: 0,
        facilities: new Set(),
        regions: new Set(),
        compliantCount: 0,
        nonCompliantCount: 0,
        lastInspectionDate: inspection.visitDateTime,
      };
    }
    
    inspectors[name].totalInspections++;
    inspectors[name].totalViolations += 2; // Each inspection has 2 violations
    inspectors[name].totalFines += inspection.totalFine;
    inspectors[name].facilities.add(inspection.facilityCode);
    inspectors[name].regions.add(inspection.region);
    
    if (inspection.complianceStatus === 'ملتزم') {
      inspectors[name].compliantCount++;
    } else {
      inspectors[name].nonCompliantCount++;
    }
    
    // Update last inspection date
    if (new Date(inspection.visitDateTime) > new Date(inspectors[name].lastInspectionDate)) {
      inspectors[name].lastInspectionDate = inspection.visitDateTime;
    }
  });
  
  // Convert Set to count
  Object.values(inspectors).forEach(inspector => {
    inspector.facilitiesCount = inspector.facilities.size;
    inspector.regionsCount = inspector.regions.size;
    inspector.complianceRate = ((inspector.compliantCount / inspector.totalInspections) * 100).toFixed(1);
    delete inspector.facilities;
    delete inspector.regions;
  });
  
  return Object.values(inspectors);
};

export const getInspectorFacilityMatrix = (data) => {
  const matrix = {};
  
  data.forEach(inspection => {
    const inspector = inspection.mainInspectorName;
    const facility = inspection.facilityCode;
    
    if (!matrix[inspector]) {
      matrix[inspector] = {};
    }
    
    if (!matrix[inspector][facility]) {
      matrix[inspector][facility] = {
        count: 0,
        facilityName: inspection.facilityName,
        lastVisit: inspection.visitDateTime,
      };
    }
    
    matrix[inspector][facility].count++;
    
    if (new Date(inspection.visitDateTime) > new Date(matrix[inspector][facility].lastVisit)) {
      matrix[inspector][facility].lastVisit = inspection.visitDateTime;
    }
  });
  
  return matrix;
};

export const getInspectorTimeline = (data) => {
  const timeline = {};
  
  data.forEach(inspection => {
    const inspector = inspection.mainInspectorName;
    const month = inspection.visitDateTime.substring(0, 7); // YYYY-MM
    
    if (!timeline[inspector]) {
      timeline[inspector] = {};
    }
    
    if (!timeline[inspector][month]) {
      timeline[inspector][month] = 0;
    }
    
    timeline[inspector][month]++;
  });
  
  return timeline;
};

export const getFacilityLocations = (data) => {
  const locations = {};
  
  data.forEach(inspection => {
    const facilityCode = inspection.facilityCode;
    
    if (!locations[facilityCode]) {
      locations[facilityCode] = {
        facilityCode: facilityCode,
        facilityName: inspection.facilityName,
        latitude: inspection.latitude,
        longitude: inspection.longitude,
        region: inspection.region,
        city: inspection.city,
        visits: [],
      };
    }
    
    locations[facilityCode].visits.push({
      date: inspection.visitDateTime,
      inspector: inspection.mainInspectorName,
      violationType: inspection.violationType,
      complianceStatus: inspection.complianceStatus,
      fine: inspection.totalFine,
    });
  });
  
  return Object.values(locations);
};
