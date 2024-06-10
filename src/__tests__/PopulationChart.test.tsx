import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('updates chart when category changes', async () => {
    render(<PopulationChart selectedPrefectures={selectedPrefectures} />);

    await waitFor(() => {
      expect(screen.getByText('人口推移')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '年少人口' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('年少人口')).toBeInTheDocument();
    });
  });

  it('displays data correctly based on selected prefectures', async () => {
    render(<PopulationChart selectedPrefectures={selectedPrefectures} />);

    await waitFor(() => {
      expect(screen.getByText('人口推移')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Hokkaido')).toBeInTheDocument();
      expect(screen.getByText('Aomori')).toBeInTheDocument();
    });
  });
});
