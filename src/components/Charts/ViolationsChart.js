import React from 'react';
import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

export function ViolationsChart({ data }) {
  const textColor = useColorModeValue('gray.700', 'white');
  
  // Process data to count violations by type
  const violationCounts = {};
  data.forEach(inspection => {
    const type = inspection.violationType;
    violationCounts[type] = (violationCounts[type] || 0) + 1;
  });

  const categories = Object.keys(violationCounts);
  const values = Object.values(violationCounts);

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      fontFamily: 'Cairo, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    colors: ['#224D59'],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
        },
      },
      title: {
        text: 'عدد المخالفات',
        style: {
          color: textColor,
        },
      },
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 5,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val + ' مخالفة';
        },
      },
    },
  };

  const series = [
    {
      name: 'المخالفات',
      data: values,
    },
  ];

  return <Chart options={chartOptions} series={series} type="bar" height="300" />;
}
