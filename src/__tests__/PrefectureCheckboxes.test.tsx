// __tests__/PrefectureCheckboxes.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { PrefectureCheckboxes } from '../components/PrefectureCheckbox';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

describe('PrefectureCheckboxes', () => {
  const mockOnChange = vi.fn();
  const mockSetSelectedPrefectures = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    server.use(
      http.get('*/api/v1/prefectures', () => {
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

  it('renders all regions in the dropdown', async () => {
    const { findByText } = render(
      <PrefectureCheckboxes
        selectedPrefectures={[]}
        onChange={mockOnChange}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );

    expect(await findByText('全ての地域')).toBeInTheDocument();
    expect(await findByText('北海道地方')).toBeInTheDocument();
    expect(await findByText('東北地方')).toBeInTheDocument();
    expect(await findByText('関東地方')).toBeInTheDocument();
    expect(await findByText('中部地方')).toBeInTheDocument();
    expect(await findByText('近畿地方')).toBeInTheDocument();
    expect(await findByText('中国地方')).toBeInTheDocument();
    expect(await findByText('四国地方')).toBeInTheDocument();
    expect(await findByText('九州地方')).toBeInTheDocument();
  });

  it('renders loading state correctly', async () => {
    server.use(
      http.get('*/api/v1/prefectures', () => {
        return HttpResponse.json({ result: [] });
      }),
    );

    const { findByText } = render(
      <PrefectureCheckboxes
        selectedPrefectures={[]}
        onChange={mockOnChange}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );

    expect(await findByText('読み込み中。。。')).toBeInTheDocument();
  });

  it('renders error state correctly', async () => {
    server.use(
      http.get('*/api/v1/prefectures', () => {
        return new HttpResponse(JSON.stringify({ error: 'Server error' }), {
          status: 500,
        });
      }),
    );

    const { getByText } = render(
      <PrefectureCheckboxes
        selectedPrefectures={[]}
        onChange={mockOnChange}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );

    await waitFor(() => {
      expect(getByText('Error fetching prefectures')).toBeInTheDocument();
    });
  });

  it('updates selectedPrefectures when checkbox is clicked', async () => {
    const { findByLabelText } = render(
      <PrefectureCheckboxes
        selectedPrefectures={[]}
        onChange={mockOnChange}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );

    const checkbox = (await findByLabelText('北海道')) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  it('filters prefectures by selected region', async () => {
    const { findByText, getByRole, queryByText } = render(
      <PrefectureCheckboxes
        selectedPrefectures={[]}
        onChange={mockOnChange}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );

    // Select 北海道地方 (only 北海道 should be visible)
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: '北海道地方' } });

    expect(await findByText('北海道')).toBeInTheDocument();
    expect(queryByText('青森県')).toBeNull();
    expect(queryByText('岩手県')).toBeNull();
    expect(queryByText('東京都')).toBeNull();
    expect(queryByText('大阪府')).toBeNull();

    // Select 東北地方 (青森県 and 岩手県 should be visible)
    fireEvent.change(select, { target: { value: '東北地方' } });

    expect(await findByText('青森県')).toBeInTheDocument();
    expect(await findByText('岩手県')).toBeInTheDocument();
    expect(queryByText('北海道')).toBeNull();
    expect(queryByText('東京都')).toBeNull();
    expect(queryByText('大阪府')).toBeNull();

    // Select 関東地方 (東京都 should be visible)
    fireEvent.change(select, { target: { value: '関東地方' } });

    expect(await findByText('東京都')).toBeInTheDocument();
    expect(queryByText('北海道')).toBeNull();
    expect(queryByText('青森県')).toBeNull();
    expect(queryByText('岩手県')).toBeNull();
    expect(queryByText('大阪府')).toBeNull();

    // Select 近畿地方 (大阪府 should be visible)
    fireEvent.change(select, { target: { value: '近畿地方' } });

    expect(await findByText('大阪府')).toBeInTheDocument();
    expect(queryByText('北海道')).toBeNull();
    expect(queryByText('青森県')).toBeNull();
    expect(queryByText('岩手県')).toBeNull();
    expect(queryByText('東京都')).toBeNull();

    // Select "全ての地域" (all prefectures should be visible)
    fireEvent.change(select, { target: { value: '' } });

    expect(await findByText('北海道')).toBeInTheDocument();
    expect(await findByText('青森県')).toBeInTheDocument();
    expect(await findByText('岩手県')).toBeInTheDocument();
    expect(await findByText('東京都')).toBeInTheDocument();
    expect(await findByText('大阪府')).toBeInTheDocument();
  });

  it('unchecks all checkboxes when the uncheck all button is clicked', async () => {
    const { findByText, findByLabelText } = render(
      <PrefectureCheckboxes
        selectedPrefectures={[1, 2]} // 北海道 and 青森県 are initially selected
        onChange={mockOnChange}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );

    const checkbox1 = (await findByLabelText('北海道')) as HTMLInputElement;
    const checkbox2 = (await findByLabelText('青森県')) as HTMLInputElement;
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);

    // Click the uncheck all button
    const uncheckAllButton = await findByText('選択を解除');
    fireEvent.click(uncheckAllButton);

    expect(mockSetSelectedPrefectures).toHaveBeenCalledWith([]);
  });
});
