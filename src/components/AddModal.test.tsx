import { fireEvent, render, screen} from '@testing-library/react';
import AddModal from './AddModal';

test('renders the main screen', () => {
  render(<AddModal />);
});