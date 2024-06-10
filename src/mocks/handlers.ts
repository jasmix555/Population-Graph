import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../api/resas/resas-api';

export const handlers = [
  // Handle a GET request to fetch prefectures
  http.get(`${BASE_URL}/api/v1/prefectures`, () => {
    return HttpResponse.json({
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
        { prefCode: 3, prefName: '岩手県' },
        { prefCode: 13, prefName: '東京都' },
        { prefCode: 27, prefName: '大阪府' },
      ],
    });
  }),

  // Handle a GET request to fetch population data
  http.get(`${BASE_URL}/api/v1/population/composition/perYear`, () => {
    return HttpResponse.json({
      message: null,
      result: {
        boundaryYear: 2020,
        data: [
          {
            label: 'label1',
            data: [
              { year: 1980, value: 10000 },
              { year: 1990, value: 12000 },
              { year: 2000, value: 14000 },
              { year: 2010, value: 16000 },
              { year: 2020, value: 18000 },
            ],
          },
          {
            label: 'label2',
            data: [
              { year: 1980, value: 20000 },
              { year: 1990, value: 22000 },
              { year: 2000, value: 24000 },
              { year: 2010, value: 26000 },
              { year: 2020, value: 28000 },
            ],
          },
        ],
      },
    });
  }),
];
