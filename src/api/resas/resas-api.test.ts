import { describe, it, expect, vi, afterEach } from 'vitest';
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
        { prefCode: 1, prefName: 'Hokkaido' },
        { prefCode: 2, prefName: 'Aomori' },
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

    it('should throw an error when the request fails', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          data: { message: 'Failed to fetch' },
        },
      });

      await expect(fetchPrefectures()).rejects.toThrow('Failed to fetch');
    });
  });
});
