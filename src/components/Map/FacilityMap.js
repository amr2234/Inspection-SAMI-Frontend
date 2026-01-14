import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Text, Badge, VStack, HStack, Divider } from '@chakra-ui/react';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

class FacilityMap extends Component {
  getMarkerColor(visits) {
    const visitCount = visits.length;
    if (visitCount >= 3) return '#e53e3e'; // Red for high visits
    if (visitCount >= 2) return '#ed8936'; // Orange for medium visits
    return '#38a169'; // Green for low visits
  }

  getComplianceColor(status) {
    switch (status) {
      case 'ملتزم':
        return 'green';
      case 'غير ملتزم':
        return 'red';
      case 'ملتزم جزئياً':
        return 'orange';
      default:
        return 'gray';
    }
  }

  render() {
    const { data } = this.props;
    
    // Calculate center of map based on facilities
    const centerLat = data.length > 0 
      ? data.reduce((sum, loc) => sum + loc.latitude, 0) / data.length 
      : 24.7136;
    const centerLng = data.length > 0 
      ? data.reduce((sum, loc) => sum + loc.longitude, 0) / data.length 
      : 46.6753;

    return (
      <Box height="600px" width="100%" borderRadius="15px" overflow="hidden">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {data.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.latitude, location.longitude]}
              radius={10 + (location.visits.length * 3)}
              pathOptions={{
                color: this.getMarkerColor(location.visits),
                fillColor: this.getMarkerColor(location.visits),
                fillOpacity: 0.6,
                weight: 2,
              }}
            >
              <Popup maxWidth={350} minWidth={250}>
                <VStack align="stretch" spacing={2} dir="rtl">
                  <Text fontSize="md" fontWeight="bold" color="#224D59">
                    {location.facilityName}
                  </Text>
                  
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">الكود:</Text>
                    <Text fontSize="sm" fontWeight="semibold">{location.facilityCode}</Text>
                  </HStack>
                  
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">المنطقة:</Text>
                    <Text fontSize="sm">{location.region} - {location.city}</Text>
                  </HStack>
                  
                  <Divider />
                  
                  <Text fontSize="sm" fontWeight="bold" color="#224D59">
                    الزيارات التفتيشية ({location.visits.length})
                  </Text>
                  
                  <VStack align="stretch" spacing={2} maxH="200px" overflowY="auto">
                    {location.visits.map((visit, idx) => (
                      <Box
                        key={idx}
                        p={2}
                        bg="gray.50"
                        borderRadius="md"
                        borderRight="3px solid"
                        borderRightColor={this.getComplianceColor(visit.complianceStatus)}
                      >
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="xs" fontWeight="bold">{visit.inspector}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(visit.date).toLocaleDateString('ar-SA', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Text>
                        </HStack>
                        
                        <HStack spacing={2} mb={1}>
                          <Badge
                            colorScheme={
                              visit.violationType === 'مخالفة بيئية' ? 'red' :
                              visit.violationType === 'مخالفة فنية' ? 'orange' : 'blue'
                            }
                            fontSize="9px"
                          >
                            {visit.violationType}
                          </Badge>
                          <Badge
                            colorScheme={this.getComplianceColor(visit.complianceStatus)}
                            fontSize="9px"
                          >
                            {visit.complianceStatus}
                          </Badge>
                        </HStack>
                        
                        <Text fontSize="xs" color="green.600" fontWeight="semibold">
                          الغرامة: {visit.fine.toLocaleString('ar-SA')} ر.س
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </Box>
    );
  }
}

export default FacilityMap;
