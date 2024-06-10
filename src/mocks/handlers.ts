import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../api/resas/resas-api';

export const handlers = [
  // Handle a GET request to fetch prefectures
  http.get(`${BASE_URL}/api/v1/prefectures`, () => {
    return HttpResponse.json({
      result: [
        {
          prefCode: 1,
          prefName: 'prefecture1',
        },
        {
          prefCode: 2,
          prefName: 'prefecture2',
        },
      ],
    });
  }),

  // Handle a GET request to fetch population data
  http.get(`${BASE_URL}/api/v1/population/composition/perYear`, () => {
    return HttpResponse.json({
      result: {
        boundaryYear: 2020,
        data: [
          {
            label: 'label1',
            data: [
              { year: 2010, value: 1000 },
              { year: 2015, value: 1200 },
              { year: 2020, value: 1500 },
            ],
          },
          {
            label: 'label2',
            data: [
              { year: 2010, value: 2000 },
              { year: 2015, value: 2200 },
              { year: 2020, value: 2500 },
            ],
          },
        ],
      },
    });
  }),
];
