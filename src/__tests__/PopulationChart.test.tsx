import { render, screen, waitFor } from '@testing-library/react';
import { Prefecture } from '../types/resas-api';
import { PopulationChart } from '../components/PopulationChart';
import { server } from '../mocks/server';
import { BASE_URL } from '../api/resas/resas-api';
import Highcharts from 'highcharts';
import { http, HttpResponse } from 'msw';

describe('PopulationChart', () => {
  const selectedPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: 'Hokkaido' },
    { prefCode: 2, prefName: 'Aomori' },
  ];

  it('renders without crashing', () => {
    render(<PopulationChart selectedPrefectures={selectedPrefectures} />);
  });

  it('displays loading indicator when fetching data', async () => {
    render(<PopulationChart selectedPrefectures={selectedPrefectures} />);

    // Check if loading message is displayed
    expect(screen.getByText('読み込み中。。。')).toBeInTheDocument();
  });

  it('displays the chart with data', async () => {
    render(<PopulationChart selectedPrefectures={selectedPrefectures} />);

    // Wait for the category and year elements to appear
    await waitFor(() => {
      expect(screen.getByText('総人口')).toBeInTheDocument();
      expect(screen.getByText('1980')).toBeInTheDocument();
      expect(screen.getByText('1990')).toBeInTheDocument();
    });

    // Check if Highcharts is rendered
    await waitFor(() => {
      expect(Highcharts.charts.length).toBeGreaterThan(0);
    });
  });

  it('handles errors correctly', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/population/composition/perYear`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    render(<PopulationChart selectedPrefectures={selectedPrefectures} />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('読み込みエラー')).toBeInTheDocument();
    });
  });
});
