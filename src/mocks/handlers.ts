import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../api/resas/resas-api';

export const handlers = [
  http.get(`${BASE_URL}/api/v1/prefectures`, () => {
    return HttpResponse.json({
      result: [
        {
          prefCode: 1,
          prefName: '北海道',
        },
        {
          prefCode: 2,
          prefName: '青森県',
        },
      ],
    });
  }),
];
