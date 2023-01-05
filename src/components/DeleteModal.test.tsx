import { fireEvent, render, screen} from '@testing-library/react';
import DeleteModal from './DeleteModal';

test('renders the main screen', () => {
  render(<DeleteModal />);
});