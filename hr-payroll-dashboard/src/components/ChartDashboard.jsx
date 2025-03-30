import CircularProgressBar from './components/CircularProgressBar';
import Histogram from './components/Histogram';
import StackedBarChart from './components/StackedBarChart';
import VennDiagram from './components/VennDiagram';
import LinearProgressBar from './components/LinearProgressBar';
import './components/ChartStyle.css';
import React from 'react';
  
  // Data for Circular Progress Bars - Employee Statistics
  const circularProgressBarData = {
    newEmployee: { label: 'New Employee', value: 1203, percentage: 10, color: '#34C759' },
    leaveEmployee: { label: 'Number of Leave', value: 300, percentage: 15, color: '#FF5733' },
    totalEmployee: { label: 'Total Employee', value: 12300, percentage: 20, color: '#40C4FF' },
    averageSalary: { label: 'Average Salary', value: '65865K', percentage: 20, color: '#FF9800' },
  };

  // Data for Histogram - Salary Statistics
  const histogramData = {
    labels: ['Developer', 'Marketing', 'Sales'],
    datasets: [
      {
        label: 'Salary (K USD)',
        data: [6, 3, 2],
        backgroundColor: '#42A5F5',
        borderColor: '#42A5F5',
        borderWidth: 1,
      },
    ],
  };

  // Data for Stacked Bar Chart - Total Salary by Unit
  const stackedBarChartData = {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    datasets: [
      {
        label: 'Sales',
        data: [-50, -40, -30, -20, -10, -5],
        backgroundColor: '#42A5F5',
      },
      {
        label: 'Marketing',
        data: [50, 40, 30, 20, 10, 5],
        backgroundColor: '#90CAF9',
      },
    ],
  };

  // Data for Venn Diagram - Income Analysis
  const vennDiagramData = {
    labels: ['Design', 'Development', 'SEO'],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ['#42A5F5', '#26C6DA', '#4CAF50'],
        borderWidth: 1,
      },
    ],
  };

  // Data for Linear Progress Bar - Employee Structure
  const linearProgressBarData = [
    { label: 'Male', percentage: 65, color: '#26C6DA' },
    { label: 'Female', percentage: 30, color: '#B0BEC5' },
  ];

export default function ChartsDashboard() {
  return (
    <div class="parent">
        <div class="newEmployee">New Employee
            <CircularProgressBar
                label={circularProgressBarData.newEmployee.label}
                value={circularProgressBarData.newEmployee.value}
                percentage={circularProgressBarData.newEmployee.percentage}
                color={circularProgressBarData.newEmployee.color}
            />
        </div>

        <div class="leaveEmployee">Number of Leave
            <CircularProgressBar
                label={circularProgressBarData.leaveEmployee.label}
                value={circularProgressBarData.leaveEmployee.value}
                percentage={circularProgressBarData.leaveEmployee.percentage}
                color={circularProgressBarData.leaveEmployee.color}
            />
        </div>

        <div class="totalEmployee">Total Employee
            <CircularProgressBar
                label={circularProgressBarData.totalEmployee.label}
                value={circularProgressBarData.totalEmployee.value}
                percentage={circularProgressBarData.totalEmployee.percentage}
                color={circularProgressBarData.totalEmployee.color}
            />
        </div>

        <div class="averageSalary">Average Salary
            <CircularProgressBar
                label={circularProgressBarData.averageSalary.label}
                value={circularProgressBarData.averageSalary.value}
                percentage={circularProgressBarData.averageSalary.percentage}
                color={circularProgressBarData.averageSalary.color}
            />
        </div>

        <div class="salaryStatistics">Salary Statistics
            <Histogram data={histogramData} />
        </div>

        <div class="totalSalaryByUnit">Total Salary by Unit
            <StackedBarChart data={stackedBarChartData} />
        </div>

        <div class="incomeAnalysis">Income Analysis
            <VennDiagram data={vennDiagramData} />
        </div>

        <div class="employeeStructure">Employee Structure
            <LinearProgressBar data={linearProgressBarData} />
        </div>

        {/* <div class="employeePerformance">Employee Performance
            
        </div> */}
    </div>
  );
}
  