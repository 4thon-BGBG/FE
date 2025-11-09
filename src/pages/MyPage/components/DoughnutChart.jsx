// 차트 정보 찾기: https://www.chartjs.org/docs/latest/samples/information.html
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './DoughnutChart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

// 차트 옵션 설정
const options = {
  responsive: true,
  maintainAspectRatio: false, // 부모 컨테이너 비율 상관없이 꽉채우기
  cutout: '50%',
  circumference: 360,
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          size: 12,
          weight: 'bold',
        },
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 10, // 범례 항목 간의 간격
      },
    },
    title: {
      display: false,
    },
  },
};

export const DoughnutChart = ({ data }) => {
  return (
    <div className={styles.container}>
      <Doughnut options={options} data={data} />
    </div>
  );
};
