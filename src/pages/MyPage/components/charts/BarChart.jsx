import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './BarChart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          size: 10,
          weight: 'bold',
        },
        boxWidth: 20, // 범례 색상 상자의 너비를 조정 (이것으로 얇게 조절 가능)
        boxHeight: 2,
        padding: 10, // 범례 항목 간의 간격
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'transparent',
      },
      ticks: {
        padding: '1',
        color: 'rgba(0,0,0,0.7)',
        font: {
          size: '7px',
          weight: 'bold',
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'transparent',
      },
      ticks: {
        color: 'rgba(0,0,0,0.7)',
        font: {
          size: '7px',
          weight: 'bold',
        },
      },
    },
  },
};

export const BarChart = ({ data }) => {
  return (
    <div className={styles.container}>
      <Bar options={options} data={data} />
    </div>
  );
};
