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
      },
      {
        label: '규모',
        data: [92, 75, 52, 42],
      },
    ],
  },

  // 도넛 차트 (카테고리 분석)
  categoryReport: {
    topCategory: '가공식품',
    categories: [
      { name: '가공식품', value: 40 },
      { name: '냉동식품', value: 25 },
      { name: '달걀·유제품류', value: 20 },
      { name: '채소·과일류', value: 15 },
    ],
  },
};
