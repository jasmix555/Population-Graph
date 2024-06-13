// __tests__/PrefectureCheckboxes.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { PrefectureCheckboxes } from '../components/PrefectureCheckbox/PrefectureCheckboxes';
// import { server } from '../mocks/server';
// import { http, HttpResponse } from 'msw';
// import { BASE_URL } from '../api/resas/resas-api';

describe('PrefectureCheckboxes', () => {
  const mockServer = vi.fn();

  it('renders loading state correctly', () => {
    render(
      <PrefectureCheckboxes
        setSelectedPrefectures={mockServer}
        selectedPrefectures={[]}
        onChange={mockServer}
      />,
    );

    expect(screen.getByText('読み込み中。。。')).toBeInTheDocument();
  });

  it('renders checkboxes with prefectures', async () => {
    render(
      <PrefectureCheckboxes
        setSelectedPrefectures={mockServer}
        selectedPrefectures={[]}
        onChange={mockServer}
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
        setSelectedPrefectures={mockServer}
        selectedPrefectures={[]}
        onChange={mockServer}
      />,
    );

    const checkbox = (await screen.findByLabelText(
      '北海道',
    )) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockServer).toHaveBeenCalledWith(1);
  });

  // it('renders error state correctly', async () => {
  //   server.use(
  //     http.get(`${BASE_URL}/api/v1/prefectures`, () => {
  //       return HttpResponse.error();
  //     }),
  //   );

  //   render(
  //     <PrefectureCheckboxes
  //       setSelectedPrefectures={mockServer}
  //       selectedPrefectures={[]}
  //       onChange={mockServer}
  //     />,
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/読み込みエラー/)).toBeInTheDocument();
  //   });
  // });
});
