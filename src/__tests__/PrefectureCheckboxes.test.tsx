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

  it('filters prefectures by selected region', async () => {
    const { getByText, getByRole, queryByText } = render(
      <PrefectureCheckboxes />,
    );

    // Select region1
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'region1' } });

    await waitFor(() => {
      expect(getByText('prefecture1')).toBeInTheDocument();
      expect(getByText('prefecture2')).toBeInTheDocument();
      expect(queryByText('prefecture3')).toBeNull(); // prefecture3 should be filtered out
    });
  });

  it('unchecks all checkboxes when the uncheck all button is clicked', async () => {
    const { getByLabelText, getByText } = render(<PrefectureCheckboxes />);

    // Check a checkbox
    const checkbox1 = getByLabelText('prefecture1') as HTMLInputElement;
    const checkbox2 = getByLabelText('prefecture2') as HTMLInputElement;
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    await waitFor(() => {
      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
    });

    // Click the uncheck all button
    const uncheckAllButton = getByText('選択を解除');
    fireEvent.click(uncheckAllButton);

    await waitFor(() => {
      expect(checkbox1.checked).toBe(false);
      expect(checkbox2.checked).toBe(false);
    });
  });
});
