import { render, screen } from '@testing-library/react';
import { Prefecture } from '../types/resas-api';
import { PopulationChart } from '../components/PopulationChart/PopulationChart';

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

    expect(screen.getByText('読み込み中。。。')).toBeInTheDocument();
  });

  // it('displays error message when fetching data fails', async () => {
  //   render(<PopulationChart selectedPrefectures={selectedPrefectures} />);

  //   await waitFor(() => {
  //     expect(screen.getByText('読み込みエラー')).toBeInTheDocument();
  //   });
  // });
});
