import { PrefectureCheckboxes } from '../components/PrefectureCheckbox';
import { render, waitFor, fireEvent } from '@testing-library/react';

describe('PrefectureCheckboxes', () => {
  it('renders checkboxes with prefecture names', async () => {
    const { getByText } = render(<PrefectureCheckboxes />);
    await waitFor(() => {
      expect(getByText('prefecture1')).toBeInTheDocument();
      expect(getByText('prefecture2')).toBeInTheDocument();
    });
  });

  it('updates selectedPrefectures when checkbox is clicked', async () => {
    const { getByLabelText } = render(<PrefectureCheckboxes />);
    const checkbox = getByLabelText('prefecture1') as HTMLInputElement;
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox.checked).toBe(true);
    });
  });
});
