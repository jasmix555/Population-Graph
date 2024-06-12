// __tests__/PrefectureCheckboxes.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { PrefectureCheckboxes } from '../components/PrefectureCheckbox/PrefectureCheckboxes';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('PrefectureCheckboxes', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    server.resetHandlers(
      http.get('/api/v1/prefectures', () => {
        return HttpResponse.json({
          result: [
            { prefCode: 1, prefName: '北海道' },
            { prefCode: 2, prefName: '青森県' },
            { prefCode: 3, prefName: '岩手県' },
            { prefCode: 13, prefName: '東京都' },
            { prefCode: 27, prefName: '大阪府' },
          ],
        });
      }),
    );
  });

  it('renders loading state correctly', () => {
    render(
      <PrefectureCheckboxes
        setSelectedPrefectures={mockOnChange}
        selectedPrefectures={[]}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText('読み込み中。。。')).toBeInTheDocument();
  });

  it('renders checkboxes with prefectures', async () => {
    render(
      <PrefectureCheckboxes
        setSelectedPrefectures={mockOnChange}
        selectedPrefectures={[]}
        onChange={mockOnChange}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText('北海道')).toBeInTheDocument();
      expect(screen.getByLabelText('青森県')).toBeInTheDocument();
    });
  });

  it('updates selectedPrefectures when checkbox is clicked', async () => {
    render(
      <PrefectureCheckboxes
        setSelectedPrefectures={mockOnChange}
        selectedPrefectures={[]}
        onChange={mockOnChange}
      />,
    );

    const checkbox = (await screen.findByLabelText(
      '北海道',
    )) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(1);
  });
});
