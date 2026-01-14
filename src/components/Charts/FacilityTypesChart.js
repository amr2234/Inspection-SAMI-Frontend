import React from 'react';
import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

export function FacilityTypesChart({ data }) {
  const textColor = useColorModeValue('gray.700', 'white');
  
  // Process data to count facility types
  const typeCounts = {};
  data.forEach(inspection => {
    const type = inspection.facilityType;
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });

  const labels = Object.keys(typeCounts);
  const values = Object.values(typeCounts);

  const chartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Cairo, sans-serif',
    },
    labels: labels,
    colors: ['#224D59', '#346860', '#62AD45', '#4a8a34', '#5B9C7F'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: textColor,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'إجمالي',
              fontSize: '18px',
              fontWeight: 600,
              color: textColor,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 'bold',
              color: textColor,
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val + ' منشأة';
        },
      },
    },
  };

  return <Chart options={chartOptions} series={values} type="donut" height="350" />;
}
