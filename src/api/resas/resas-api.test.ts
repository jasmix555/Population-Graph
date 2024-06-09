import axios from 'axios';
import { fetchPrefectures } from './resas-api';

vi.mock('axios');
const mockedAxios = axios as typeof axios & {
  get: ReturnType<typeof vi.fn>;
};

describe('RESAS API', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchPrefectures', () => {
    it('should return an array of prefectures on success', async () => {
      const mockPrefectures = [
        { prefCode: 1, prefName: 'prefecture1' },
        { prefCode: 2, prefName: 'prefecture2' },
      ];
      mockedAxios.get.mockResolvedValueOnce({
        data: { result: mockPrefectures },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      });

      const prefectures = await fetchPrefectures();
      expect(prefectures).toEqual(mockPrefectures);
    });

    it('should throw an error when the API fails to fetch prefectures', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          data: { message: 'Failed to fetch prefectures' },
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {},
        },
      });
    });

    it('should throw an error when an unexpected error occurs', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
    });
  });
});
