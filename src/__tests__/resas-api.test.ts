import { fetchPrefectures, fetchPopulation } from '../api/resas/resas-api';
import { BASE_URL } from '../api/resas/resas-api';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('RESAS API', () => {
  afterEach(() => {
    server.resetHandlers();
  });

  describe('fetchPrefectures', () => {
    it('should return an array of prefectures on success', async () => {
      const prefectures = await fetchPrefectures();
      expect(prefectures).toEqual([
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
        { prefCode: 3, prefName: '岩手県' },
        { prefCode: 13, prefName: '東京都' },
        { prefCode: 27, prefName: '大阪府' },
      ]);
    });

    it('should throw an error when the API fails to fetch prefectures', async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/prefectures`, () => {
          return new HttpResponse(null, {
            status: 404,
            statusText: 'Failed to fetch prefecturesd',
          });
        }),
      );

      await expect(fetchPrefectures()).rejects.toThrow(
        'Failed to fetch prefectures',
      );
    });

    it('should throw an error when an unexpected error occurs', async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/prefectures`, () => {
          return new HttpResponse(null, {
            status: 503,
            statusText: 'Unexpected error occurred',
          });
        }),
      );

      await expect(fetchPrefectures()).rejects.toThrow(
        'Failed to fetch prefectures',
      );
    });
  });

  describe('fetchPopulation', () => {
    it('should fetch population data successfully', async () => {
      const prefCode = 1;
      const result = await fetchPopulation(prefCode);

      expect(result).toEqual([
        {
          label: '総人口',
          data: [
            { year: 1980, value: 10000 },
            { year: 1990, value: 12000 },
            { year: 2000, value: 14000 },
            { year: 2010, value: 16000 },
            { year: 2020, value: 18000 },
          ],
        },
        {
          label: '年少人口',
          data: [
            { year: 1980, value: 20000 },
            { year: 1990, value: 22000 },
            { year: 2000, value: 24000 },
            { year: 2010, value: 26000 },
            { year: 2020, value: 28000 },
          ],
        },
      ]);
    });

    it('should throw an error when the API call fails', async () => {
      const prefCode = 1;

      // Simulate a server error
      server.use(
        http.get(`${BASE_URL}/api/v1/population/composition/perYear`, () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error',
          });
        }),
      );

      await expect(fetchPopulation(prefCode)).rejects.toThrow(
        'Failed to fetch population data',
      );
    });
  });
});
