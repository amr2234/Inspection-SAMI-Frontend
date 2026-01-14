// Visits Management API Service
// This is a mock service - replace with actual API calls

import { inspectionData } from 'variables/inspectionData';

const API_BASE_URL = '/api/visits';

// Transform inspection data into visit format
const transformToVisits = () => {
  return inspectionData.map((inspection, index) => ({
    id: `VISIT-${String(index + 1).padStart(4, '0')}`,
    dateTime: inspection.visitDateTime,
    establishmentName: inspection.facilityName,
    establishmentCode: inspection.facilityCode,
    branch: inspection.branch || 'الفرع الرئيسي',
    region: inspection.region,
    city: inspection.city,
    sector: inspection.facilityType,
    visitType: inspection.activityType,
    complianceStatus: inspection.complianceStatus,
    violationsCount: inspection.violationType ? 1 : 0,
    samplesCount: inspection.totalSamples || 0,
    finesTotal: inspection.totalFine || 0,
    isArchived: false,
    canEdit: true, // Will be determined by backend based on user role and visit ownership
    inspectorName: inspection.mainInspectorName,
    inspectorId: inspection.mainInspectorId || '1',
  }));
};

let mockVisits = transformToVisits();

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const visitService = {
  // Get all visits with filters
  async getVisits(params = {}) {
    await delay(500);
    
    const { 
      search = '', 
      from = '', 
      to = '', 
      region = '', 
      city = '', 
      sector = '', 
      compliance = '', 
      visitType = '',
      archived = false,
      assignedTo = '', // Special filter for "my visits"
      page = 1, 
      pageSize = 10 
    } = params;
    
    let filtered = [...mockVisits];
    
    // Apply archived filter
    filtered = filtered.filter(visit => visit.isArchived === archived);
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(visit => 
        visit.establishmentName.toLowerCase().includes(searchLower) ||
        visit.establishmentCode.toLowerCase().includes(searchLower) ||
        visit.branch.toLowerCase().includes(searchLower) ||
        visit.id.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply date range filter
    if (from) {
      filtered = filtered.filter(visit => new Date(visit.dateTime) >= new Date(from));
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(visit => new Date(visit.dateTime) <= toDate);
    }
    
    // Apply region filter
    if (region) {
      filtered = filtered.filter(visit => visit.region === region);
    }
    
    // Apply city filter
    if (city) {
      filtered = filtered.filter(visit => visit.city === city);
    }
    
    // Apply sector filter
    if (sector) {
      filtered = filtered.filter(visit => visit.sector === sector);
    }
    
    // Apply compliance status filter
    if (compliance) {
      filtered = filtered.filter(visit => visit.complianceStatus === compliance);
    }
    
    // Apply visit type filter
    if (visitType) {
      filtered = filtered.filter(visit => visit.visitType === visitType);
    }
    
    // Apply assignedTo filter (for "my visits")
    if (assignedTo === 'me') {
      // Mock: filter by current user (assuming user is أحمد محمد السالم)
      filtered = filtered.filter(visit => visit.inspectorName === 'أحمد محمد السالم');
    }
    
    // Sort by date descending (newest first)
    filtered.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    
    // Calculate pagination
    const total = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedVisits = filtered.slice(startIndex, endIndex);
    
    return {
      data: paginatedVisits,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  },

  // Get visit by ID
  async getVisitById(id) {
    await delay(300);
    const visit = mockVisits.find(v => v.id === id);
    if (!visit) {
      throw new Error('Visit not found');
    }
    return visit;
  },

  // Update visit
  async updateVisit(id, visitData) {
    await delay(500);
    
    const index = mockVisits.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Visit not found');
    }
    
    const updatedVisit = {
      ...mockVisits[index],
      ...visitData
    };
    
    mockVisits[index] = updatedVisit;
    return updatedVisit;
  },

  // Archive visit
  async archiveVisit(id) {
    await delay(500);
    
    const index = mockVisits.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Visit not found');
    }
    
    mockVisits[index].isArchived = true;
    return mockVisits[index];
  },

  // Unarchive visit
  async unarchiveVisit(id) {
    await delay(500);
    
    const index = mockVisits.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Visit not found');
    }
    
    mockVisits[index].isArchived = false;
    return mockVisits[index];
  },

  // Get unique filter options
  async getFilterOptions() {
    await delay(200);
    
    const regions = [...new Set(mockVisits.map(v => v.region))].sort();
    const cities = [...new Set(mockVisits.map(v => v.city))].sort();
    const sectors = [...new Set(mockVisits.map(v => v.sector))].sort();
    const visitTypes = [...new Set(mockVisits.map(v => v.visitType))].sort();
    
    return {
      regions,
      cities,
      sectors,
      visitTypes
    };
  }
};

export default visitService;
