import { fireEvent, render, screen} from '@testing-library/react';
import FeedbackModule from './FeedbackModule';

test('renders the main screen', () => {
  render(<FeedbackModule />);
});