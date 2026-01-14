import React from 'react';
import Chart from 'react-apexcharts';
import { useColorModeValue } from '@chakra-ui/react';

export function RegionalChart({ data }) {
  const textColor = useColorModeValue('gray.700', 'white');
  
  // Process data to count inspections by region
  const regionCounts = {};
  data.forEach(inspection => {
    const region = inspection.region;
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });

  const categories = Object.keys(regionCounts);
  const values = Object.values(regionCounts);

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
        horizontal: true,
        borderRadius: 8,
        barHeight: '70%',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    colors: ['#62AD45'],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
        },
      },
      title: {
        text: 'عدد الزيارات',
        style: {
          color: textColor,
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
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 5,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val + ' زيارة';
        },
      },
    },
  };

  const series = [
    {
      name: 'الزيارات',
      data: values,
    },
  ];

  return <Chart options={chartOptions} series={series} type="bar" height="350" />;
}
