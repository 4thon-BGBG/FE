export const reportMockData = {
  // 기본 정보
  userName: '멋쟁이사자',
  analysisMonth: 11,

  // 상단 텍스트 요약
  summary: {
    avgShoppingCycle: 7.2,
    mostFrequentDay: '토요일',
    mostFrequentTime: '오후',
    avgItemsPerTrip: 7,
  },

  // 바 차트 (주기, 규모)
  weeklyReport: {
    labels: ['11월 1주', '11월 2주', '11월 3주', '11월 4주'],
    datasets: [
      {
        label: '주기',
        data: [78, 95, 62, 38],
        backgroundColor: '#8979FF',
      },
      {
        label: '규모',
        data: [92, 75, 52, 42],
        backgroundColor: '#FF928A',
      },
    ],
  },

  // 도넛 차트 (카테고리 분석)
  categoryReport: {
    topCategory: '가공식품',
    labels: ['가공식품', '냉동식품', '달걀·유제품류', '채소·과일류'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 0,
      },
    ],
  },
};
