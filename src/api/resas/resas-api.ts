const API_KEY = import.meta.env.VITE_RESAS_API_KEY;
const BASE_URL = 'https://opendata.resas-portal.go.jp';

export const fetchPrefectures = async () => {
  const response = await fetch(`${BASE_URL}/api/v1/prefectures`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });
  return response.json();
};
