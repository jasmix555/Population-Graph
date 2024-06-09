import { PrefectureCheckboxes } from '../components/PrefectureCheckbox';
import { render, waitFor, fireEvent } from '@testing-library/react';

describe('PrefectureCheckboxes', () => {
  it('renders checkboxes with prefecture names', async () => {
    const { getByText } = render(<PrefectureCheckboxes />);
    await waitFor(() => {
      expect(getByText('北海道')).toBeInTheDocument();
      expect(getByText('青森県')).toBeInTheDocument();
    });
  });

  it('updates selectedPrefectures when checkbox is clicked', async () => {
    const { getByLabelText } = render(<PrefectureCheckboxes />);
    const checkbox = getByLabelText('北海道') as HTMLInputElement;
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox.checked).toBe(true);
    });
  });
});
