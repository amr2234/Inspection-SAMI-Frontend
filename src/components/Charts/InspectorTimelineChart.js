import React from 'react';
import ReactApexChart from 'react-apexcharts';

class InspectorTimelineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.updateChartData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.updateChartData();
    }
  }

  updateChartData() {
    const { data } = this.props;
    
    // Check if data exists and is not empty
    if (!data || Object.keys(data).length === 0) {
      this.setState({
        chartData: [],
        chartOptions: {},
      });
      return;
    }
    
    // Process data to create series for each inspector
    const allMonths = new Set();
    Object.values(data).forEach(inspectorData => {
      Object.keys(inspectorData).forEach(month => allMonths.add(month));
    });
    
    const sortedMonths = Array.from(allMonths).sort();
    
    const series = Object.keys(data).map(inspectorName => ({
      name: inspectorName,
      data: sortedMonths.map(month => data[inspectorName][month] || 0)
    }));

    const categories = sortedMonths.map(month => {
      const date = new Date(month + '-01');
      return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short' });
    });

    const chartOptions = {
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
        fontFamily: 'Cairo, sans-serif',
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      colors: ['#224D59', '#62AD45', '#346860', '#4a8a34', '#5B9C7F'],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: '#718096',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#718096',
            fontSize: '12px',
          },
        },
        title: {
          text: 'عدد الزيارات',
          style: {
            color: '#718096',
          },
        },
      },
      grid: {
        borderColor: '#E2E8F0',
        strokeDashArray: 5,
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: '#718096',
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val) {
            return val + ' زيارة';
          },
        },
      },
      markers: {
        size: 5,
        strokeWidth: 0,
        hover: {
          size: 7,
        },
      },
    };

    this.setState({
      chartData: series,
      chartOptions: chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="line"
        width="100%"
        height="350"
      />
    );
  }
}

export default InspectorTimelineChart;
