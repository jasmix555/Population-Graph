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
        { prefCode: 1, prefName: 'prefecture1' },
        { prefCode: 2, prefName: 'prefecture2' },
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
